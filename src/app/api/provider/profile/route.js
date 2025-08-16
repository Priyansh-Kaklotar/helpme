import connectToDatabase from "@/src/lib/mongodb";
import ServiceProviderModel from "@/src/models/ServiceProvider.model";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const cookieStore = cookies();
    const type = (await cookieStore).get("type")?.value;
    const userId = (await cookieStore).get("userId")?.value;
    const user = await ServiceProviderModel.findById(userId);

    return NextResponse.json({
      user: user,
      success: true,
      message: "Provider data is fetched",
    });
  } catch (error) {
    return NextResponse.json({
      error: error.message,
      status: 500,
      success: false,
      message: "Log in first, then try again",
    });
  }
}

export async function PATCH(req) {
  const data = await req.json();
  const cookieStore = cookies();
  const userid = (await cookieStore).get("userId")?.value;
  await connectToDatabase();
  const update = await ServiceProviderModel.findByIdAndUpdate(userid, data, {
    new: true,
    runValidators: true,
  });

  if (!update) {
    return NextResponse.json(
      { success: false, message: "User not found" },
      { status: 404 }
    );
  } else {
    return NextResponse.json(
      { success: true, message: "Updated successfully" },
      { status: 200 }
    );
  }
}
