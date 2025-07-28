import ServiceModel from "@/src/models/Service.model";
import ServiceProviderModel from "@/src/models/ServiceProvider.model";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(req) {
  const cookieStore = await cookies();
  const type = cookieStore.get("type")?.value;
  const id = cookieStore.get("userId")?.value;
  if (type === "serviceProvider") {
    try {
      const { title, description, price, category, isActive } =
        await req.json();

      const service = await ServiceModel.create({
        title,
        description,
        price,
        category,
        providerName: id,
        isActive,
      });

      const updatedProvider = await ServiceProviderModel.findByIdAndUpdate(id, {
        $push: { allService: service._id },
      });

      console.log("updated user = ", updatedProvider);
      return NextResponse.json({
        data: service,
        success: true,
        message: `Service created by provider`,
      });
    } catch (error) {
      return NextResponse.json({
        error: error.message,
        success: false,
        message: "Error in service create route",
      });
    }
  } else {
    return NextResponse.json({
      success: false,
      message: "Customer can not create a service",
    });
  }
}

export async function GET() {
  const cookieStore = await cookies();
  const id = await cookieStore.get("userId")?.value;

  try {
    const provider = await ServiceProviderModel.findById(id);
    console.log(provider.allService);
    return NextResponse.json({
      allService: provider.allService,
      success: true,
      message: "All service of the Provider",
    });
  } catch (error) {
    return NextResponse.json({
      error: error.message,
      success: false,
      message: "Error in the getting all service of the Provider",
    });
  }
}
