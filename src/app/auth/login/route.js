import connectToDatabase from "../../../lib/mongodb";
import User from "@/src/models/User.model";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import bcrypt from "bcrypt";
import { NextResponse } from "next/server";

dotenv.config();

const JWT_SECRET = process.env.JWT_KEY;

export async function POST(req) {
  try {
    const { name, password } = await req.json();
    await connectToDatabase();

    const user = await User.findOne({ name }).select("+password");
    const isMatch = await bcrypt.compare(password, user.password);

    const token = jwt.sign({ foo: "bar" }, process.env.JWT_KEY);
    console.log("JWT Token = ", token);

    const userId = String(user._id);

    if (isMatch) {
      const response = NextResponse.json({
        success: true,
        message: "User Log In Successfully",
      });

      // Set cookie with userId
      response.cookies.set("userId", userId, {
        httpOnly: true,
        path: "/",
        sameSite: "strict",
        secure: process.env.NODE_ENV === "production",
      });

      response.cookies.set("type", user.type, {
        httpOnly: true,
        path: "/",
        sameSite: "strict",
        secure: process.env.NODE_ENV === "production",
      });

      //set JWT Token also as a cookie
      response.cookies.set("token", token);

      return response;
    } else {
      return NextResponse.json({
        success: false,
        message: "Password Is Incorrect",
      });
    }
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
