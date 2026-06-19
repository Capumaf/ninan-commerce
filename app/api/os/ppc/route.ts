import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  const campaigns = await prisma.campaign.findMany({
    include: { product: true, metrics: true, adGroups: { include: { keywords: true } } },
    orderBy: { createdAt: "desc" },
  });
  return NextResponse.json(campaigns);
}

export async function POST(req: Request) {
  const body = await req.json();
  const { adGroups, ...campaignData } = body;

  let productId = campaignData.productId;
  if (!productId) {
    const firstProduct = await prisma.product.findFirst();
    productId = firstProduct?.id;
  }

  const campaign = await prisma.campaign.create({
    data: {
      ...campaignData,
      productId,
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
              source: kw.searchVolume ? "helium10" : null,
            })),
          },
        })),
      },
    },
    include: { adGroups: { include: { keywords: true } } },
  });

  return NextResponse.json(campaign);
}