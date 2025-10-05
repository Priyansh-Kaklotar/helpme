import connectToDatabase from "@/src/lib/mongodb";
import BookingModel from "@/src/models/Booking.model";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
    const cookieStore = cookies();
    const userid = (await cookieStore).get("userId")?.value;
    await connectToDatabase();
    const all_booking = await BookingModel.find({ user: userid })
        .populate("user")
        .populate("service")
        .populate("serviceProvider");
    return NextResponse.json(all_booking, { status: 200, headers: { "Content-Type": "application/json" } });
}


// using in my-service page.js ..............