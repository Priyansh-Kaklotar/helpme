import mongoose from "mongoose";

const ServiceProviderSchema = new mongoose.Schema({
  businessName: {
    type: String,
    required: true,
  },
  email: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  serviceOffered: {
    type: String,
    enum: ["Cleaner", "Electrician", "Plumber", "Painter"],
  },
  availability:{} ,
  address:{
  }
});

export default mongoose.models.ServiceProvider || mongoose.model("ServiceProvider" ,ServiceProviderSchema);