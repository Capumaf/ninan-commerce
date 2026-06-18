import { prisma } from "@/lib/prisma";
import Link from "next/link";

export default async function InventoryPage() {
  const products = await prisma.product.findMany({
    include: { inventory: true },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="p-10">
      <p style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, letterSpacing: "0.06em", textTransform: "uppercase" as const, color: "#3b82c4", marginBottom: 8 }}>
        Commerce OS · Inventory
      </p>
      <h1 style={{ fontSize: "2rem", fontWeight: 300, letterSpacing: "-0.03em", color: "#e2e8f0", marginBottom: 32 }}>
        Inventory <span style={{ fontWeight: 600 }}>Tracker</span>
      </h1>

      <div style={{ display: "flex", flexDirection: "column", gap: 1, background: "rgba(255,255,255,0.04)", borderRadius: 12, overflow: "hidden", border: "1px solid rgba(255,255,255,0.06)" }}>
        {products.map((p) => (
          <div key={p.id} style={{ background: "#0a1220", padding: "20px 24px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
              <div>
                <p style={{ fontSize: 14, fontWeight: 500, color: "#e2e8f0" }}>{p.name}</p>
                <p style={{ fontSize: 11, fontFamily: "'DM Mono', monospace", color: "#3b82c4", marginTop: 2 }}>{p.slug}</p>
              </div>
              <Link
                href={`/os/inventory/${p.id}`}
                style={{ fontSize: 12, color: "#60a5fa", textDecoration: "none" }}
              >
                Update →
              </Link>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12 }}>
              {[
                { label: "In FBA", value: p.inventory?.unitsInFBA ?? 0, color: "#22c55e" },
                { label: "In Transit", value: p.inventory?.unitsInTransit ?? 0, color: "#f59e0b" },
                { label: "Sold", value: p.inventory?.unitsSold ?? 0, color: "#3b82c4" },
                { label: "Reorder At", value: p.inventory?.reorderPoint ?? 50, color: "#94a3b8" },
              ].map((m) => (
                <div key={m.label} style={{ background: "rgba(255,255,255,0.03)", borderRadius: 8, padding: "12px 16px", border: "1px solid rgba(255,255,255,0.05)" }}>
                  <p style={{ fontSize: 10, fontFamily: "'DM Mono', monospace", textTransform: "uppercase" as const, letterSpacing: "0.06em", color: "#475569", marginBottom: 6 }}>{m.label}</p>
                  <p style={{ fontSize: 24, fontWeight: 300, color: m.color }}>{m.value}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}