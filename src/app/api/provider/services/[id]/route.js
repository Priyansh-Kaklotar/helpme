import connectToDatabase from "@/src/lib/mongodb";
import ServiceModel from "@/src/models/Service.model";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function PATCH(req, { params }) {
  try {
    const data = await req.json();
    const { id } = params;
    const cookieStore = cookies();
    const providerId = (await cookieStore).get("userId")?.value;
    await connectToDatabase();
    const update = await ServiceModel.findByIdAndUpdate(id, data).populate(
      "providerName"
    );
    if (providerId !== update.provideName._id) {
      throw new Error("Unauthorized Authority"); // means aa auther nathi tene redirect karidevano login par or saro message tu suggest kar
    }
    if (!update) {
      throw new Error("Service not found");
    }
    return NextResponse.json(
      { success: true, message: "Update Successfully done" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 400 }
    );
  }
}

export async function DELETE(req, { params }) {
  const { id } = params;
  await connectToDatabase();
  const deleted = await ServiceModel.findByIdAndDelete(id);
  console.log(deleted);
  return NextResponse.json({
    success: true,
    message: "Service deleted Successfully",
  });
}
