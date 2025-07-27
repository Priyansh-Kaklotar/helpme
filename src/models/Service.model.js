import mongoose from "mongoose";

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
});
