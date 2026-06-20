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
    data: {
      ...(body.status !== undefined && {
        status: body.status,
      }),
      ...(body.sellingPriceUsd !== undefined && {
        sellingPriceUsd: body.sellingPriceUsd,
      }),
      ...(body.name !== undefined && {
        name: body.name,
      }),
    },
  });
  return NextResponse.json(product);
}