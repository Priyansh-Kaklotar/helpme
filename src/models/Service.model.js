import mongoose from "mongoose";
import ServiceProviderModel from "./ServiceProvider.model";

const ServiceSchema = new mongoose.Schema({
  title: {
    type: String,
  },
  description: {
    type: String,
  },
  price: {
    type: Number,
    required: true,
  },
  category: {
    type: String,
    enum: ["Cleaner", "Electrician", "Plumber", "Painter"],
  },
  providerName: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "ServiceProviderModel",
  },
  isActive: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "ServiceProviderModel",
  },
});

export default mongoose.models.service ||
  mongoose.model("service", ServiceSchema);
