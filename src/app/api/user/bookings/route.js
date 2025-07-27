import connectToDatabase from "@/src/lib/mongodb";
import { cookies } from "next/headers";

export async function GET() {
    const cookieStore = cookies();
    const userid = (await cookieStore).get("userId")?.value;
    await connectToDatabase();
}