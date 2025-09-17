// app/api/coupons/route.ts
import  prisma  from '@/lib/prisma';

export async function GET() {
  const coupons = await prisma.coupon.findMany();
  return Response.json(coupons);
}

export async function POST(req: Request) {
  const body = await req.json();
  const coupons = await prisma.coupon.create({ data: body });
  return Response.json(coupons);
}
