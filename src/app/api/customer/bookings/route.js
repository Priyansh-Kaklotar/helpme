import connectToDatabase from "@/src/lib/mongodb";
import BookingModel from "@/src/models/Booking.model";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
    const cookieStore = cookies();
    const userid = (await cookieStore).get("userId")?.value;
    await connectToDatabase();
    const all_booking = await BookingModel.find({user : userid});
    return NextResponse.json(all_booking, {status :200 , headers :{"Content-Type" : "application/json"}});
}