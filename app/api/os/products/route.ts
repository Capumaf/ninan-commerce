import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json();
  const product = await prisma.product.create({
    data: {
      name: body.name,
      slug: body.slug,
      category: body.category || null,
      asin: body.asin || null,
      referenceUrl: body.referenceUrl || null,
      notes: body.notes || null,
    },
  });
  return NextResponse.json(product);
}

export async function GET() {
  const products = await prisma.product.findMany({
    orderBy: { createdAt: "desc" },
  });
  return NextResponse.json(products);
}