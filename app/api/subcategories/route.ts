import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { uploadImage } from '@/lib/cloudinary';




// GET all subcategories
export async function GET() {
  try {
    const subcategories = await prisma.subCategory.findMany({
      include: { parent: true },
      orderBy: { createdAt: 'desc' },
    });

    const result = subcategories.map((sub) => ({
      id: sub.id,
      name: sub.name,
      image: sub.images[0]?.url || '',
      slug: sub.slug,
      parentCategoryId: sub.parentId,
      parentCategoryName: sub.parent.name,
      createdAt: sub.createdAt,
    }));

    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch subcategories' }, { status: 500 });
  }
}

// CREATE subcategory
export async function POST(req: Request) {
  try {
    const { name, parentCategoryId, image } = await req.json();
    const uploadedImage = await uploadImage(image, 'subcategories');

    // const { url, public_id } = uploadedImage;
    const subcategory = await prisma.subCategory.create({
      data: {
        name,
        slug: name.toLowerCase().replace(/\s+/g, '-'),
        parentId: parentCategoryId,
        images: { set: [{ url: uploadedImage.url, public_url: uploadedImage.public_id }] },
      },
      include: { parent: true },
    });
    console.log(subcategory);
    
    return NextResponse.json({subcategory }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create subcategory' }, { status: 500 });
  }
}
