"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

const STATUS_OPTIONS = [
  "RESEARCHING","SAMPLING","APPROVED","REJECTED","ACTIVE","DISCONTINUED"
];

export default function UpdateStatusForm({
  productId,
  currentStatus,
}: {
  productId: string;
  currentStatus: string;
}) {
  const router = useRouter();
  const [status, setStatus] = useState(currentStatus);
  const [loading, setLoading] = useState(false);

  async function handleUpdate() {
    setLoading(true);
    await fetch(`/api/os/products/${productId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    router.refresh();
    setLoading(false);
  }

  return (
    <div className="mt-6 flex items-center gap-3">
      <select
  value={status}
  onChange={(e) => setStatus(e.target.value)}
  style={{ color: "white" }}
  className="bg-[#0a1220] border border-white/10 rounded-lg px-4 py-2.5 text-sm outline-none focus:border-blue-500/50"
>
        {STATUS_OPTIONS.map((s) => (
          <option key={s} value={s}>{s}</option>
        ))}
      </select>
      <button
        onClick={handleUpdate}
        disabled={loading}
        className="px-5 py-2.5 rounded-xl text-sm font-medium text-white disabled:opacity-50"
        style={{ background: "linear-gradient(135deg, #1a3356, #2563a8)" }}
      >
        {loading ? "Saving..." : "Update Status"}
      </button>
    </div>
  );
}