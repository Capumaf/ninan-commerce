import { prisma } from "@/lib/prisma";
import Link from "next/link";

export default async function InventoryPage() {
  const products = await prisma.product.findMany({
    include: { inventory: true },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="p-4 md:p-10">
      <p
        style={{
          fontFamily: "'DM Mono', monospace",
          fontSize: 11,
          letterSpacing: "0.06em",
          textTransform: "uppercase" as const,
          color: "#3b82c4",
          marginBottom: 8,
        }}
      >
        Commerce OS · Inventory
      </p>

      <h1
        style={{
          fontSize: "clamp(1.75rem, 4vw, 2rem)",
          fontWeight: 300,
          letterSpacing: "-0.03em",
          color: "#e2e8f0",
          marginBottom: 32,
        }}
      >
        Inventory <span style={{ fontWeight: 600 }}>Tracker</span>
      </h1>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 1,
          background: "rgba(255,255,255,0.04)",
          borderRadius: 12,
          overflow: "hidden",
          border: "1px solid rgba(255,255,255,0.06)",
        }}
      >
        {products.map((p) => (
          <div
            key={p.id}
            style={{
              background: "#0a1220",
              padding: "16px",
            }}
          >
            <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between mb-4">
              <div className="min-w-0">
                <p
                  style={{
                    fontSize: 14,
                    fontWeight: 500,
                    color: "#e2e8f0",
                    wordBreak: "break-word",
                  }}
                >
                  {p.name}
                </p>

                <p
                  style={{
                    fontSize: 11,
                    fontFamily: "'DM Mono', monospace",
                    color: "#3b82c4",
                    marginTop: 2,
                    wordBreak: "break-all",
                  }}
                >
                  {p.slug}
                </p>
                {(p.inventory?.unitsInFBA ?? 0) <= (p.inventory?.reorderPoint ?? 50) && (
               <span
               style={{
               display: "inline-block",
               marginTop: 6,
               fontSize: 10,
               fontFamily: "'DM Mono', monospace",
               textTransform: "uppercase" as const,
               letterSpacing: "0.06em",
                color: (p.inventory?.unitsInTransit ?? 0) === 0 ? "#fca5a5" : "#fbbf24",
               background:
               (p.inventory?.unitsInTransit ?? 0) === 0
               ? "rgba(239,68,68,0.1)"
               : "rgba(251,191,36,0.1)",
               border:
               (p.inventory?.unitsInTransit ?? 0) === 0
                 ? "1px solid rgba(239,68,68,0.2)"
                : "1px solid rgba(251,191,36,0.2)",
               borderRadius: 999,
               padding: "3px 10px",
               }}
  >
    {(p.inventory?.unitsInTransit ?? 0) === 0
      ? "⚠ Reorder Now"
      : "⚠ Low Stock"}
  </span>
)}
              </div>

              <Link
                href={`/os/inventory/${p.id}`}
                style={{
                  fontSize: 12,
                  color: "#60a5fa",
                  textDecoration: "none",
                  width: "fit-content",
                }}
              >
                Update →
              </Link>
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(130px, 1fr))",
                gap: 12,
              }}
            >
              {[
                {
                  label: "In FBA",
                  value: p.inventory?.unitsInFBA ?? 0,
                  color: "#22c55e",
                },
                {
                  label: "In Transit",
                  value: p.inventory?.unitsInTransit ?? 0,
                  color: "#f59e0b",
                },
                {
                  label: "Sold",
                  value: p.inventory?.unitsSold ?? 0,
                  color: "#3b82c4",
                },
                {
                  label: "Reorder At",
                  value: p.inventory?.reorderPoint ?? 50,
                  color: "#94a3b8",
                },
              ].map((m) => (
                <div
                  key={m.label}
                  style={{
                    background: "rgba(255,255,255,0.03)",
                    borderRadius: 8,
                    padding: "12px 14px",
                    border: "1px solid rgba(255,255,255,0.05)",
                  }}
                >
                  <p
                    style={{
                      fontSize: 10,
                      fontFamily: "'DM Mono', monospace",
                      textTransform: "uppercase" as const,
                      letterSpacing: "0.06em",
                      color: "#475569",
                      marginBottom: 6,
                    }}
                  >
                    {m.label}
                  </p>

                  <p
                    style={{
                      fontSize: 22,
                      fontWeight: 300,
                      color: m.color,
                    }}
                  >
                    {m.value}
                  </p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}