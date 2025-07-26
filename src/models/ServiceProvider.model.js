import mongoose from "mongoose";
import bcrypt from 'bcryptjs';

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
  type: {
    type: String,
    enum: ["Service Provider", "Customer"],
  },
  address:{
    type: String,
  },
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
  availability:{
    type:Boolean // true or false  thay sake em ..
  } 
});

ServiceProviderSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

export default mongoose.models.ServiceProvider || mongoose.model("ServiceProvider" ,ServiceProviderSchema);