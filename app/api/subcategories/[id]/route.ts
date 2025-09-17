import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  try {
    const { name, parentCategoryId, image } = await req.json();

    const updated = await prisma.subCategory.update({
      where: { id: params.id },
      data: {
        name,
        slug: name.toLowerCase().replace(/\s+/g, '-'),
        parentId: parentCategoryId,
        images: { set: [{ url: image, public_url: image }] },
      },
      include: { parent: true },
    });

    return NextResponse.json({
      id: updated.id,
      name: updated.name,
      image,
      parentCategoryId,
      parentCategoryName: updated.parent.name,
      createdAt: updated.createdAt,
    });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update subcategory' }, { status: 500 });
  }
}

export async function DELETE(_: Request, { params }: { params: { id: string } }) {
  try {
    await prisma.subCategory.delete({ where: { id: params.id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete subcategory' }, { status: 500 });
  }
}
