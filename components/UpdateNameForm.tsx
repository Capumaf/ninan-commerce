"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function UpdateNameForm({
  productId,
  currentName,
}: {
  productId: string;
  currentName: string;
}) {
  const router = useRouter();
  const [name, setName] = useState(currentName);
  const [loading, setLoading] = useState(false);

  async function handleUpdate() {
    setLoading(true);
    await fetch(`/api/os/products/${productId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name }),
    });
    router.refresh();
    setLoading(false);
  }

  return (
    <div className="mt-6 bg-[#0a1220] border border-white/5 rounded-xl p-4">
      <p className="text-xs font-mono uppercase tracking-widest text-slate-500 mb-3">
        Product Name
      </p>
      <div className="flex items-center gap-3">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Product name"
          className="flex-1 bg-black/20 border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white outline-none focus:border-blue-500/50"
        />
        <button
          onClick={handleUpdate}
          disabled={loading}
          className="px-5 py-2.5 rounded-xl text-sm font-medium text-white disabled:opacity-50"
          style={{ background: "linear-gradient(135deg, #1a3356, #2563a8)" }}
        >
          {loading ? "Saving..." : "Update Name"}
        </button>
      </div>
    </div>
  );
}