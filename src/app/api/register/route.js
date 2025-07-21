import connectToDatabase from "@/src/lib/mongodb";

export async function POST(request) {
  try {
    await connectToDatabase();
  } catch (error) {}
}
