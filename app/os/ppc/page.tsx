import { prisma } from "@/lib/prisma";
import Link from "next/link";

const STATUS_COLOR: Record<string, string> = {
  ENABLED: "#22c55e",
  PAUSED: "#f59e0b",
  ARCHIVED: "#475569",
};

function calcAcos(spend: number, sales: number) {
  if (sales === 0) return null;
  return (spend / sales) * 100;
}

export default async function PPCPage() {
  const campaigns = await prisma.campaign.findMany({
    include: {
      product: true,
      metrics: true,
      adGroups: { include: { keywords: true } },
    },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="p-10">
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 32 }}>
        <div>
          <p style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, letterSpacing: "0.06em", textTransform: "uppercase" as const, color: "#3b82c4", marginBottom: 8 }}>
            Commerce OS · PPC
          </p>
          <h1 style={{ fontSize: "2rem", fontWeight: 300, letterSpacing: "-0.03em", color: "#e2e8f0" }}>
            Campaign <span style={{ fontWeight: 600 }}>Manager</span>
          </h1>
        </div>
        <Link
          href="/os/ppc/new"
          style={{ background: "linear-gradient(135deg, #1a3356, #2563a8)", color: "#fff", padding: "10px 20px", borderRadius: 10, fontSize: 13, fontWeight: 500, textDecoration: "none" }}
        >
          + New Campaign
        </Link>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 1, background: "rgba(255,255,255,0.04)", borderRadius: 12, overflow: "hidden", border: "1px solid rgba(255,255,255,0.06)" }}>
        {campaigns.length === 0 && (
          <div style={{ background: "#0a1220", padding: "40px 24px", textAlign: "center" }}>
            <p style={{ color: "#475569", fontSize: 14 }}>No campaigns yet. Create your first one.</p>
          </div>
        )}
        {campaigns.map((c) => {
          const totalSpend = c.metrics.reduce((sum, m) => sum + m.spend, 0);
          const totalSales = c.metrics.reduce((sum, m) => sum + m.sales, 0);
          const totalClicks = c.metrics.reduce((sum, m) => sum + m.clicks, 0);
          const totalImpressions = c.metrics.reduce((sum, m) => sum + m.impressions, 0);
          const acos = calcAcos(totalSpend, totalSales);
          const keywordCount = c.adGroups.reduce((sum, ag) => sum + ag.keywords.length, 0);

          return (
            <div key={c.id} style={{ background: "#0a1220", padding: "20px 24px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
                <div>
                  <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 4 }}>
                    <p style={{ fontSize: 14, fontWeight: 500, color: "#e2e8f0" }}>{c.name}</p>
                    <span style={{ fontSize: 10, fontFamily: "'DM Mono', monospace", textTransform: "uppercase" as const, letterSpacing: "0.06em", color: STATUS_COLOR[c.status], background: `${STATUS_COLOR[c.status]}18`, padding: "2px 8px", borderRadius: 4, border: `1px solid ${STATUS_COLOR[c.status]}40` }}>
                      {c.status}
                    </span>
                  </div>
                  <p style={{ fontSize: 11, fontFamily: "'DM Mono', monospace", color: "#3b82c4" }}>
                    {c.campaignType.replace(/_/g, " ")} · {c.targetingType} · {c.product.name} · ${c.dailyBudget}/day
                  </p>
                </div>
                <Link href={`/os/ppc/${c.id}`} style={{ fontSize: 12, color: "#60a5fa", textDecoration: "none" }}>
                  View →
                </Link>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(6, 1fr)", gap: 12 }}>
                {[
                  { label: "Spend", value: `$${totalSpend.toFixed(2)}`, color: "#f59e0b" },
                  { label: "Sales", value: `$${totalSales.toFixed(2)}`, color: "#22c55e" },
                  { label: "ACOS", value: acos !== null ? `${acos.toFixed(1)}%` : "—", color: acos !== null && acos < 30 ? "#22c55e" : "#ef4444" },
                  { label: "Clicks", value: totalClicks, color: "#94a3b8" },
                  { label: "Impressions", value: totalImpressions, color: "#94a3b8" },
                  { label: "Keywords", value: keywordCount, color: "#a78bfa" },
                ].map((m) => (
                  <div key={m.label} style={{ background: "rgba(255,255,255,0.03)", borderRadius: 8, padding: "10px 14px", border: "1px solid rgba(255,255,255,0.05)" }}>
                    <p style={{ fontSize: 9, fontFamily: "'DM Mono', monospace", textTransform: "uppercase" as const, letterSpacing: "0.06em", color: "#475569", marginBottom: 4 }}>{m.label}</p>
                    <p style={{ fontSize: 18, fontWeight: 300, color: m.color }}>{m.value}</p>
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