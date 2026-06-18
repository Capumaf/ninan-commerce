import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const inventory = await prisma.inventory.findUnique({ where: { productId: id } });
  return NextResponse.json(inventory);
}

export async function POST(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const body = await req.json();
  const inventory = await prisma.inventory.upsert({
    where: { productId: id },
    update: body,
    create: { productId: id, ...body },
  });
  return NextResponse.json(inventory);
}