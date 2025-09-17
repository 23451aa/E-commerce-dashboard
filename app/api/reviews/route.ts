// app/api/reviews/route.ts
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

// 📌 Get all reviews (for dashboard)
export async function GET() {
  try {
    const reviews = await prisma.review.findMany({
      include: {
        reviewBy: { select: { id: true, username: true, email: true } },
        productReviews: {
          include: {
            product: { select: { id: true, title: true, slug: true } },
          },
        },
      },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(reviews);
  } catch (error) {
    console.error("Error fetching reviews:", error);
    return NextResponse.json({ error: "Failed to fetch reviews" }, { status: 500 });
  }
}

// 📌 Create a review (website side)
export async function POST(req: Request) {
  try {
    const { rating, review, productId, userId } = await req.json();

    if (!rating || !review || !productId || !userId) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    const newReview = await prisma.review.create({
      data: {
        rating,
        review,
        reviewCreatedAt: new Date(),
        reviewById: userId,
        verified: false, // admin will approve
        productReviews: {
          create: {
            productId,
          },
        },
      },
      include: {
        reviewBy: { select: { id: true, username: true } },
      },
    });

    return NextResponse.json(newReview);
  } catch (error) {
    console.error("Error creating review:", error);
    return NextResponse.json({ error: "Failed to create review" }, { status: 500 });
  }
}
