import { prisma } from "@/lib/prisma";
import Link from "next/link";

function sumCosts(costs: any) {
  if (!costs) return 0;
  const fields = [
    "referralFeeUsd", "fbaFeeUsd", "returnProcessingFeeUsd", "ppcCostPerUnitUsd",
    "freightPerUnitUsd", "customsBrokerFeeUsd", "isfFilingFeeUsd", "drayagePerUnitUsd",
    "cargoInsuranceUsd", "dutiesUsd", "prepCostUsd", "labelingCostUsd",
    "inspectionUsd", "monthlyStorageUsd", "longtermStorageUsd",
  ];
  return fields.reduce((sum, f) => sum + (costs[f] || 0), 0);
}

function calcAcos(spend: number, sales: number) {
  if (sales === 0) return null;
  return (spend / sales) * 100;
}

const ACOS_ALERT_THRESHOLD = 35;

export default async function AnalyticsPage() {
  const products = await prisma.product.findMany({
    include: {
      inventory: true,
      amazonCosts: true,
      shipments: { include: { boxes: true } },
      campaigns: { include: { metrics: true } },
    },
    orderBy: { createdAt: "desc" },
  });

  const productData = products.map((p) => {
    const costPerUnit = sumCosts(p.amazonCosts?.[0]);
    const margin = p.sellingPriceUsd ? p.sellingPriceUsd - costPerUnit : null;
    const marginPct = margin !== null && p.sellingPriceUsd ? (margin / p.sellingPriceUsd) * 100 : null;

    const totalSpend = p.campaigns.reduce((s, c) => s + c.metrics.reduce((s2, m) => s2 + m.spend, 0), 0);
    const totalSales = p.campaigns.reduce((s, c) => s + c.metrics.reduce((s2, m) => s2 + m.sales, 0), 0);
    const acos = calcAcos(totalSpend, totalSales);

    const stockLow = p.inventory ? p.inventory.unitsInFBA <= p.inventory.reorderPoint : false;
    const acosHigh = acos !== null && acos > ACOS_ALERT_THRESHOLD;
    const shipmentMissingTracking = p.shipments.some((s) =>
      s.boxes.some((b) => !b.trackingId)
    );
    const activeShipments = p.shipments.filter((s) => s.status !== "CLOSED" && s.status !== "DELIVERED").length;

    return {
      ...p,
      costPerUnit,
      margin,
      marginPct,
      totalSpend,
      totalSales,
      acos,
      stockLow,
      acosHigh,
      shipmentMissingTracking,
      activeShipments,
    };
  });

  const alerts: { type: string; message: string; color: string }[] = [];
  productData.forEach((p) => {
    if (p.stockLow) {
      alerts.push({
        type: "stock",
        message: `${p.name.trim()} — stock bajo: ${p.inventory?.unitsInFBA ?? 0} unidades en FBA (reorder: ${p.inventory?.reorderPoint})`,
        color: "#f59e0b",
      });
    }
    if (p.acosHigh) {
      alerts.push({
        type: "acos",
        message: `${p.name.trim()} — ACOS alto: ${p.acos?.toFixed(1)}% (umbral: ${ACOS_ALERT_THRESHOLD}%)`,
        color: "#ef4444",
      });
    }
    if (p.shipmentMissingTracking) {
      alerts.push({
        type: "shipment",
        message: `${p.name.trim()} — shipment con tracking incompleto`,
        color: "#a78bfa",
      });
    }
  });

  const totalRevenue = productData.reduce((s, p) => s + p.totalSales, 0);
  const totalSpend = productData.reduce((s, p) => s + p.totalSpend, 0);
  const blendedAcos = calcAcos(totalSpend, totalRevenue);
  const totalFBA = productData.reduce((s, p) => s + (p.inventory?.unitsInFBA ?? 0), 0);
  const totalTransit = productData.reduce((s, p) => s + (p.inventory?.unitsInTransit ?? 0), 0);

  const inputStyle = { fontSize: 11, fontFamily: "'DM Mono', monospace", textTransform: "uppercase" as const, letterSpacing: "0.06em", color: "#475569" };

  return (
    <div className="p-4 md:p-10">
      <p style={{ ...inputStyle, color: "#3b82c4", marginBottom: 8 }}>
        Commerce OS · Analytics
      </p>
      <h1 style={{ fontSize:"clamp(1.75rem, 4vw, 2rem)", fontWeight: 300, color: "#e2e8f0", marginBottom: 32 }}>
        Business <span style={{ fontWeight: 600 }}>Overview</span>
      </h1>

      {alerts.length > 0 && (
        <div style={{ marginBottom: 32 }}>
          <p style={{ ...inputStyle, color: "#94a3b8", marginBottom: 12 }}>Alerts ({alerts.length})</p>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {alerts.map((a, i) => (
              <div key={i} style={{ background: `${a.color}10`, border: `1px solid ${a.color}40`, borderRadius: 8, padding: "10px 16px", fontSize: 13, color: a.color }}>
                ⚠ {a.message}
              </div>
            ))}
          </div>
        </div>
      )}

      <div
  style={{
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
    gap: 12,
    marginBottom: 40,
  }}
>
        {[
          { label: "Revenue", value: `$${totalRevenue.toFixed(2)}`, color: "#22c55e" },
          { label: "PPC Spend", value: `$${totalSpend.toFixed(2)}`, color: "#f59e0b" },
          { label: "ACOS Blended", value: blendedAcos !== null ? `${blendedAcos.toFixed(1)}%` : "—", color: blendedAcos !== null && blendedAcos < ACOS_ALERT_THRESHOLD ? "#22c55e" : "#ef4444" },
          { label: "Units FBA", value: totalFBA, color: "#94a3b8" },
          { label: "Units Transit", value: totalTransit, color: "#3b82c4" },
        ].map((m) => (
          <div key={m.label} style={{ background: "rgba(255,255,255,0.03)", borderRadius: 10, padding: "16px 20px", border: "1px solid rgba(255,255,255,0.06)" }}>
            <p style={{ ...inputStyle, marginBottom: 8 }}>{m.label}</p>
            <p style={{ fontSize: 24, fontWeight: 300, color: m.color }}>{m.value}</p>
          </div>
        ))}
      </div>

      <p style={{ ...inputStyle, color: "#94a3b8", marginBottom: 16 }}>Products ({productData.length})</p>
      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        {productData.map((p) => (
          <div key={p.id} style={{ background: "#0a1220", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 12, padding: 16 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
              <div>
                <p style={{ fontSize: 16, fontWeight: 500, color: "#e2e8f0" }}>{p.name.trim()}</p>
                <p style={{ fontSize: 11, fontFamily: "'DM Mono', monospace", color: "#3b82c4" }}>
                  {p.slug} · {p.asin ?? "no ASIN"}
                </p>
              </div>
              <Link href={`/os/products/${p.id}`} style={{ fontSize: 12, color: "#60a5fa", textDecoration: "none" }}>
                View →
              </Link>
            </div>

            <div style={{display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))",gap: 12, }}>
              {[
                { label: "Selling Price", value: p.sellingPriceUsd ? `$${p.sellingPriceUsd.toFixed(2)}` : "not set", color: "#94a3b8" },
                { label: "Cost/Unit", value: `$${p.costPerUnit.toFixed(2)}`, color: "#f59e0b" },
                { label: "Margin", value: p.margin !== null ? `$${p.margin.toFixed(2)} (${p.marginPct?.toFixed(1)}%)` : "—", color: p.margin !== null && p.margin > 0 ? "#22c55e" : "#ef4444" },
                { label: "ACOS", value: p.acos !== null ? `${p.acos.toFixed(1)}%` : "—", color: p.acosHigh ? "#ef4444" : "#22c55e" },
                { label: "FBA Stock", value: p.inventory?.unitsInFBA ?? 0, color: p.stockLow ? "#ef4444" : "#94a3b8" },
                { label: "Active Shipments", value: p.activeShipments, color: "#a78bfa" },
              ].map((m) => (
                <div key={m.label} style={{ background: "rgba(255,255,255,0.03)", borderRadius: 8, padding: "10px 14px", border: "1px solid rgba(255,255,255,0.05)" }}>
                  <p style={{ fontSize: 9, fontFamily: "'DM Mono', monospace", textTransform: "uppercase" as const, color: "#475569", marginBottom: 4 }}>{m.label}</p>
                  <p style={{ fontSize: 13, fontWeight: 400, color: m.color }}>{m.value}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}