import sendMail from "@/src/app/utils/mailSender";
import connectToDatabase from "@/src/lib/mongodb";
import BookingModel from "@/src/models/Booking.model";
import ServiceProviderModel from "@/src/models/ServiceProvider.model";
import UserModel from "@/src/models/User.model";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

//id = booking id

// me aama aatlu kam karu che baki have booking confirm karya pachi aa booking ni id ne customer and provider ma save karvanu che
export async function PATCH(req, { params }) {
  try {
    const { statusInfo } = await req.json();
    const { id } = params;
    const cookieStore = await cookies();
    const userId = cookieStore.get("userId")?.value;
    const userType = cookieStore.get("type")?.value;

    if (userType === "serviceProvider") {
      const bookingDetails = await BookingModel.findByIdAndUpdate(id, {
        bookingStatus: statusInfo,
      }).populate("service");

      const customerId = bookingDetails.user;

      const customer = await UserModel.findById(customerId);
      const provider = await ServiceProviderModel.findById(userId);

      if (statusInfo === "accepted") {
        await sendMail(
          customer.email,
          "Your Booking Request is Accepted by Service Provider",
          `<p>your service of ${bookingDetails.service.title} is accepted</p>`
        );

        // await UserModel.findByIdAndUpdate(
        //   customerId,
        //   {
        //     $push: { confirmBooking: id },
        //   },
        //   { new: true }
        // );

        // await ServiceProviderModel.findByIdAndUpdate(
        //   userId,
        //   { $push: { confirmService: id } },
        //   { new: true }
        // );

        return NextResponse.json({
          bookingDetails,
          success: true,
          message: "booking accepted successfully",
        });
      } else {
        await sendMail(
          customer.email,
          "Your Booking Request is Rejected by Service Provider",
          `<p>your service of ${bookingDetails.service.title} is rejected by provider</p>`
        );

        await BookingModel.findByIdAndDelete(id);
        return NextResponse.json({
          bookingDetails,
          success: true,
          message: "booking rejected successfully",
        });
      }

      return NextResponse.json({
        bookingDetails,
        success: true,
        message: "Status updated successfully",
      });
    } else {
      return NextResponse.json({
        success: false,
        message: "User Can not Update Booking status",
      });
    }
  } catch (error) {
    return NextResponse.json({
      error: error.message,
      success: false,
      message: "Error in the Booking Status Route",
    });
  }
}
