import connectToDatabase from "@/src/lib/mongodb";
import BookingModel from "@/src/models/Booking.model";
import ServiceProviderModel from "@/src/models/ServiceProvider.model";
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

    // console.log("Provider Id in the Cookies: ", userId);
    const update = await BookingModel.findByIdAndUpdate(id, data);
    const providerUpdate = await ServiceProviderModel.findByIdAndUpdate(
      userId,
      {
        $push: { completedService: id },
        $pull: { confirmService: id },
      },
      { new: true }
    );
    if (!update) {
      throw new Error("Cannot Update the status");
    }
    return NextResponse.json(
      { success: true, message: "Updated succesfully", update, providerUpdate },
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 400 }
    );
  }
}
