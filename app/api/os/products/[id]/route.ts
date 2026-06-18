import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const body = await req.json();
  const product = await prisma.product.update({
    where: { id },
    data: { status: body.status },
  });
  return NextResponse.json(product);
}