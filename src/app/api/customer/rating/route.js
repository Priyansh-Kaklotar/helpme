import connectToDatabase from "@/src/lib/mongodb";
import Rating from "@/src/models/Rating.model";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
  const cookieStore = cookies();
  const userId = (await cookieStore).get("userId")?.value;
  console.log(userId);
  await connectToDatabase();
  const reviews = await Rating.find({ user: userId });
  return NextResponse.json(reviews, {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}

export async function POST(req) {
  try {
    const data = await req.json(); // data ni andar provider id hase te aapne front end thi aavse (service ni andar najik na provider send thay tyare teni id pan hoy ne aapni pase tem as parameter aapne sned karsu data ma.)
    const cookieStore = cookies();
    const userId = (await cookieStore).get("userId")?.value;
    const userType = (await cookieStore).get("type")?.value;
    if (userType === "Customer") {
      await connectToDatabase();
      await Rating.create({ user: userId, ...data });
      return NextResponse.json(
        { success: true, message: "Review added successfully" },
        { status: 200 }
      );
    } else {
      throw new Error("Service Provider cannot rate other Service provider");
    }
  } catch (error) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 400 }
    ); // error
  }
}
