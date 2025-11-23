import connectToDatabase from "@/src/lib/mongodb";
import BookingModel from "@/src/models/Booking.model";
import ServiceModel from "@/src/models/Service.model";
import ServiceProviderModel from "@/src/models/ServiceProvider.model";
import UserModel from "@/src/models/User.model";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
  const cookieStore = cookies();
  const id = await cookieStore.get("userId")?.value;

  try {
    const provider = await ServiceProviderModel.findById(id).populate({
      path: "confirmService",
      populate: [
        {
          path: "user",
          model: "User", // optional, but recommended
        },
        {
          path: "service",
          model: "Service",
        },
      ],
    });

    // console.log(
    //   "confirm service details in the backend : ",
    //   provider.confirmService
    // );
    return NextResponse.json({
      // allService: provider.allService,
      confirmService: provider.confirmService,
      success: true,
      message: "All service of the Provider",
    });
  } catch (error) {
    return NextResponse.json({
      error: error.message,
      success: false,
      message: "Error in the getting confirm service of the Provider",
    });
  }
}
