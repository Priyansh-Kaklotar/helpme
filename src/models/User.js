import mongoose from "mongoose";
import { unique } from "next/dist/build/utils";

const UserSchema = new mongoose.Schema({
<<<<<<< HEAD
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
});

export default mongoose.models.User || mongoose.model("User", UserSchema);

// aa simple user model chhe ane aama have use karvo hoy to aam karvanu
=======
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
>>>>>>> 892ca423c55ace531db34367085b9f2c4d873cd0
// src/app/api/user/route.js or route.ts
// import { connectToDatabase } from '@/lib/mongodb';
// import User from '@/models/User';

// export async function GET(req) {
//   await connectToDatabase();
//   const users = await User.find({});
//   return Response.json(users);
// }
