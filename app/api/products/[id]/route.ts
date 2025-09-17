import { uploadImage } from "@/lib/cloudinary";
import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(_: NextRequest, { params }: { params: { id: string } }) {
  try {
    const {id} = await params ;
    const product = await prisma.product.findUnique({
      where: { id: id }, 
      include: {
        category: true, // this includes the full category object
      },
    });

    if (!product) return NextResponse.json({ error: "Not found" }, { status: 404 });

    return NextResponse.json(product);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch product" }, { status: 500 });
  }
}

// export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
//   const data = await req.json();

//   try {
//     // Delete existing sizes
//     await prisma.size.deleteMany({
//       where: { productId: params.id },
//     });

//     // Update product and add new sizes
//     const updated = await prisma.product.update({
//       where: { id: params.id },
//       data: {
//         ...data,
//         sizes: {
//           create: data.sizes,
//         },
//       },
//     });

//     return Response.json(updated);
//   } catch (error) {
//     return Response.json({ error: "Failed to update product" }, { status: 500 });
//   }
// }


export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const data = await req.json();
    const productId = params.id;

    if (!productId) {
      return NextResponse.json({ error: "Product ID is required" }, { status: 400 });
    }

    const {
      title,
      description,
      longDescription,
      brand,
      sku,
      categoryId,
      featured,
      discount,
      benefits,
      ingredients,
      images,
      sizes,
    } = data;

    const uploaded = await Promise.all(images.map(async (img: string) => {
          try {
            const result = await uploadImage(img, "products");
            return { url: result.url, public_id: result.public_id };
          } catch (e) {
            console.error("[API][Cloudinary] Upload failed:", e);
            throw new Error("Image upload failed");
          }
        }));

    const updated = await prisma.product.update({
      where: { id: productId },
      data: {
        title,
        description,
        longDescription,
        brand,
        sku,
        categoryId,
        featured,
        discount,
        benefits: benefits?.map((b: any) => ({ name: b.name || b })) || [],
        ingredients: ingredients?.map((i: any) => ({ name: i.name || i })) || [],
        images: uploaded?.map((img: any) => ({
          url: img.url || img,
          public_id: img.public_id || "",
        })) || [],
        sizes: sizes?.map((s: any) => ({
          size: s.size,
          qty: s.quantity || s.qty || 0,
          price: s.price,
          sold: s.sold || 0,
        })) || [],
      },
    });

    return NextResponse.json(updated);
  } catch (error) {
    console.error("PUT /api/products/[id] error:", error);
    return NextResponse.json({ error: "Failed to update product" }, { status: 500 });
  }
}

// export async function DELETE(_: NextRequest, { params }: { params: { id: string } }) {
//   try {
//     await prisma.size.deleteMany({
//       where: { productId: params.id },
//     });

//     await prisma.product.delete({
//       where: { id: params.id },
//     });

//     return Response.json({ success: true });
//   } catch (error) {
//     return Response.json({ error: "Failed to delete product" }, { status: 500 });
//   }
// }
