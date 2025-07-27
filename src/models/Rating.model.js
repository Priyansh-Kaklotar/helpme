import mongoose from "mongoose";
import User from "@/src/models/User.model";
import ServiceProviderModel from "./ServiceProvider.model";

const RatingSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    serviceProvider: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ServiceProviderModel",
    },
    ratingValue: {
      type: Number,
      min: 1,
      max: 5,
    },
    comment: {
      type: String,
      length: 50,
    },
  },
  { timestamps: true }
);

const Rating = mongoose.model("Rating", RatingSchema);
export default Rating;
