import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  const banners = await prisma.banner.findMany({
    orderBy: { uploadDate: "desc" },
  });
  return NextResponse.json(banners);
}
