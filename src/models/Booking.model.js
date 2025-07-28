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
      ref: "ServiceProviderModel",
    },
    time: {
      type: Date,
      default: Date.now(),
    },
    location: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    bookingStatus: {
      type: String,
      enum: ["pending", "accepted", "rejected"],
    },
  },
  { timestamps: true }
);

export default mongoose.models.Booking ||
  mongoose.model("Booking", BookingSchema);
