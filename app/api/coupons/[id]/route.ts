import prisma from '@/lib/prisma';

export async function PATCH(req: Request, { params }: { params: { id: string } }) {
  const body = await req.json();
  const coupon = await prisma.coupon.update({
    where: { id: await params.id },
    data: body,
  });
  return Response.json(coupon);
}

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  await prisma.coupon.delete({ where: { id: params.id } });
  return Response.json({ success: true });
}
