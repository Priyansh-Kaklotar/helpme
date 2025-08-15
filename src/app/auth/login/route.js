import connectToDatabase from "@/src/lib/mongodb";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import ServiceProviderModel from "@/src/models/ServiceProvider.model";
import UserModel from "@/src/models/User.model";

dotenv.config();

export async function POST(req) {
  try {
    const { name, password , usertype } = await req.json();
    await connectToDatabase();
    const cookieStore = cookies();
    let userType = usertype || (await cookieStore).get("type")?.value;
    let userId = (await cookieStore).get("userId")?.value;


    //aa code comment ma reva deje...
    // console.log("id = ", userId);
    // let userType;
    // console.log(await UserModel.findById(userId));
    // if (await UserModel.findById(userId)) {
    //   userType = "Customer";
    // } else {
    //   userType = "serviceProvider";
    // }

    let user;
    if (userType === "Customer") {
      user = await UserModel.findOne({ name }).select("+password");
    } else {
      user = await ServiceProviderModel.findOne({ name }).select("+password");
    }
    const isMatch = await bcrypt.compare(password, user.password);

    // const token = (await cookieStore).get("token")?.value;
    const token = jwt.sign({ foo: "bar" }, process.env.JWT_KEY);

    if (isMatch) {
      const response = NextResponse.json({
        success: true,
        message: "User Log In Successfully",
      });

      // Set cookie with userId
      response.cookies.set("userId", user._id, {
        httpOnly: true,
        path: "/",
        sameSite: "strict",
        secure: process.env.NODE_ENV === "production",
      });

      response.cookies.set("type", userType, {
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
