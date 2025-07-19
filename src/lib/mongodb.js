import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const MONGO_URI = process.env.MONGO_URI;

const cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

export default connnectTodataBase = async () => {
  if(cached.conn) {
    return cached.conn;
  }

  if(!cached.promise){
    cached.promise = mongoose.connect(MONGO_URI,{
        usenewUrlParser: true,
        useUnifiedTopology: true,
    })
  }

  cached.conn = await cached.promise;
  return cached.conn;
}
