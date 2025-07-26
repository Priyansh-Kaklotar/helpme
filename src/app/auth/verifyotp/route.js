import Otp from "@/src/models/Otp";
import { NextResponse } from "next/server";

export async function POST(req) {
  const { email, otp } = await req.json();
  try {
    const record = await Otp.findOne({ email, otp, used: false });
    if (!record) {
      throw new Error("Record Not found")
    }
    if (record.expireAt < new Date()) {
      throw new Error("Otp expired");
    }
    record.used = true;
    await record.save();
    return NextResponse.json({success:true , message:"OTP verified"});

  } catch (error) {
    return NextResponse.json({success : false, message :error.message} , {status:400});
  }finally{
    await Otp.findOneAndDelete({email , otp}); // extra j chhe karan ke expire thay gai chhe .
  }
}
