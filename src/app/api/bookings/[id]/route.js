import connectToDatabase from "@/src/lib/mongodb";
import BookingModel from "@/src/models/Booking.model";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
    try {
        const { id } = params;
        await connectToDatabase();
        const booking = await BookingModel.findById(id)
        .populate("user")
        .populate("service")
        .populate("serviceProvider");
        return NextResponse.json({ booking , success : true , message : "This is signle booking"},  {status :200 , headers :{"Content-Type" : "application/json"}});
    } catch (error) {
        return NextResponse.json({success : false ,message :error.message} , {status : 400})
    }

}