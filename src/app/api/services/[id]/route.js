import connectToDatabase from "@/src/lib/mongodb";
import ServiceModel from "@/src/models/Service.model";
import { NextResponse } from "next/server";

export async function GET(req , {params}) {
    try {
        const {id} =  params;
        await connectToDatabase();
        const Service = await ServiceModel.findById(id);
        return NextResponse.json(Service);
    } catch (error) {
        return NextResponse.json({message:error.message})
    }
}