import mongoose from "mongoose";
import User from "@/src/models/User.model";
import Service from "./Service.model";
import ServiceProviderModel from "./ServiceProvider.model";

const BookingSchema = new mongoose.Schema({
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
});

const Booking = mongoose.model("Booking", BookingSchema);
export default Booking;
