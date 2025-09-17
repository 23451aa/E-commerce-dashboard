import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const customers = await prisma.user.findMany({
      select: {
        id: true,
        username: true,
        email: true,
        status: true,
        joinedDate: true, // Make sure schema allows null if old data is missing this
        totalOrders: true,
        totalSpent: true
      }
    });

    return NextResponse.json(customers);
  } catch (error) {
    console.error("Error fetching customers:", error);
    return NextResponse.json(
      { error: "Failed to fetch customers" },
      { status: 500 }
    );
  }
}
