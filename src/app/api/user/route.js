// import { connectToDatabase } from "@/lib/mongodb";
// import User from "@/models/User";

import dbConnect from "@/src/lib/mongodb";
import User from "@/src/models/User";

// import connectToDatabase from "@/src/lib/mongodb";
// import User from "@/src/models/User";

export async function GET(req) {
  await dbConnect();
  const users = await User.find({});
  return Response.json(users);
}
