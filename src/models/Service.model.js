import mongoose from "mongoose";
import ServiceProviderModel from "./ServiceProvider.model";

const ServiceSchema = new mongoose.Schema({
  title: {
    type: String,
    enum: ["Cleaner", "Electrician", "Plumber", "Painter"],
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

const Service = mongoose.model("Service", ServiceSchema);

export default Service;
