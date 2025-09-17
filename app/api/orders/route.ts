// app/api/orders/route.ts
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  const orders = await prisma.order.findMany({
    include: {
      user: true, // Include the related user
    },
    orderBy: { createdAt: "asc" },
  });

  const formattedOrders = orders.map((order, index) => {
    // Calculate discount
    const discount =
      order.totalBeforeDiscount! > 500
        ? (order.totalBeforeDiscount || 0) - order.total + (order.shippingPrice || 0)
        : (order.totalBeforeDiscount || 0) - order.total;

    return {
      id:order.id,
      orderId: `ORD-${new Date(order.createdAt).getFullYear()}-${String(index + 1).padStart(3, "0")}`,
      orderDate: order.createdAt.toISOString(),
      paymentMethod: order.paymentMethod || "Unknown",
      paymentStatus: order.isPaid ? "Paid" : "Pending",
      couponApplied: order.couponApplied || null,
      totalAmount: order.total,
      status: order.status || "Processing",
      customer: {
        id: order.userId,
        name: order.shippingAddress
          ? `${order.shippingAddress?.firstName || ""} ${order.shippingAddress?.lastName || ""}`.trim()
          : "Unknown",
        email: order.user?.email || "",
        phone: order.shippingAddress?.phoneNumber || "",
      },
      shippingAddress: {
        street: order.shippingAddress?.address || "",
        city: order.shippingAddress?.city || "",
        state: order.shippingAddress?.state || "",
        zipCode: order.shippingAddress?.zipCode || "",
        country: order.shippingAddress?.country || "",
      },
      products: order.products.map((p) => ({
        id: p.productId,
        name: p.name,
        quantity: p.qty,
        price: p.price,
        image: p.image,
      })),
      subtotal: order.totalBeforeDiscount || order.total,
      discount: discount,
      shippingCost: order.shippingPrice || 0,
      userData: order.user?.id,
    };
  });

  return NextResponse.json(formattedOrders);
}
