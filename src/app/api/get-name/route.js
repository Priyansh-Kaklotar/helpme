import connectToDatabase from "@/src/lib/mongodb";
import { cookies } from "next/headers"
import { NextResponse } from "next/server";
import UserModel from "@/src/models/User.model";

export async function GET() {
    const cookieStore = await cookies();
    const userId = (await cookieStore).get("userId")?.value;
    if (!userId) {
        return NextResponse.json({success : false , message :"User not authenticated"}, {status: 401});
    }
    await connectToDatabase();
    const user = await UserModel.findById(userId);
    if (!user) {
        return NextResponse.json({success : false , message :"User not found"}, {status: 404});
    }
    return NextResponse.json({success : true , name: user.name}, {status: 200});
}