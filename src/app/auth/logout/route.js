import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
  const response = NextResponse.json({
    success: true,
    message: "User logged out successfully",
  });

  // Remove cookies by setting them with maxAge =  0
  response.cookies.set("token", "", {
    maxAge: 0,
    path: "/",
  });

  return response;
}
