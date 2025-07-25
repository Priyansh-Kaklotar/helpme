import connectToDatabase from "@/src/lib/mongodb";
// import User from "@/src/models/User";
import Otp from "@/src/models/Otp";
import generateOtp from "@/src/lib/generateOtp";
import dotenv from "dotenv";
import User from "@/src/models/User.model";
import sendMail from "../../utils/mailSender";

dotenv.config();

export async function POST(req) {
  try {
    const { name, password, email, type, address, pincode } = await req.json();
    await connectToDatabase();
    // console.log(`username = ${name}, password = ${password}`);
    const user = {
      name: name,
      password: password,
      email: email,
      type: type,
      address: address,
      pincode: pincode,
    };
    await User.create(user);
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

    return new Response(
      JSON.stringify({
        success: true,
        message: "sign up successfully done",
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
