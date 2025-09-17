import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(req: NextRequest, { params }: { params: { orderId: string } }) {
    try {
        const data = await req.json();
        const orderId = await params.orderId;

        if (!orderId) {
            return NextResponse.json({ error: "Order ID is required" }, { status: 400 });
        }

        const { status } = data;



        const updated = await prisma.order.update({
            where: { id: orderId },
            data: {
                status
            },
        });

        return NextResponse.json(updated);
    } catch (error) {
        console.error("PUT /api/orders/[id]/status error:", error);
        return NextResponse.json({ error: "Failed to update product" }, { status: 500 });
    }
}