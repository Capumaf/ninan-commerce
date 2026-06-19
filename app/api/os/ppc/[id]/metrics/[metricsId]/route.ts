import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function DELETE(
  _req: Request,
  { params }: { params: Promise<{ metricsId: string }> }
) {
  const { metricsId } = await params;
  await prisma.campaignMetric.delete({ where: { id: metricsId } });
  return NextResponse.json({ success: true });
}
