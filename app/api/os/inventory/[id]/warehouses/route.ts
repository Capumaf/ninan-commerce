import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id: productId } = await params;

  const inventory = await prisma.inventory.findUnique({
    where: { productId },
    include: { warehouses: true },
  });

  return NextResponse.json(inventory?.warehouses ?? []);
}

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id: productId } = await params;
  const body = await req.json();

  const inventory = await prisma.inventory.findUnique({
    where: { productId },
  });

  if (!inventory) {
    return NextResponse.json({ error: "No inventory found" }, { status: 404 });
  }

  const warehouse = await prisma.warehouseStock.create({
    data: {
      inventoryId: inventory.id,
      warehouseCode: body.warehouseCode,
      units: body.units,
    },
  });

  return NextResponse.json(warehouse);
}