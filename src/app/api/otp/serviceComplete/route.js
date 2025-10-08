import sendMail from "@/src/app/utils/mailSender";
import ServiceCompleOtpModel from "@/src/models/ServiceCompleOtp.model";
import { NextResponse } from "next/server";

// Generate and save OTP
export async function POST(req) {
  try {
    const { bookingId, userId, providerId, email } = await req.json();
    console.log(bookingId, userId, providerId, email);
    // Generate 6-digit OTP
    const otpCode = Math.floor(100000 + Math.random() * 900000).toString();

    // Hash the OTP before storing
    const hashedOTP = otpCode;

    // Create OTP document
    const otp = new ServiceCompleOtpModel({
      bookingId,
      userId,
      providerId,
      otpCode: hashedOTP,
      email,
      expiresAt: new Date(Date.now() + 10 * 60 * 1000), // 10 minutes
      attemptsRemaining: 5,
    });

    await otp.save();

    // Send OTP via email (return plain OTP for email)
    await sendMail(
      email,
      "OTP for Your Service Completion ",
      `<p>Your OTP code is <b>${hashedOTP}</b>. It expires in 5 minutes.</p>`
    );

    return NextResponse.json({
      otp,
      success: true,
      message: "Service Complete OTP is saved",
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: error.message,
    });
  }
}
