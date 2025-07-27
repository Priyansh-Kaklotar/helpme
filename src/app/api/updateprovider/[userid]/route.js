import connectToDatabase from "@/src/lib/mongodb";
import ServiceProviderModel from "@/src/models/ServiceProvider.model";
import { NextResponse } from "next/server";

export async function PATCH(request, { params }) {
  const { userid } = await params;
  const data = await request.json();

  await connectToDatabase();
  try {
    const update = await ServiceProviderModel.findByIdAndUpdate(userid, data, {
      new: true,
      runValidators: true,
    });
    if (!update) {
      const response = NextResponse.json(
        {
          success: false,
          message: "User not found",
        },
        { status: 404 }
      );
      return response;
    } else {
      return response = NextResponse.json(
        {
          success: true,
          message: "Updated successfully",
        },
        { status: 200 }
      );
    }
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: error.message,
      },
      { status: 400 }
    );
  }
}
