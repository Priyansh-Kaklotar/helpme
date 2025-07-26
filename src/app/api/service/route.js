import User from "@/src/models/User.model";
import connectToDatabase from "@/src/lib/mongodb";
import { cookies } from "next/headers";
import ServiceProviderModel from "@/src/models/ServiceProvider.model";

export async function GET(request) {
  // const url = new URL(request.url);
  // const type = url.searchParams.get("type");
  // console.log(type);

  const cookieStore = await cookies();
  const type = await cookieStore.get("type")?.value;
  const userid = await cookieStore.get("userId")?.value;

  console.log(userid);
  await connectToDatabase();

  // const user = await User.findById(userid);
  let user;
  if (type === "Customer") {
    user = await User.findById(userid);
  } else {
    user = await ServiceProviderModel.findById(userid);
  }

  // const type = user.type;
  const userpincode = user.pincode;
  if (type === "Customer") {
    const allProvider = await ServiceProviderModel.find({
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
