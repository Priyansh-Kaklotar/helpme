import ServiceCompleOtpModel from "@/src/models/ServiceCompleOtp.model";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { bookingId, otp } = await req.json();
    // Find the latest valid OTP for this booking
    const otpDoc = await ServiceCompleOtpModel.findOne({
      bookingId,
      isUsed: false,
      expiresAt: { $gt: new Date() },
    }).sort({ createdAt: -1 });

    if (!otpDoc) {
      return NextResponse.json({
        success: false,
        message: "OTP not found or expired",
      });
    }

    // Check if attempts remaining
    if (otpDoc.attemptsRemaining <= 0) {
      return NextResponse.json({
        success: false,
        message: "Maximum attempts Exceeded",
      });
    }

    // Verify OTP
    // const isMatch = await bcrypt.compare(enteredOTP, otpDoc.otpCode);
    // console.log("Entetred OTP : ", otp);
    let isMatch;
    if (otp == otpDoc.otpCode) {
      isMatch = true;
    } else {
      isMatch = false;
    }

    // console.log("isMatch = ", isMatch);

    if (isMatch) {
      // Mark as used
      otpDoc.isUsed = true;
      otpDoc.verifiedAt = new Date();
      await otpDoc.save();

      return NextResponse.json({
        success: true,
        message: "OTP verified successfully",
      });
    } else {
      // Decrement attempts
      otpDoc.attemptsRemaining -= 1;
      otpDoc.lastAttemptAt = new Date();

      if (otpDoc.attemptsRemaining <= 0) {
        otpDoc.isExpired = true;
      }

      await otpDoc.save();

      return NextResponse.json({
        otpDoc,
        success: false,
        message: `Invalid OTP. ${otpDoc.attemptsRemaining} attempts remaining`,
      });
    }
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: error.message,
    });
  }
}
