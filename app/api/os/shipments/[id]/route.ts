import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const shipment = await prisma.shipment.findUnique({
    where: { id },
    include: { product: true, boxes: true },
  });
  return NextResponse.json(shipment);
}

export async function POST(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const { status, unitsReceived, boxes } = await req.json();

  await prisma.shipmentBox.deleteMany({ where: { shipmentId: id } });

  const shipment = await prisma.shipment.update({
    where: { id },
    data: {
      status,
      unitsReceived,
      boxes: {
        create: boxes.map((b: any, i: number) => ({
          boxNumber: i + 1,
          fbaLabel: b.fbaLabel,
          trackingId: b.trackingId || null,
          weightLb: b.weightLb ? parseFloat(b.weightLb) : null,
          dimensions: b.dimensions || null,
        })),
      },
    },
    include: { boxes: true },
  });

  return NextResponse.json(shipment);
}