import connectToDatabase from "@/src/lib/mongodb";
import BookingModel from "@/src/models/Booking.model";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function PATCH(req, { params }) {
  try {
    const { id } = await params;
    const data = await req.json();
    const cookieStore = cookies();
    const userId = (await cookieStore).get("userId")?.value;
    await connectToDatabase();
    if (data.bookingStatus === "rejected") {
      await BookingModel.findByIdAndDelete(id);
      return NextResponse.json({
        success: true,
        message: "Booking rejected Successfully",
      });
    }
    const update = await BookingModel.findByIdAndUpdate(id, data);
    if (!update) {
      throw new Error("Cannot Update the status");
    }
    return NextResponse.json(
      { success: true, message: "Updated succesfully", update },
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 400 }
    );
  }
}
