import mongoose from "mongoose";
import { unique } from "next/dist/build/utils";

const UserSchema = new mongoose.Schema({
    name : {
        type: String,
        required: true,
    },
    email:{
        type : String,
        unique :true,
    }
})

export default mongoose.models.User || mongoose.model('User', UserSchema);

// aa simple user model chhe ane aama have use karvo hoy to aam karvanu 
// src/app/api/user/route.js or route.ts
// import { connectToDatabase } from '@/lib/mongodb';
// import User from '@/models/User';

// export async function GET(req) {
//   await connectToDatabase();
//   const users = await User.find({});
//   return Response.json(users);
// }
