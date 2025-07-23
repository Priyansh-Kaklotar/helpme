import connectToDatabase from "@/src/lib/mongodb";
import User from "@/src/models/User";

export async function POST(req) {
  const { name, password, email } = await req.json();
  try {
    await connectToDatabase();
    const user = { name: name, password: password, email: email };
    await User.create(user);
    return new Response(
      JSON.stringify({
        success: true,
        message: "User Registered Successfully",
      })
    );
  } catch (error) {
    return new Response(
      JSON.stringify({
        success: true,
        message: `Error in the Register Route ${error.message}`,
      })
    );
  }
}
