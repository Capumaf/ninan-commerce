import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  const shipments = await prisma.shipment.findMany({
    include: { product: true, boxes: true },
    orderBy: { createdAt: "desc" },
  });
  return NextResponse.json(shipments);
}

export async function POST(req: Request) {
  const body = await req.json();
  const { boxes, ...shipmentData } = body;

  let productId = shipmentData.productId;
  if (!productId) {
    const firstProduct = await prisma.product.findFirst();
    productId = firstProduct?.id;
  }

  const shipment = await prisma.shipment.create({
    data: {
      ...shipmentData,
      productId,
      boxes: {
        create: boxes.map((b: { fbaLabel: string; trackingId: string; weightLb: string }, i: number) => ({
          boxNumber: i + 1,
          fbaLabel: b.fbaLabel,
          trackingId: b.trackingId || null,
          weightLb: b.weightLb ? parseFloat(b.weightLb) : null,
        })),
      },
    },
    include: { boxes: true },
  });

  return NextResponse.json(shipment);
}