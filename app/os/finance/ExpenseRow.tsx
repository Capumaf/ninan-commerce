"use client";

import Link from "next/link";
import { deleteExpense } from "./actions";

type ExpenseRowProps = {
  id: string;
  description: string;
  category: string;
  productName: string;
  date: Date;
  amountUsd: number;
};

export default function ExpenseRow({
  id,
  description,
  category,
  productName,
  date,
  amountUsd,
}: ExpenseRowProps) {
  return (
    <div className="flex flex-col gap-1 md:flex-row md:items-center md:justify-between bg-[#0a1220] px-4 md:px-6 py-4">
      <div className="min-w-0">
        <p className="text-sm font-medium text-white">{description}</p>
        <p className="text-xs text-slate-500 mt-0.5">
          {category} · {productName} · {new Date(date).toLocaleDateString()}
        </p>
      </div>
      <div className="flex items-center gap-4">
        <span className="text-sm font-mono text-white">
          ${amountUsd.toFixed(2)}
        </span>

        <Link
         href={`/os/finance/${id}/edit`}
        className="text-xs font-semibold hover:underline"
         style={{ color: "#60a5fa" }}
         >
          Edit
         </Link>
        
        <form action={deleteExpense}>
          <input type="hidden" name="id" value={id} />
          <button
            type="submit"
            className="text-xs font-semibold text-red-400 hover:text-red-300"
          >
            Delete
          </button>
        </form>
      </div>
    </div>
  );
}