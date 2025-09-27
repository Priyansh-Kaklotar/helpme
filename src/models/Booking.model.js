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
    bookingTime: {
      type: Date,
      default: Date.now(),
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
      enum: ["pending", "confirmed", "in-progress", "completed", "cancelled"],
      default: "pending",
    },
  },
  { timestamps: true }
);

export default mongoose.models.Booking ||
  mongoose.model("Booking", BookingSchema);
