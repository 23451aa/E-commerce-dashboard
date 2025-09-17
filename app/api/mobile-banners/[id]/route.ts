// app/api/banners/[id]/route.ts

import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  const { id } =await params;

  try {
    await prisma.mobileBanner.delete({
      where: { id },
    });
    
    return NextResponse.json({ message: "Banner deleted successfully." });
  } catch (error) {
    console.error("Error deleting banner:", error);
    return NextResponse.json({ error: "Failed to delete banner." }, { status: 500 });
  }
}
