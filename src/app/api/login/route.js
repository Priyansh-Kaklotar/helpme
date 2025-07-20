import connectToDatabase from "../../../lib/mongodb";


export async function POST(request) {
  try {
    await connectToDatabase();

    // connection thay gayu chhe have aagal karvanu chhe !!
    // postman ma http://localhost:3000/api/login marje username admin and password 1234 error aavse pan thay chhe 

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
