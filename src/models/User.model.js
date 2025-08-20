import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import Booking from "./Booking.model";

const UserSchema = new mongoose.Schema({
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
  pincode: {
    type: Number,
    required: true,
    validate: {
      validator: function (v) {
        // Check if number is between 100000 and 999999 (6 digits)
        return v >= 100000 && v <= 999999;
      },
      message: (props) =>
        `${props.value} is not valid! Pincode must be exactly 6 digits.`,
    },
  },
  booking: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Booking",
    },
  ],
  confirmBooking: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Booking",
    },
  ],
});

UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

export default mongoose.models.User || mongoose.model("User", UserSchema);
