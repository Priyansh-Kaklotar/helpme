import mongoose from "mongoose";
import User from "@/src/models/User.model";
import Service from "./Service.model";
import ServiceProviderModel from "./ServiceProvider.model";

const BookingSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    service: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Service",
    },
    serviceProvider: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ServiceProvider",
    },
    bookingDate: {
      type: Date,
    },
    bookingTime: {
      type: Date,
    },
    timeSlot: {
      type: String,
    },
    userAddress: {
      street: String,
      city: String,
      pincode: Number,
      landmark: String,
    },
    customerPhone: {
      type: Number,
      required: true,
    },
    bookingStatus: {
      type: String,
      enum: ["pending", "confirmed", "in-progress", "completed", "rejected"],
      default: "pending",
    },
    specialRequirements: {
      type: String,
    },
    totalAmount: {
      type: Number,
    },
  },
  { timestamps: true }
);

export default mongoose.models.Booking ||
  mongoose.model("Booking", BookingSchema);
