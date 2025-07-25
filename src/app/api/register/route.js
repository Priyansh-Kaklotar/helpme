import connectToDatabase from "../../../lib/mongodb";
import User from "@/src/models/User";
import Otp from "@/src/models/Otp";
import nodemailer from 'nodemailer'
import  generateOtp   from '@/src/lib/generateOtp'
import dotenv from 'dotenv'

dotenv.config();

export async function POST(req) {
  try {
    const { name, password, email, type, address, pincode } = await req.json();
    await connectToDatabase();
    // console.log(`username = ${name}, password = ${password}`); 
    const user = { name: name, password: password , email : email , type : type , address : address , pincode :pincode };
    await User.create(user);
    // have koi error no aave etle have mail send karie 
    const otp = generateOtp();
    await Otp.create({otp:otp ,email : email , expires: Date.now() + 5 * 60 * 1000 , used : false}); // valid for 5 min 
    const transporter  = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user : process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      },
    });

    await transporter.sendMail({
      from : "Help me app (house furniture app ) plese do not reply to this mail",
      to : email,
      subject : "OTP for your account",
      html: `<p>Your OTP code is <b>${otp}</b>. It expires in 5 minutes.</p>`
    })
    return new Response(
      JSON.stringify({
        success: true,
        message: "sign up succesfully done",
      })
    );
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
