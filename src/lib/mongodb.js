<<<<<<< HEAD
import mongoose, { Connection } from "mongoose";

// const connection: ConnectionObject = {};

async function dbConnect() {
  if (Connection.isConnected) {
    console.log("Already Connected To Database");
    return;
  }
  try {
    const db = await mongoose.connect(process.env.MONGO_URI);
    Connection.isConnected = db.connections[0].readyState;

    console.log("db connected successfully");
  } catch (error) {
    console.log("error in db connection ", error);
    process.exit(1);
  }
}

export default dbConnect;

// import mongoose from "mongoose";
// import dotenv from "dotenv";

// dotenv.config();

// const MONGO_URI = process.env.MONGO_URI;

// export default connectToDatabase = async () => {
//   try {
//     await mongoose.connect(MONGO_URI, {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//     });
//     console.log("db connected");
//   } catch (error) {
//     console.log("db error", error);
//   }
// };

// let cached = global.mongoose;

// if (!cached) {
//   cached = global.mongoose = { conn: null, promise: null };
// }

// export default connectToDataBase = async () => {
//   if (cached.conn) {
//     return cached.conn;
//   }

//   if (!cached.promise) {
//     cached.promise = mongoose.connect(MONGO_URI, {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//     });
//   }

//   cached.conn = await cached.promise;
//   return cached.conn;
// };
=======
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
>>>>>>> 892ca423c55ace531db34367085b9f2c4d873cd0
