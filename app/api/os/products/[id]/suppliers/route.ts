import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const body = await req.json();
  const supplier = await prisma.supplier.create({
    data: {
      productId: id,
      supplierName: body.supplierName,
      contactEmail: body.contactEmail || null,
      country: body.country || null,
      unitPrice: body.unitPrice || null,
      currency: body.currency || "USD",
      moq: body.moq || null,
      leadTimeDays: body.leadTimeDays || null,
      sourceUrl: body.sourceUrl || null,
      generalNotes: body.generalNotes || null,
    },
  });
  return NextResponse.json(supplier);
}