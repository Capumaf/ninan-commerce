"use client";
import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";

export default function UpdateInventoryPage() {
  const router = useRouter();
  const params = useParams();
  const productId = params.id as string;
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    unitsInFBA: 0,
    unitsInTransit: 0,
    unitsSold: 0,
    unitsReserved: 0,
    reorderPoint: 50,
    notes: "",
  });

  useEffect(() => {
    if (!productId) return;
    fetch(`/api/os/inventory/${productId}`)
      .then((r) => r.json())
      .then((data) => {
        if (data) setForm({
          unitsInFBA: data.unitsInFBA ?? 0,
          unitsInTransit: data.unitsInTransit ?? 0,
          unitsSold: data.unitsSold ?? 0,
          unitsReserved: data.unitsReserved ?? 0,
          reorderPoint: data.reorderPoint ?? 50,
          notes: data.notes ?? "",
        });
      });
  }, [productId]);

  async function handleSave() {
    setLoading(true);
    await fetch(`/api/os/inventory/${productId}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    router.push("/os/inventory");
    setLoading(false);
  }

  return (
    <div style={{ padding: 40, maxWidth: 500 }}>
      <p style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, letterSpacing: "0.06em", textTransform: "uppercase", color: "#3b82c4", marginBottom: 8 }}>
        Inventory · Update
      </p>
      <h1 style={{ fontSize: "2rem", fontWeight: 300, color: "#e2e8f0", marginBottom: 32 }}>
        Update <span style={{ fontWeight: 600 }}>Stock</span>
      </h1>

      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        {[
          { key: "unitsInFBA", label: "Units in FBA" },
          { key: "unitsInTransit", label: "Units in Transit" },
          { key: "unitsSold", label: "Units Sold" },
          { key: "unitsReserved", label: "Units Reserved" },
          { key: "reorderPoint", label: "Reorder Point" },
        ].map((f) => (
          <div key={f.key}>
            <label style={{ fontSize: 11, fontFamily: "'DM Mono', monospace", textTransform: "uppercase", letterSpacing: "0.06em", color: "#475569", display: "block", marginBottom: 6 }}>
              {f.label}
            </label>
            <input
              type="number"
              value={form[f.key as keyof typeof form] as number}
              onChange={(e) => setForm({ ...form, [f.key]: parseInt(e.target.value) || 0 })}
              style={{ width: "100%", background: "#0a1220", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 8, padding: "10px 16px", fontSize: 14, color: "#fff", outline: "none" }}
            />
          </div>
        ))}

        <div>
          <label style={{ fontSize: 11, fontFamily: "'DM Mono', monospace", textTransform: "uppercase", letterSpacing: "0.06em", color: "#475569", display: "block", marginBottom: 6 }}>
            Notes
          </label>
          <textarea
            value={form.notes}
            onChange={(e) => setForm({ ...form, notes: e.target.value })}
            rows={3}
            style={{ width: "100%", background: "#0a1220", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 8, padding: "10px 16px", fontSize: 14, color: "#fff", outline: "none", resize: "none" }}
          />
        </div>

        <button
          onClick={handleSave}
          disabled={loading}
          style={{ background: "linear-gradient(135deg, #1a3356, #2563a8)", color: "#fff", padding: "12px 24px", borderRadius: 10, fontSize: 14, fontWeight: 500, border: "none", cursor: "pointer" }}
        >
          {loading ? "Saving..." : "Save Inventory"}
        </button>
      </div>
    </div>
  );
}