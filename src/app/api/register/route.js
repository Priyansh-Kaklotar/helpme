import connectToDatabase from "@/src/lib/mongodb";
import User from "@/src/models/User";

export async function POST(req) {
  const { name, password, email } = await req.json();

import connectToDatabase from "../../../lib/mongodb";
import User from "@/src/models/User";

export async function POST(req) {

  try {
    const { name, password, email, type, address, pincode } = await req.json();
    await connectToDatabase();

    const user = { name: name, password: password, email: email };

    console.log(`username = ${name}, password = ${password}`);
    const user = { name: name, password: password , email : email , type : type , address : address , pincode :pincode };
    await User.create(user);
    return new Response(
      JSON.stringify({
        success: true,
        message: "User Registered Successfully",
        message: "sign up succesfully done",
      })
    );
  } catch (error) {
    return new Response(
      JSON.stringify({
        success: true,
        message: `Error in the Register Route ${error.message}`,
        error: error.message,
        success: false,
        message: "Error in signin check the credential",
      })
    );
  }
}
