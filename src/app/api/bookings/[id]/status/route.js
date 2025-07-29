import connectToDatabase from "@/src/lib/mongodb";
import BookingModel from "@/src/models/Booking.model";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function PATCH(req, { params }) {
    try {
        const { id } = params;
        const data = await req.json();
        const cookieStore = cookies();
        const userId = (await cookieStore).get("userId")?.value;
        await connectToDatabase();
        const update = await BookingModel.findByIdAndUpdate(id, data);
        if (!update) {
            throw new Error("Cannot Update the status")
        }
        if(update.serviceProvider !== userId){
            throw new Error("You are not the right Provider");
        }
        return NextResponse.json({ success: true, message: "Updated succesfully", update }, { status: 200, headers: { "Content-Type": "application/json" } })
    } catch (error) {
        return NextResponse.json({ success: false, message: error.message }, { status: 400 })
    }

}