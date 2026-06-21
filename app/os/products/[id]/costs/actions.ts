"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function saveCosts(formData: FormData) {
  const productId = formData.get("productId") as string;
  const existingId = formData.get("existingId") as string;

  const fields = [
    "referralFeeUsd", "fbaFeeUsd", "returnProcessingFeeUsd",
    "targetAcosPct", "estimatedCpc", "estimatedCvr", "ppcCostPerUnitUsd",
    "freightPerUnitUsd", "customsBrokerFeeUsd", "isfFilingFeeUsd",
    "drayagePerUnitUsd", "cargoInsuranceUsd", "dutiesUsd", "dutyRatePct",
    "prepCostUsd", "labelingCostUsd", "inspectionUsd",
    "monthlyStorageUsd", "longtermStorageUsd", "sampleCostUsd",
    "photographyUsd", "miscCostUsd",
  ];

  const data: Record<string, number | null> = {};
  for (const f of fields) {
    const val = formData.get(f) as string;
    data[f] = val ? parseFloat(val) : null;
  }

  const notes = formData.get("notes") as string;

  if (existingId) {
    await prisma.amazonCostOperation.update({
      where: { id: existingId },
      data: { ...data, notes: notes || null },
    });
  } else {
    await prisma.amazonCostOperation.create({
      data: {
        productId,
        label: "Base Estimate",
        ...data,
        notes: notes || null,
      },
    });
  }

  revalidatePath(`/os/products/${productId}`);
  revalidatePath("/os/finance");
  redirect(`/os/products/${productId}`);
}