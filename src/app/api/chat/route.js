import connectToDatabase from "@/src/lib/mongodb";
import { GoogleGenAI } from "@google/genai";
import { NextResponse } from "next/server";
import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';
import Chat from "@/src/models/chat.model";
import User from "@/src/models/User.model";
import 'dotenv/config';

// It's good practice to initialize the SDK with your API key from environment variables.
const ai = new GoogleGenAI(process.env.GEMINI_API_KEY);

export async function POST(req) {
    try {
        // threadId will be used to maintain conversation history.
        const { prompt } = await req.json();

        await connectToDatabase();

        // --- User and Thread ID Handling ---
        const cookieStore =await cookies();
        const token =await cookieStore.get("token")?.value;

        if (!token) {
            return NextResponse.json({ error: "Authentication required." }, { status: 401 });
        }

        const decodedToken = jwt.verify(token, process.env.JWT_KEY);
        const userId = decodedToken.id;
        const user = await User.findById(userId).select('chatThreadId');

        if (!user) {
            return NextResponse.json({ error: "User not found." }, { status: 404 });
        }

        let threadId = user.chatThreadId;
       

        let chatHistory = [];
        let chat;

        if (threadId) {
            // Find existing chat
            chat = await Chat.findById(threadId);
            if (chat) {
                chatHistory = chat.messages.map(msg => ({
                    role: msg.role,
                    parts: msg.parts.map(part => ({ text: part.text }))
                }));
            }
        }

        // If no prompt is provided, just return the history
        if (!prompt) {
            return NextResponse.json({
                chatHistory: chatHistory,
                threadId: threadId,
                text: ''
            }, { status: 200 });
        }

        const systemInstruction = `You are "Helpme," a friendly and efficient Local Service Assistant for a platform dedicated to helping customers who have recently moved find essential local services (like Plumber, Painter, Electrician, Carpenter).
Your primary goal is to clearly and efficiently gather three key pieces of information from the user:
1. **Specific Service Needed** (e.g., 'plumbing repair', 'interior painting', 'installing an outlet').
2. **User's Location** (city or neighborhood) for service coverage.
3. **Urgency** (e.g., 'emergency/ASAP', 'within a week', 'planning/not urgent').

Always guide the user conversationally. If information is missing, ask the next most crucial question. If all three points are collected, summarize them and state: "Great! I have all the details needed to find your professional. We are now connecting you with the best available providers in [Location] for [Service]."
`;

        // Construct the full list of contents for the API call
        const contents = [
            ...chatHistory,
            { role: "user", parts: [{ text: prompt }] }
        ];

        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: contents,
            config: {
                systemInstruction: systemInstruction,
            },
        });

        const userMessage = { role: 'user', parts: [{ text: prompt }] };
        const generatedText = response.text || "Sorry, I couldn't generate a response.";
        const modelMessage = { role: 'model', parts: [{ text: generatedText }] };

        if (threadId && chat) {
            // Update existing chat
            chat.messages.push(userMessage, modelMessage);
            await chat.save();
        } else {
            // Create a new chat
            const newChat = await Chat.create({
                messages: [userMessage, modelMessage]
            });
            threadId = newChat._id.toString();

            // Save the new threadId to the user's document
            await User.findByIdAndUpdate(userId, { chatThreadId: threadId });
        }

        return NextResponse.json({
            text: generatedText,
            threadId: threadId,
            chatHistory: chatHistory
        }, { status: 200 });

    } catch (error) {

        return NextResponse.json(
            { error: "Failed to communicate with the AI service. Check API key and server logs." },
            { status: 500 }
        );
    }
}