'use client';

import { useState, useEffect, useRef } from 'react';

// A simple component for the send icon
const SendIcon = (props) => (
    <svg {...props} viewBox="0 0 24 24" fill="currentColor">
        <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
    </svg>
);

// Component for an individual chat message
const ChatMessage = ({ message }) => {
    const isModel = message.role === 'model';
    return (
        <div className={`flex w-full ${isModel ? 'justify-start' : 'justify-end'}`}>
            <div
                className={`max-w-lg md:max-w-2xl px-4 py-3 rounded-2xl shadow-md ${
                    isModel
                        ? 'bg-white text-gray-800 rounded-bl-none'
                        : 'bg-purple-600 text-white rounded-br-none'
                }`}
            >
                {/* Using pre-wrap to respect newlines from the AI's response */}
                <p className="whitespace-pre-wrap">{message.parts[0].text}</p>
            </div>
        </div>
    );
};

export default function ChatPage() {
    // 1. Initialize messages as empty to be populated by history
    const [messages, setMessages] = useState([]); 
    const [input, setInput] = useState('');
    // 2. Start with isLoading: true to show a "loading history" state
    const [isLoading, setIsLoading] = useState(true); 
    const chatEndRef = useRef(null);

    // Automatically scroll to the latest message
    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    // 🌟 New useEffect to FETCH CHAT HISTORY on component mount
    useEffect(() => {
        const fetchHistory = async () => {
            try {
                // POST request with an empty prompt to signal history retrieval
                const res = await fetch('/api/chat', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ prompt: '' }),
                });

                if (!res.ok) throw new Error('Failed to fetch chat history.');

                const data = await res.json();
                
                let initialMessages = data.chatHistory || [];

                // If no history exists, add the default welcome message
                if (initialMessages.length === 0) {
                    initialMessages.push({
                        role: 'model',
                        parts: [{ text: "Hi there! I'm Helpme. How can I assist you today? Are you looking for a plumber, painter, or another service?" }]
                    });
                }
                
                setMessages(initialMessages);
            } catch (error) {
                console.error("History Fetch Error:", error);
                // Fallback to initial message on error
                setMessages([
                    {
                        role: 'model',
                        parts: [{ text: "Sorry, I couldn't load your previous chats. How can I assist you today? Are you looking for a plumber, painter, or another service?" }]
                    }
                ]);
            } finally {
                setIsLoading(false); // Stop loading after history attempt
            }
        };

        fetchHistory();
    }, []); // Run only once on mount

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Allow submission only after history is loaded and input is valid
        if (!input.trim() || isLoading) return; 

        const userMessage = { role: 'user', parts: [{ text: input }] };
        setMessages((prev) => [...prev, userMessage]);
        setInput('');
        setIsLoading(true);

        try {
            const res = await fetch('/api/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    prompt: input,
                }),
            });

            if (!res.ok) {
                throw new Error('Failed to get response from the server.');
            }

            const data = await res.json();

            const modelMessage = { role: 'model', parts: [{ text: data.text }] };
            setMessages((prev) => [...prev, modelMessage]);

        } catch (error) {
            console.error("Chat Error:", error);
            const errorMessage = { role: 'model', parts: [{ text: "Sorry, I'm having trouble connecting. Please try again later." }] };
            setMessages((prev) => [...prev, errorMessage]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex flex-col h-screen bg-gradient-to-br from-purple-100 to-indigo-200">
            {/* Header */}
            <header className="bg-purple-700 text-white shadow-lg p-4 text-center">
                <h1 className="text-2xl font-bold">Helpme Assistant</h1>
                <p className="text-sm text-purple-200">Your local service finder</p>
            </header>

            {/* Chat Messages */}
            <div className="flex-1 overflow-y-auto p-6">
                <div className="flex flex-col space-y-4">
                    {messages.map((msg, index) => (
                        <ChatMessage key={index} message={msg} />
                    ))}
                    {/* Display a specific loading message when initially fetching history */}
                    {isLoading && messages.length === 0 && (
                        <div className="flex justify-start">
                             <div className="px-4 py-3 rounded-2xl bg-white text-gray-500 shadow-md">
                                <span className="animate-pulse">Loading conversation history...</span>
                            </div>
                        </div>
                    )}
                    {/* Display the 'thinking' message while waiting for a new response */}
                    {isLoading && messages.length > 0 && messages[messages.length - 1].role === 'user' && (
                         <div className="flex justify-start">
                            <div className="px-4 py-3 rounded-2xl bg-white text-gray-500 shadow-md">
                                <span className="animate-pulse">Helpme is thinking...</span>
                            </div>
                        </div>
                    )}
                    <div ref={chatEndRef} />
                </div>
            </div>

            {/* Input Form */}
            <div className="p-4 bg-white border-t border-gray-200 text-black">
                <form onSubmit={handleSubmit} className="flex items-center space-x-4">
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder={isLoading ? "Loading chat history..." : "Ask for a service, e.g., 'I need a plumber in downtown'..."}
                        className="flex-1 p-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-purple-500"
                        disabled={isLoading}
                    />
                    <button
                        type="submit"
                        disabled={isLoading || !input.trim()}
                        className="bg-purple-600 text-white p-3 rounded-full hover:bg-purple-700 disabled:bg-purple-300 disabled:cursor-not-allowed transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
                    >
                        <SendIcon className="h-6 w-6" />
                    </button>
                </form>
            </div>
        </div>
    );
}