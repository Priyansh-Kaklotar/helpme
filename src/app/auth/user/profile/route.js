import ServiceProviderModel from "@/src/models/ServiceProvider.model";
import User from "@/src/models/User.model";
import { cookies } from "next/headers";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const cookieStore = cookies();
    const type = (await cookieStore).get("type")?.value;
    const userId = (await cookieStore).get("userId")?.value;
    if (type === "Customer") {
      const user = await User.findById(userId);

      return NextResponse.json({
        user: user,
        success: true,
        message: "User data is fetched",
      });
    } else {
      const user = ServiceProviderModel.findById(userId);

      return NextResponse.json({
        user: user,
        success: true,
        message: "Provider data is fetched",
      });
    }
  } catch (error) {
    return NextResponse.json({
      error: error.message,
      status: 500,
      success: false,
      message: "Log in first, then try again",
    });
  }
}

//update the user profile
export async function PUT(req) {
  try {
    const { name, address, pincode, oldPassword, password } = await req.json();

    const cookieStore = await cookies();
    const userId = await cookieStore.get("userId")?.value;

    const user = await User.findById(userId);

    if (user) {
      if (name) {
        user.name = name;
      }

      if (address) {
        user.address = address;
      }

      if (pincode) {
        user.pincode = pincode;
      }
      if (oldPassword && password) {
        let ps = await bcrypt.compare(oldPassword, user.password);
        if (ps) {
          user.password = password;
        } else {
          console.log("old password is wrong");
        }
      }

      await user.save();
      return NextResponse.json({
        user: user,
        success: true,
        message: "User Details Updated",
      });
    } else {
      return NextResponse.json({
        success: false,
        message: "User not exists",
      });
    }
  } catch (error) {
    return NextResponse.json({
      error: error.message,
      success: false,
      message: "Error in Profile update route",
    });
  }
}
