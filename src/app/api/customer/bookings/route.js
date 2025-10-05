import connectToDatabase from "@/src/lib/mongodb";
import UserModel from "@/src/models/User.model";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import BookingModel from "@/src/models/Booking.model";
import ServiceModel from "@/src/models/Service.model";
import ServiceProviderModel from "@/src/models/ServiceProvider.model";

export async function POST(req) {
  try {
    await connectToDatabase();
    const bookingData = await req.json();
    const { serviceId, ...otherData } = bookingData;
    console.log("otherdata = ", otherData);
    console.log("id = ", serviceId);
    const cookieStore = await cookies();
    const userId = cookieStore.get("userId")?.value;
    console.log("user Id = ", userId);

    if (!userId) {
      return NextResponse.json({
        success: false,
        message: "User not authenticated",
      });
    }

    // Get service details
    const service = await ServiceModel.findById(bookingData.serviceId).populate(
      "providerName"
    );
    if (!service) {
      return NextResponse.json({
        success: false,
        message: "Service not found",
      });
    }

    // Create booking
    const newBooking = new BookingModel({
      user: userId,
      service: serviceId,
      serviceProvider: service.providerName._id,
      bookingDate: otherData.bookingDate,
      timeSlot: otherData.timeSlot,
      userAddress: otherData.customerAddress,
      customerPhone: otherData.customerPhone,
      specialRequirements: otherData.specialRequirements,
      totalAmount: service.price,
    });

    const savedBooking = await newBooking.save();

    // Add booking to user's booking array
    await UserModel.findByIdAndUpdate(userId, {
      $push: { booking: savedBooking._id },
    });

    //add booking to user's booking array
    await ServiceProviderModel.findByIdAndUpdate(service.providerName._id, {
      $push: { allRequest: savedBooking._id },
    });

    return NextResponse.json({
      success: true,
      message: "Booking created successfully",
      booking: savedBooking,
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: "Error creating booking",
      error: error.message,
    });
  }
}

export async function GET() {
  try {
    const cookieStore = await cookies();
    const userId = cookieStore.get("userId")?.value;

    console.log("user id in customer/booking : ", userId);
    if (!userId) {
      return NextResponse.json({
        success: false,
        message: "User not authenticated",
      });
    }

    await connectToDatabase();
<<<<<<< HEAD
    const all_booking = await BookingModel.find({ user: userid })
        .populate("user")
        .populate("service")
        .populate("serviceProvider");
    return NextResponse.json(all_booking, { status: 200, headers: { "Content-Type": "application/json" } });
}


// using in my-service page.js ..............
=======

    const userBookings = await UserModel.findById(userId).populate({
      path: "booking",
      strictPopulate: false,
      populate: [
        {
          path: "service",
          strictPopulate: false,
          select: "title category price",
        },
        { path: "serviceProvider", strictPopulate: false, select: "name" },
      ],
    });

    console.log("first");
    // path: "booking",
    // populate: [
    //   { path: "serviceId", select: "title category price" },
    //   { path: "providerId", select: "name phone" },
    // ],

    return NextResponse.json({
      success: true,
      bookings: userBookings.booking,
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: "Error fetching bookings",
      error: error.message,
    });
  }
}
>>>>>>> 384c5dcee04235632648ff9818477bac363009f1
