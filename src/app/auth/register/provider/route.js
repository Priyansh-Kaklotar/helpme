import connectToDatabase from "@/src/lib/mongodb";
import Otp from "@/src/models/Otp";
import generateOtp from "@/src/lib/generateOtp";
import dotenv from "dotenv";
import ServiceProvider from "@/src/models/ServiceProvider.model";
import sendMail from "@/src/app/utils/mailSender";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";

dotenv.config();

export async function POST(req) {
  try {
    const { name, password, email, address, pincode } = await req.json();
    await connectToDatabase();

    let user;

    user = await ServiceProvider.create({
      name,
      password,
      email,
      address,
      pincode,
    });

    // have koi error no aave etle have mail send karie
    const otp = generateOtp();
    await Otp.create({
      otp: otp,
      email: email,
      expires: Date.now() + 5 * 60 * 1000,
      used: false,
    }); // valid for 5 min

    await sendMail(
      email,
      "OTP for your account",
      `<p>Your OTP code is <b>${otp}</b>. It expires in 5 minutes.</p>`
    );

    //JWT Token created
    const token = jwt.sign({ foo: "bar" }, process.env.JWT_KEY);

    const userId = String(user._id);

    // NextResponse = aa next app ma response send karva mate vapray che.
    const response = NextResponse.json({
      success: true,
      message: "Provider Registered Successfully",
    });

    // Set cookie with userId
    response.cookies.set("userId", userId, {
      httpOnly: true,
      path: "/",
      sameSite: "strict",
      secure: process.env.NODE_ENV === "production",
    });

    response.cookies.set("type", "serviceProvider", {
      httpOnly: true,
      path: "/",
      sameSite: "strict",
      secure: process.env.NODE_ENV === "production",
    });

    //set JWT Token also as a cookie
    response.cookies.set("token", token);

    return response;
  } catch (error) {
    return new Response(
      JSON.stringify({
        error: error.message,
        success: false,
        message: "Error in signin check the credential",
      })
    );
  }
}
