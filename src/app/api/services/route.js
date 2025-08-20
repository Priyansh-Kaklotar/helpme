import connectToDatabase from "@/src/lib/mongodb";
import ServiceModel from "@/src/models/Service.model";
import ServiceProviderModel from "@/src/models/ServiceProvider.model";
import UserModel from "@/src/models/User.model";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await connectToDatabase();
    const cookieStore = await cookies();
    const userId = cookieStore.get("userId")?.value;
    const userType = cookieStore.get("type")?.value;

    let user;
    if (userType === "Customer") {
      user = await UserModel.findById(userId);
    } else {
      user = await ServiceProviderModel.findById(userId);
    }
    const pincode = await user.pincode;

    const total = await ServiceProviderModel.find({ pincode }).populate(
      "allService"
    );

    const allServices = total.flatMap((provider) => provider.allService); // filter + map in built javascript function .

    return NextResponse.json({
      data: allServices,
      success: true,
      message: "all service In your area",
    });
  } catch (error) {
    return NextResponse.json({
      error: error.message,
      success: false,
      message: "Error in the All service Show route",
    });
  }
}
