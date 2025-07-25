import User from "@/src/models/User.model";
import connectToDatabase from "@/src/lib/mongodb";
import { cookies } from "next/headers";

export async function GET(request) {
  //   const url = new URL(request.url);
  //   const userid = url.searchParams.get("id");
  const cookieStore = await cookies();
  const userid = await cookieStore.get("userId")?.value;

  console.log(userid);
  await connectToDatabase();
  const user = await User.findById(userid);
  const type = user.type;
  const userpincode = user.pincode;
  if (type === "Customer") {
    const allProvider = await User.find({
      type: "Service Provider",
      pincode: userpincode,
    });
    return new Response(JSON.stringify(allProvider), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } else {
    // provider hase
    const nearbyUser = await User.find({
      pincode: userpincode,
      type: "Customer",
    }); //same pincode hoy etle najik na customer male pachi address ne strip kari ne te walo logic lagavsu pan atyare aa

    return new Response(JSON.stringify(nearbyUser), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}
