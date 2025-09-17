// app/api/products/route.ts

import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { uploadImage } from "@/lib/cloudinary";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    console.log("[API] Received body:", body);
    console.log("🧾 Form Data Received:", body);

    // Destructure and validate required fields
    const {
      title, description, brand, sku,
      discount, category, subcategory,
      isFeatured, sizes, benefits,
      ingredients, longDescription, images,
    } = body;

    if (!title || !description || !sku || !category) {
      console.error("[API] Missing required field!");
      return NextResponse.json({ error: "Missing required field" }, { status: 400 });
    }

    // Validate arrays
    if (!Array.isArray(images) || images.length === 0) {
      console.error("[API] Images must be a non-empty array.");
      return NextResponse.json({ error: "Images must be provided" }, { status: 400 });
    }

    // 1️⃣ Upload images
    const uploaded = await Promise.all(images.map(async (img: string) => {
      try {
        const result = await uploadImage(img, "products");
        return { url: result.url, public_id: result.public_id };
      } catch (e) {
        console.error("[API][Cloudinary] Upload failed:", e);
        throw new Error("Image upload failed");
      }
    }));

    // 2️⃣ Find category and subcategory by slug
    const categoryDoc = await prisma.category.findUnique({ where: { slug: category } });
    const subCategoryDoc = await prisma.subCategory.findUnique({ where: { slug: subcategory } });

    if (!categoryDoc || !subCategoryDoc) {
      console.error("[API] Category/Subcategory not found");
      return NextResponse.json({ error: "Invalid category/subcategory" }, { status: 400 });
    }

    // 3️⃣ Create product in DB
    const product = await prisma.product.create({
      data: {
        title, description, brand, sku,
        discount, longDescription,
        featured: Boolean(isFeatured),
        slug: title.trim().toLowerCase().replace(/\s+/g, "-"),
        images: uploaded,
        sizes: sizes.map((s: any) => ({
          size: s.size,
          qty: s.quantity,
          price: s.price,
        })),
        benefits: benefits.map((b: string) => ({ name: b })),
        ingredients: ingredients.map((i: string) => ({ name: i })),
        category: { connect: { id: categoryDoc.id } },
        productSubCategories: {
          create: [{
            subCategory: { connect: { id: subCategoryDoc.id } },
          }],
        },
      },
    });

    console.log("[API] Created product:", product.id);
    return NextResponse.json({ product }, { status: 201 });

  } catch (err: any) {
    console.error("[API][ERROR]", err);
    return NextResponse.json({ error: err.message || "Internal Server Error" }, { status: 500 });
  }
}


export async function GET() {
  try {
    const products = await prisma.product.findMany({
      include: {
        category: true, // this includes the full category object
      },
    })
    
    return NextResponse.json(products)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch products' }, { status: 500 })
  }
}