"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function UpdateSellingPriceForm({
  productId,
  currentSellingPriceUsd,
}: {
  productId: string;
  currentSellingPriceUsd: number | null;
}) {
  const router = useRouter();

  const [sellingPriceUsd, setSellingPriceUsd] = useState(
    currentSellingPriceUsd?.toString() ?? ""
  );
  const [loading, setLoading] = useState(false);

  async function handleUpdate() {
    setLoading(true);

    await fetch(`/api/os/products/${productId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        sellingPriceUsd:
          sellingPriceUsd.trim() === "" ? null : Number(sellingPriceUsd),
      }),
    });

    router.refresh();
    setLoading(false);
  }

  return (
    <div className="mt-6 bg-[#0a1220] border border-white/5 rounded-xl p-4">
      <p className="text-xs font-mono uppercase tracking-widest text-slate-500 mb-3">
        Selling Price USD
      </p>

      <div className="flex items-center gap-3">
        <input
          type="number"
          step="0.01"
          value={sellingPriceUsd}
          onChange={(e) => setSellingPriceUsd(e.target.value)}
          placeholder="13.00"
          className="bg-black/20 border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white outline-none focus:border-blue-500/50"
        />

        <button
          onClick={handleUpdate}
          disabled={loading}
          className="px-5 py-2.5 rounded-xl text-sm font-medium text-white disabled:opacity-50"
          style={{ background: "linear-gradient(135deg, #1a3356, #2563a8)" }}
        >
          {loading ? "Saving..." : "Update Price"}
        </button>
      </div>
    </div>
  );
}