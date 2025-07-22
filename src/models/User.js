import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    enum: ["Service Provider", "Service Tacker"],
  },
  address: {
    type: String,
  },
  pincode: {
    type: Number,
    length: 6,
  },
});

export default mongoose.models.User || mongoose.model("User", UserSchema);
