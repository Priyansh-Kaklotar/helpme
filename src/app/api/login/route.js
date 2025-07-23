import connectToDatabase from "../../../lib/mongodb";
import User from "@/src/models/User";

export async function POST(req) {
  try {
    const { name, password } = await req.json();

    await connectToDatabase();

    const user = User.findOne({ name: name }, { password: 1, _id: 0 });
    console.log("password = ", password);
    if (password === password) {
      return new Response(
        JSON.stringify({
          success: true,
          message: "Login successful",
        })
      );
    } else {
      return new Response(
        JSON.stringify({
          success: false,
          message: "Login failed username or password is Wrong",
        })
      );
    }
  } catch (error) {
    console.log("error", error.message);
    return new Response(
      JSON.stringify({
        success: false,
        message: "Error in login route",
      })
    );
  }
}
