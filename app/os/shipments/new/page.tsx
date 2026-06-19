"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

const STATUS_OPTIONS = [
  { value: "READY_TO_SHIP", label: "Ready to Ship" },
  { value: "SHIPPED", label: "Shipped" },
  { value: "DELIVERED", label: "Delivered" },
  { value: "CHECKED_IN", label: "Checked In" },
  { value: "RECEIVING", label: "Receiving" },
  { value: "CLOSED", label: "Closed" },
];

export default function NewShipmentPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    shipmentName: "",
    amazonId: "",
    destination: "",
    status: "READY_TO_SHIP",
    unitsExpected: 0,
    notes: "",
  });
  const [boxes, setBoxes] = useState<{ fbaLabel: string; trackingId: string; weightLb: string; dimensions: string }[]>([]);

  function addBox() {
    setBoxes([...boxes, { fbaLabel: "", trackingId: "", weightLb: "48", dimensions: "22 x 15 x 22" }]);
  }

  function removeBox(i: number) {
    setBoxes(boxes.filter((_, idx) => idx !== i));
  }

  function updateBox(i: number, field: string, value: string) {
    setBoxes(boxes.map((b, idx) => idx === i ? { ...b, [field]: value } : b));
  }

  async function handleSave() {
    setLoading(true);
    await fetch("/api/os/shipments", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...form, boxes }),
    });
    router.push("/os/shipments");
  }

  const inputStyle = { width: "100%", background: "#0a1220", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 8, padding: "10px 16px", fontSize: 14, color: "#fff", outline: "none" };
  const labelStyle = { fontSize: 11, fontFamily: "'DM Mono', monospace", textTransform: "uppercase" as const, letterSpacing: "0.06em", color: "#475569", display: "block" as const, marginBottom: 6 };

  return (
    <div style={{ padding: 40, maxWidth: 700 }}>
      <p style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, letterSpacing: "0.06em", textTransform: "uppercase" as const, color: "#3b82c4", marginBottom: 8 }}>
        Shipments · New
      </p>
      <h1 style={{ fontSize: "2rem", fontWeight: 300, color: "#e2e8f0", marginBottom: 32 }}>
        New <span style={{ fontWeight: 600 }}>Shipment</span>
      </h1>

      <div style={{ display: "flex", flexDirection: "column", gap: 16, marginBottom: 32 }}>
        {[
          { key: "shipmentName", label: "Shipment Name", placeholder: "FBA STA (04/21/2026 04:47)-IAH3" },
          { key: "amazonId", label: "Amazon Shipment ID", placeholder: "FBA19BXGJ1LG" },
          { key: "destination", label: "Destination FC", placeholder: "IAH3" },
        ].map((f) => (
          <div key={f.key}>
            <label style={labelStyle}>{f.label}</label>
            <input
              type="text"
              placeholder={f.placeholder}
              value={form[f.key as keyof typeof form] as string}
              onChange={(e) => setForm({ ...form, [f.key]: e.target.value })}
              style={inputStyle}
            />
          </div>
        ))}

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
          <div>
            <label style={labelStyle}>Status</label>
            <select
              value={form.status}
              onChange={(e) => setForm({ ...form, status: e.target.value })}
              style={{ ...inputStyle, cursor: "pointer" }}
            >
              {STATUS_OPTIONS.map((o) => (
                <option key={o.value} value={o.value}>{o.label}</option>
              ))}
            </select>
          </div>
          <div>
            <label style={labelStyle}>Units Expected</label>
            <input
              type="number"
              value={form.unitsExpected}
              onChange={(e) => setForm({ ...form, unitsExpected: parseInt(e.target.value) || 0 })}
              style={inputStyle}
            />
          </div>
        </div>

        <div>
          <label style={labelStyle}>Notes</label>
          <textarea
            value={form.notes}
            onChange={(e) => setForm({ ...form, notes: e.target.value })}
            rows={2}
            style={{ ...inputStyle, resize: "none" as const }}
          />
        </div>
      </div>

      <div style={{ marginBottom: 24 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
          <p style={{ fontSize: 12, fontFamily: "'DM Mono', monospace", textTransform: "uppercase" as const, letterSpacing: "0.06em", color: "#94a3b8" }}>
            Boxes ({boxes.length})
          </p>
          <button onClick={addBox} style={{ fontSize: 12, color: "#60a5fa", background: "none", border: "1px solid rgba(96,165,250,0.3)", padding: "4px 12px", borderRadius: 6, cursor: "pointer" }}>
            + Add Box
          </button>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {boxes.map((box, i) => (
        <div key={i} style={{ display: "grid", gridTemplateColumns: "1fr 1fr 110px 130px 32px", gap: 8, alignItems: "center" }}>
        <input type="text" placeholder={`FBA19BXNM3ZPU00000${i + 1}`} value={box.fbaLabel} onChange={(e) => updateBox(i, "fbaLabel", e.target.value)} style={{ ...inputStyle, fontSize: 12 }} />
        <input type="text" placeholder="Tracking ID" value={box.trackingId} onChange={(e) => updateBox(i, "trackingId", e.target.value)} style={{ ...inputStyle, fontSize: 12 }} />
         <input type="number" placeholder='Weight (LB)' value={box.weightLb} onChange={(e) => updateBox(i, "weightLb", e.target.value)} style={{ ...inputStyle, fontSize: 12 }} />
    <input type="text" placeholder='22 x 15 x 22 (IN)' value={(box as any).dimensions || ""} onChange={(e) => updateBox(i, "dimensions", e.target.value)} style={{ ...inputStyle, fontSize: 12 }} />
    <button onClick={() => removeBox(i)} style={{ background: "none", border: "none", color: "#ef4444", cursor: "pointer", fontSize: 16 }}>×</button>
  </div>
))}
        </div>
      </div>

      <button
        onClick={handleSave}
        disabled={loading}
        style={{ background: "linear-gradient(135deg, #1a3356, #2563a8)", color: "#fff", padding: "12px 24px", borderRadius: 10, fontSize: 14, fontWeight: 500, border: "none", cursor: "pointer" }}
      >
        {loading ? "Saving..." : "Save Shipment"}
      </button>
    </div>
  );
}