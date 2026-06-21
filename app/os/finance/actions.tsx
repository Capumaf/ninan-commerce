"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createExpense(formData: FormData) {
  const productId = formData.get("productId") as string;
  const category = formData.get("category") as string;
  const description = formData.get("description") as string;
  const amountUsd = parseFloat(formData.get("amountUsd") as string);
  const date = formData.get("date") as string;
  const isRecurring = formData.get("isRecurring") === "on";
  const notes = formData.get("notes") as string;

  await prisma.expense.create({
    data: {
      productId: productId || null,
      category: category as any,
      description,
      amountUsd,
      date: date ? new Date(date) : new Date(),
      isRecurring,
      notes: notes || null,
    },
  });

  revalidatePath("/os/finance");
  redirect("/os/finance");
}

export async function deleteExpense(formData: FormData) {
  const id = formData.get("id") as string;
  await prisma.expense.delete({ where: { id } });
  revalidatePath("/os/finance");
}

export async function updateExpense(formData: FormData) {
  const id = formData.get("id") as string;
  const productId = formData.get("productId") as string;
  const category = formData.get("category") as string;
  const description = formData.get("description") as string;
  const amountUsd = parseFloat(formData.get("amountUsd") as string);
  const date = formData.get("date") as string;
  const isRecurring = formData.get("isRecurring") === "on";
  const notes = formData.get("notes") as string;

  await prisma.expense.update({
    where: { id },
    data: {
      productId: productId || null,
      category: category as any,
      description,
      amountUsd,
      date: date ? new Date(date) : new Date(),
      isRecurring,
      notes: notes || null,
    },
  });

  revalidatePath("/os/finance");
  redirect("/os/finance");
}