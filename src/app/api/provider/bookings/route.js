import BookingModel from "@/src/models/Booking.model";
import ServiceProviderModel from "@/src/models/ServiceProvider.model";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const cookieStore = await cookies();
    const userId = cookieStore.get("userId")?.value;
    const userType = cookieStore.get("type")?.value;

    if (userType === "serviceProvider") {
      const services = await BookingModel.find({
        serviceProvider: userId,
      })
        .populate("user")
        .populate("service");

      // console.log(services);

      return NextResponse.json({
        services,
        success: true,
        message: "All requested booking of provider",
      });
    } else {
      return NextResponse.json({
        success: false,
        message: "User can not get services",
      });
    }
  } catch (error) {
    return NextResponse.json({
      error: error.message,
      success: false,
      message: "Error in the Get booking of provider",
    });
  }
}
