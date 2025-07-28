import connectToDatabase from "@/src/lib/mongodb";
import RatingModel from "@/src/models/Rating.model";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
    const cookieStore = cookies();
    const userId = (await cookieStore).get("userId")?.value;
    await connectToDatabase();

    const all_review = await RatingModel.find({serviceProvider : userId});
    return NextResponse.json(all_review, {status : 200 , headers :{"Content-Type" : "application/json"}})
}