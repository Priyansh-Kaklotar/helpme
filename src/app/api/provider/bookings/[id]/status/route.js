import sendMail from "@/src/app/utils/mailSender";
import connectToDatabase from "@/src/lib/mongodb";
import BookingModel from "@/src/models/Booking.model";
import ServiceProviderModel from "@/src/models/ServiceProvider.model";
import UserModel from "@/src/models/User.model";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

//id = booking id

export async function PATCH(req, { params }) {
  try {
    await connectToDatabase();
    const { status } = await req.json();
    const { id } = await params;
    const cookieStore = await cookies();
    const userId = cookieStore.get("userId")?.value;
    const userType = cookieStore.get("type")?.value;

    if (userType === "serviceProvider") {
      const bookingDetails = await BookingModel.findByIdAndUpdate(id, {
        bookingStatus: status,
      }).populate("service");

      const customerId = bookingDetails.user;
      console.log("Backend : Customer Id = ", customerId);
      const customer = await UserModel.findById(customerId);
      const provider = await ServiceProviderModel.findById(userId);

      if (status === "confirmed") {
        await sendMail(
          customer.email,
          "Your Booking Request is Accepted by Service Provider",
          `<p>your service of ${bookingDetails.service.title} is accepted</p>`
        );

        const customerBooking = await UserModel.findByIdAndUpdate(
          customerId,
          {
            $push: { confirmBooking: id },
          },
          { new: true }
        );

        const providerConfirmService =
          await ServiceProviderModel.findByIdAndUpdate(
            userId,
            { $push: { confirmService: id } },
            { new: true }
          );

        return NextResponse.json({
          bookingDetails,
          customerBooking,
          providerConfirmService,
          success: true,
          message: "booking accepted successfully",
        });
      } else {
        await sendMail(
          customer.email,
          "Your Booking Request is Rejected by Service Provider",
          `<p>your service of ${bookingDetails.service.title} is rejected by provider</p>`
        );

        await ServiceProviderModel.findByIdAndUpdate(
          userId,
          {
            // $pull: { allService: id },
            $pull: { allRequest: new mongoose.Types.ObjectId(id) },
          },
          { new: true }
        );

        await UserModel.findByIdAndUpdate(
          customerId,
          {
            // $pull: { booking: id },
            $pull: { booking: new mongoose.Types.ObjectId(id) },
          },
          { new: true }
        );

        await BookingModel.findByIdAndDelete(id);
        return NextResponse.json({
          bookingDetails,
          success: true,
          message: "booking rejected successfully",
        });
      }
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
