import { prisma } from "@/lib/prisma";
import Link from "next/link";

const STATUS_COLOR: Record<string, string> = {
  READY_TO_SHIP: "#f59e0b",
  SHIPPED: "#3b82c4",
  DELIVERED: "#22c55e",
  CHECKED_IN: "#a78bfa",
  RECEIVING: "#06b6d4",
  CLOSED: "#475569",
};

const STATUS_LABEL: Record<string, string> = {
  READY_TO_SHIP: "Ready to Ship",
  SHIPPED: "Shipped",
  DELIVERED: "Delivered",
  CHECKED_IN: "Checked In",
  RECEIVING: "Receiving",
  CLOSED: "Closed",
};

export default async function ShipmentsPage() {
  const shipments = await prisma.shipment.findMany({
    include: { product: true, boxes: true },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="p-10">
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 32 }}>
        <div>
          <p style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, letterSpacing: "0.06em", textTransform: "uppercase" as const, color: "#3b82c4", marginBottom: 8 }}>
            Commerce OS · Shipments
          </p>
          <h1 style={{ fontSize: "2rem", fontWeight: 300, letterSpacing: "-0.03em", color: "#e2e8f0" }}>
            Shipment <span style={{ fontWeight: 600 }}>Tracker</span>
          </h1>
        </div>
        <Link
          href="/os/shipments/new"
          style={{ background: "linear-gradient(135deg, #1a3356, #2563a8)", color: "#fff", padding: "10px 20px", borderRadius: 10, fontSize: 13, fontWeight: 500, textDecoration: "none" }}
        >
          + New Shipment
        </Link>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 1, background: "rgba(255,255,255,0.04)", borderRadius: 12, overflow: "hidden", border: "1px solid rgba(255,255,255,0.06)" }}>
        {shipments.length === 0 && (
          <div style={{ background: "#0a1220", padding: "40px 24px", textAlign: "center" }}>
            <p style={{ color: "#475569", fontSize: 14 }}>No shipments yet. Create your first one.</p>
          </div>
        )}
        {shipments.map((s) => {
          const boxesWithTracking = s.boxes.filter((b) => b.trackingId).length;
          return (
            <div key={s.id} style={{ background: "#0a1220", padding: "20px 24px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
                <div>
                  <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 4 }}>
                    <p style={{ fontSize: 14, fontWeight: 500, color: "#e2e8f0" }}>{s.shipmentName}</p>
                    <span style={{ fontSize: 10, fontFamily: "'DM Mono', monospace", textTransform: "uppercase" as const, letterSpacing: "0.06em", color: STATUS_COLOR[s.status], background: `${STATUS_COLOR[s.status]}18`, padding: "2px 8px", borderRadius: 4, border: `1px solid ${STATUS_COLOR[s.status]}40` }}>
                      {STATUS_LABEL[s.status]}
                    </span>
                  </div>
                  <p style={{ fontSize: 11, fontFamily: "'DM Mono', monospace", color: "#3b82c4" }}>
                    {s.amazonId} · {s.destination} · {s.product.name}
                  </p>
                </div>
                <Link href={`/os/shipments/${s.id}`} style={{ fontSize: 12, color: "#60a5fa", textDecoration: "none" }}>
                  View →
                </Link>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12 }}>
                {[
                  { label: "Expected", value: s.unitsExpected, color: "#94a3b8" },
                  { label: "Received", value: s.unitsReceived, color: "#22c55e" },
                  { label: "Boxes", value: s.boxes.length, color: "#a78bfa" },
                  { label: "Tracking", value: `${boxesWithTracking}/${s.boxes.length}`, color: boxesWithTracking === s.boxes.length ? "#22c55e" : "#f59e0b" },
                ].map((m) => (
                  <div key={m.label} style={{ background: "rgba(255,255,255,0.03)", borderRadius: 8, padding: "12px 16px", border: "1px solid rgba(255,255,255,0.05)" }}>
                    <p style={{ fontSize: 10, fontFamily: "'DM Mono', monospace", textTransform: "uppercase" as const, letterSpacing: "0.06em", color: "#475569", marginBottom: 6 }}>{m.label}</p>
                    <p style={{ fontSize: 24, fontWeight: 300, color: m.color }}>{m.value}</p>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}