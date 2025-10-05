import mongoose from "mongoose";

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
    ref: "ServiceProvider",
  },
  isActive: {
    // type: mongoose.Schema.Types.ObjectId,
    // ref: "ServiceProvider",
    type: String,
  },
});

export default mongoose.models.Service ||
  mongoose.model("Service", ServiceSchema);
