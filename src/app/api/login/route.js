import connectToDatabase from "../../../lib/mongodb";
import User from "@/src/models/User";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;

export async function POST(req) {
  try {
    const { name, password } = await req.json();
    await connectToDatabase();
    console.log(`username = ${name}, password = ${password}`);
    const user = { name: name, password: password };
    User.create(user);
    return new Response(
      JSON.stringify({
        success: true,
        message: "Login route success",
      })
    );
  } catch (error) {
    console.log("error", error.message);
    return new Response(
      JSON.stringify({
        error: error.message,
        success: false,
        message: "Error in login route",
      })
    );
  }
}
