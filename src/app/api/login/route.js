import connectToDatabase from "../../../lib/mongodb";


export async function POST(request) {
  try {
    await connectToDatabase();

    return new Response(JSON.stringify({ message: "Connected to MongoDB Atlas" }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    return new Response(JSON.stringify({ message: "DB connection failed", error: err.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
