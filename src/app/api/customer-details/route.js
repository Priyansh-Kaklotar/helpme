import connectToDatabase from "@/src/lib/mongodb";
import UserModel from "@/src/models/User.model";
import mongoose from "mongoose";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await connectToDatabase();
    const cookieStore = await cookies();
    const userId = cookieStore.get("userId").value;

    const user = await UserModel.findById(userId);

    return NextResponse.json({
      name: user.name,
      email: user.email,
      address: user.address,
      pincode: user.pincode,
      success: true,
      message: "Successfull",
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: error.message,
    });
  }
}
