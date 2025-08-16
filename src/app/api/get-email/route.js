import connectToDatabase from "@/src/lib/mongodb";
import ServiceProviderModel from "@/src/models/ServiceProvider.model";
import UserModel from "@/src/models/User.model";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
    await connectToDatabase();
    const cookieStore = await cookies();
    const userId = cookieStore.get("userId")?.value;
    const userType = cookieStore.get("type")?.value;


    if (userType === "Customer") {
        const User = await UserModel.findById(userId);
        if (!User) {
            return NextResponse.json({
                message: "User not found",
                success: false
            }, { status: 400, headers: { "Content-Type": "application/json" } });
        }
        return NextResponse.json({
            email: User.email,
            success: true
        }, {status: 200, headers: { "Content-Type": "application/json" }});
    }
    else {
        const user = await ServiceProviderModel.findById(userId);
        if (!user) {
            return NextResponse.json({
                message: "Service Provider not found",
                success: false
            }, { status: 400, headers: { "Content-Type": "application/json" } })
        }
        return NextResponse.json({
            email: user.email,
            success: true
        }, { status: 200, headers: { "Content-Type": "application/json" } });
    }
}