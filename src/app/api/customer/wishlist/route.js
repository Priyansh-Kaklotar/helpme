import connectToDatabase from "@/src/lib/mongodb";
import UserModel from "@/src/models/User.model";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import ServiceModel from "@/src/models/Service.model";

export async function PATCH(req) {
  try {
    const { id } = await req.json();
    console.log("id in patch is = ", id);
    const cookieStore = await cookies();
    const userId = cookieStore.get("userId")?.value;
    await connectToDatabase();
    if (userId) {
      const updateWish = await UserModel.findByIdAndUpdate(
        userId,
        {
          $push: { wishList: id },
        },
        { new: true }
      ).populate("wishList");

      return NextResponse.json({
        success: true,
        message: "Service Added To the Wish List",
        updateWish,
      });
    }
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: "Error in the Wishlist add route",
      err: error.message,
    });
  }
}

export async function DELETE(req) {
  try {
    const { id } = await req.json();
    console.log("id in delete is = ", id);
    const cookieStore = await cookies();
    const userId = cookieStore.get("userId")?.value;
    await connectToDatabase();

    if (userId) {
      const deleteWish = await UserModel.findByIdAndUpdate(
        userId,
        { $pull: { wishList: id } },
        { new: true }
      ).populate("wishList");

      return NextResponse.json({
        success: true,
        message: "Service Removed from Wish List",
        deleteWish,
      });
    }
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: "Error in the Wish List Delete Route",
      err: error.message,
    });
  }
}

export async function GET() {
  try {
    const cookieStore = await cookies();
    const userId = cookieStore.get("userId")?.value;
    await connectToDatabase();

    if (userId) {
      const user = await UserModel.findById(userId).populate("wishList");
      const wishList = user.wishList;
      console.log("wishlist = ", wishList);
      return NextResponse.json({
        wishList,
        success: true,
        message: "Working well get function of the wishlist in backend",
      });
    }
  } catch (error) {
    return NextResponse.json({
      success: true,
      message: "Error in the Get In the Wishlist Backend Route",
      err: error.message,
    });
  }
}
