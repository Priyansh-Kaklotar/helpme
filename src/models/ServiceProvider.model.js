import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import ServiceModel from "./Service.model";
import BookingModel from "./Booking.model";

const ServiceProviderSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
  },
  address: {
    type: String,
  },
  allService: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Service",
    },
  ],
  pincode: {
    type: Number,
    length: 6,
  },
  businessName: {
    type: String,
    // required: true, aa pachi update thase etle pachhi
  },
  serviceOffered: {
    type: String,
    enum: ["Cleaner", "Electrician", "Plumber", "Painter"],
  },
  availability: {
    type: Boolean, // true or false  thay sake em ..
  },
  allRequest: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Booking",
    },
  ],
  confirmService: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Booking",
    },
  ],
  completedService: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Booking",
    },
  ],
});

ServiceProviderSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

export default mongoose.models.ServiceProvider ||
  mongoose.model("ServiceProvider", ServiceProviderSchema);
