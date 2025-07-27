import connectToDatabase from "@/src/lib/mongodb";
import UserModel from "@/src/models/User.model";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";


export async function GET() {
    const cookieStore = cookies();
    const userid = (await cookieStore).get("userId")?.value;
    await connectToDatabase();
    const user = await UserModel.findById(userid);
    return NextResponse.json(user, { status: 200, headers: { "Content-Type": "application/json" } })
}

export async function PATCH(req) {
    const data = await req.json();
    const cookieStore = cookies();
    const userid = (await cookieStore).get("userId")?.value;
    await connectToDatabase();
    const update = await UserModel.findByIdAndUpdate(userid, data, {
        new: true,
        runValidators: true
    });

    if (!update) {
        return NextResponse.json({ success: false, message: "User not found" }, { status: 404 });
    }
    else {
        return NextResponse.json({ success: true, message: "Updated successfully" } , { status: 200 });
    }
}