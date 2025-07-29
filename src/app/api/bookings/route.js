import connectToDatabase from "@/src/lib/mongodb";
import BookingModel from "@/src/models/Booking.model";
import ServiceModel from "@/src/models/Service.model";
import ServiceProviderModel from "@/src/models/ServiceProvider.model";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { serviceId } = await req.json();
    await connectToDatabase();
    const cookieStore = await cookies();
    const userId = cookieStore.get("userId")?.value;
    const userType = cookieStore.get("type")?.value;

    if (userType === "Customer") {
      const serviceData = await ServiceModel.findById(serviceId);
      const providerId = serviceData.providerName;

      const booking = await BookingModel.create({
        user: userId,
        service: serviceId,
        serviceProvider: providerId,
      });

      const fullBooking = await BookingModel.findById(booking._id)
        .populate("user")
        .populate("service")
        .populate("serviceProvider");

      return NextResponse.json({
        fullBooking,
        success: true,
        message: "Booking created successfully",
      });
    } else {
      return NextResponse.json({
        success: false,
        message: "Only Customer can Booking a service",
      });
    }
  } catch (error) {
    return NextResponse.json({
      error: error.message,
      success: false,
      message: " Error in the Booking route post request",
    });
  }
}
