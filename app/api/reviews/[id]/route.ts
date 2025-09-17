// app/api/reviews/[id]/route.ts
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

type Params = { params: { id: string } };

// 📌 Approve or reject a review
export async function PATCH(req: Request, { params }: Params) {
  try {
    const { verified } = await req.json();

    const updatedReview = await prisma.review.update({
      where: { id:await params.id },
      data: { verified },
    });

    return NextResponse.json(updatedReview);
  } catch (error) {
    console.error("Error updating review:", error);
    return NextResponse.json({ error: "Failed to update review" }, { status: 500 });
  }
}

// 📌 Delete a review
export async function DELETE(req: Request, { params }: Params) {
  try {
    // Remove ProductReview link first (due to foreign key)
    await prisma.productReview.deleteMany({
      where: { reviewId:await params.id },
    });

    // Then delete review
    await prisma.review.delete({
      where: { id: params.id },
    });

    return NextResponse.json({ message: "Review deleted" });
  } catch (error) {
    console.error("Error deleting review:", error);
    return NextResponse.json({ error: "Failed to delete review" }, { status: 500 });
  }
}
