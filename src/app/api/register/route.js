import connectToDatabase from "../../../lib/mongodb";
import User from "@/src/models/User.model";
import sendMail from "../../utils/mailSender";

export async function POST(req) {
  try {
    const { name, password, email, type, address, pincode } = await req.json();
    await connectToDatabase();

    console.log(`username = ${name}, password = ${password}`);
    let user = {
      name: name,
      password: password,
      email: email,
      type: type,
      address: address,
      pincode: pincode,
    };
    await User.create(user);

    await sendMail(email, "hello", "Service Provider");

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
