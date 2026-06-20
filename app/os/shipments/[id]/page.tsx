"use client";
import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import BackButton from "@/components/BackButton";


const STATUS_OPTIONS = [
  { value: "READY_TO_SHIP", label: "Ready to Ship" },
  { value: "SHIPPED", label: "Shipped" },
  { value: "DELIVERED", label: "Delivered" },
  { value: "CHECKED_IN", label: "Checked In" },
  { value: "RECEIVING", label: "Receiving" },
  { value: "CLOSED", label: "Closed" },
];

const STATUS_COLOR: Record<string, string> = {
  READY_TO_SHIP: "#f59e0b",
  SHIPPED: "#3b82c4",
  DELIVERED: "#22c55e",
  CHECKED_IN: "#a78bfa",
  RECEIVING: "#06b6d4",
  CLOSED: "#475569",
};

export default function ShipmentDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;
  const [loading, setLoading] = useState(false);
  const [shipment, setShipment] = useState<any>(null);
  const [boxes, setBoxes] = useState<any[]>([]);
  const [status, setStatus] = useState("");
  const [unitsReceived, setUnitsReceived] = useState(0);

  useEffect(() => {
    fetch(`/api/os/shipments/${id}`)
      .then((r) => r.json())
      .then((data) => {
        setShipment(data);
        setBoxes(data.boxes || []);
        setStatus(data.status);
        setUnitsReceived(data.unitsReceived);
      });
  }, [id]);

  function addBox() {
    setBoxes([...boxes, { id: null, fbaLabel: "", trackingId: "", weightLb: 48, dimensions: "22 x 15 x 22" }]);
  }

  function updateBox(i: number, field: string, value: string) {
    setBoxes(boxes.map((b, idx) => idx === i ? { ...b, [field]: value } : b));
  }

  async function handleSave() {
    setLoading(true);
    await fetch(`/api/os/shipments/${id}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status, unitsReceived, boxes }),
    });
    router.push("/os/shipments");
  }

  if (!shipment) return <div style={{ padding: 40, color: "#475569" }}>Loading...</div>;

  const inputStyle = { width: "100%", background: "#0a1220", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 8, padding: "10px 16px", fontSize: 14, color: "#fff", outline: "none" };
  const labelStyle = { fontSize: 11, fontFamily: "'DM Mono', monospace", textTransform: "uppercase" as const, letterSpacing: "0.06em", color: "#475569", display: "block" as const, marginBottom: 6 };

  return (
    <div className="p-4 md:p-10 w-full max-w-4xl">
        <BackButton />
        
      <p style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, letterSpacing: "0.06em", textTransform: "uppercase" as const, color: "#3b82c4", marginBottom: 8 }}>
        Shipments · Detail
      </p>
      <h1 style={{ fontSize: "2rem", fontWeight: 300, color: "#e2e8f0", marginBottom: 4 }}>
        {shipment.shipmentName}
      </h1>
      <p style={{ fontSize: 11, fontFamily: "'DM Mono', monospace", color: "#475569", marginBottom: 32 }}>
        {shipment.amazonId} · {shipment.destination} · {shipment.product?.name}
      </p>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 32 }}>
        <div>
          <label style={labelStyle}>Status</label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            style={{ ...inputStyle, cursor: "pointer", color: STATUS_COLOR[status] }}
          >
            {STATUS_OPTIONS.map((o) => (
              <option key={o.value} value={o.value}>{o.label}</option>
            ))}
          </select>
        </div>
        <div>
          <label style={labelStyle}>Units Received</label>
          <input
            type="number"
            value={unitsReceived}
            onChange={(e) => setUnitsReceived(parseInt(e.target.value) || 0)}
            style={inputStyle}
          />
        </div>
      </div>

      {shipment.notes && (
        <div style={{ background: "rgba(255,255,255,0.03)", borderRadius: 8, padding: "12px 16px", border: "1px solid rgba(255,255,255,0.05)", marginBottom: 24 }}>
          <p style={{ fontSize: 11, fontFamily: "'DM Mono', monospace", color: "#475569", marginBottom: 4 }}>NOTES</p>
          <p style={{ fontSize: 13, color: "#94a3b8" }}>{shipment.notes}</p>
        </div>
      )}

      <div style={{ marginBottom: 24 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
          <p style={{ fontSize: 12, fontFamily: "'DM Mono', monospace", textTransform: "uppercase" as const, letterSpacing: "0.06em", color: "#94a3b8" }}>
            Boxes ({boxes.length})
          </p>
          <button onClick={addBox} style={{ fontSize: 12, color: "#60a5fa", background: "none", border: "1px solid rgba(96,165,250,0.3)", padding: "4px 12px", borderRadius: 6, cursor: "pointer" }}>
            + Add Box
          </button>
        </div>

        {/* Headers */}
        {boxes.length > 0 && (
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 110px 130px 32px", gap: 8, marginBottom: 6, padding: "0 4px" }}>
            {["FBA Label", "Tracking ID", "Weight (LB)", "Dimensions (IN)", ""].map((h) => (
              <p key={h} style={{ fontSize: 10, fontFamily: "'DM Mono', monospace", textTransform: "uppercase" as const, letterSpacing: "0.06em", color: "#475569" }}>{h}</p>
            ))}
          </div>
        )}

        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {boxes.map((box, i) => (
            <div key={i} style={{ display: "grid", gridTemplateColumns: "1fr 1fr 110px 130px 32px", gap: 8, alignItems: "center" }}>
              <input type="text" placeholder="FBA Label" value={box.fbaLabel || ""} onChange={(e) => updateBox(i, "fbaLabel", e.target.value)} style={{ ...inputStyle, fontSize: 12 }} />
              <input type="text" placeholder="Tracking ID" value={box.trackingId || ""} onChange={(e) => updateBox(i, "trackingId", e.target.value)} style={{ ...inputStyle, fontSize: 12 }} />
              <input type="number" placeholder="48" value={box.weightLb || ""} onChange={(e) => updateBox(i, "weightLb", e.target.value)} style={{ ...inputStyle, fontSize: 12 }} />
              <input type="text" placeholder="22 x 15 x 22" value={box.dimensions || ""} onChange={(e) => updateBox(i, "dimensions", e.target.value)} style={{ ...inputStyle, fontSize: 12 }} />
              <button onClick={() => setBoxes(boxes.filter((_, idx) => idx !== i))} style={{ background: "none", border: "none", color: "#ef4444", cursor: "pointer", fontSize: 16 }}>×</button>
            </div>
          ))}
        </div>
      </div>

      <button
        onClick={handleSave}
        disabled={loading}
        style={{ background: "linear-gradient(135deg, #1a3356, #2563a8)", color: "#fff", padding: "12px 24px", borderRadius: 10, fontSize: 14, fontWeight: 500, border: "none", cursor: "pointer" }}
      >
        {loading ? "Saving..." : "Save Changes"}
      </button>
    </div>
  );
}