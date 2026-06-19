import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const campaign = await prisma.campaign.findUnique({
    where: { id },
    include: {
      product: true,
      metrics: true,
      adGroups: { include: { keywords: true } },
    },
  });
  return NextResponse.json(campaign);
}

export async function POST(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const { status, dailyBudget, adGroups } = await req.json();

  // Delete existing ad groups (cascades to keywords) and recreate
  await prisma.adGroup.deleteMany({ where: { campaignId: id } });

  const campaign = await prisma.campaign.update({
    where: { id },
    data: {
      status,
      dailyBudget,
      adGroups: {
        create: adGroups.map((ag: any) => ({
          name: ag.name,
          defaultBid: parseFloat(ag.defaultBid) || 0,
          keywords: {
            create: ag.keywords.map((kw: any) => ({
              text: kw.text,
              matchType: kw.matchType,
              bid: parseFloat(kw.bid) || 0,
              searchVolume: kw.searchVolume ? parseInt(kw.searchVolume) : null,
              source: kw.searchVolume ? "helium10" : kw.source || null,
            })),
          },
        })),
      },
    },
    include: { adGroups: { include: { keywords: true } } },
  });

  return NextResponse.json(campaign);
}