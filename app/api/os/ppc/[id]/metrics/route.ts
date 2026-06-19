import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const { date, impressions, clicks, spend, sales, orders } = await req.json();

  const metric = await prisma.campaignMetric.upsert({
    where: {
      campaignId_date: {
        campaignId: id,
        date: new Date(date),
      },
    },
    update: { impressions, clicks, spend, sales, orders },
    create: {
      campaignId: id,
      date: new Date(date),
      impressions,
      clicks,
      spend,
      sales,
      orders,
    },
  });

  return NextResponse.json(metric);
}