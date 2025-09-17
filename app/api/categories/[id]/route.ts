// app/api/categories/[id]/route.ts
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
  api_key: process.env.CLOUDINARY_API_KEY!,
  api_secret: process.env.CLOUDINARY_API_SECRET!,
});
export async function PUT(req: Request, { params }: { params: { id: string } }) {
  try {
    const { name, image } = await req.json();
    
 if (!name || !image) {
      return NextResponse.json({ message: "Name and image are required" }, { status: 400 });
    }
    const uploadRes = await cloudinary.uploader.upload(image, {
      folder: "categories",
    });

    const updated = await prisma.category.update({
      where: { id: params.id },
      data: {
        name,
        slug: name.toLowerCase().replace(/\s+/g, "-"),
        images: [{ url: uploadRes.secure_url }],
      },
    });
    return NextResponse.json(updated);
  } catch (error) {
    return NextResponse.json({ message: "Update failed" }, { status: 500 });
  }
}

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  try {
    await prisma.category.delete({ where: { id: params.id } });
    return NextResponse.json({ message: "Deleted successfully" });
  } catch (error) {
    return NextResponse.json({ message: "Delete failed" }, { status: 500 });
  }
}
