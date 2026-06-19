"use client";
import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";

const STATUS_OPTIONS = ["ENABLED", "PAUSED", "ARCHIVED"];
const MATCH_TYPES = ["BROAD", "PHRASE", "EXACT"];

const STATUS_COLOR: Record<string, string> = {
  ENABLED: "#22c55e",
  PAUSED: "#f59e0b",
  ARCHIVED: "#475569",
};

function calcAcos(spend: number, sales: number) {
  if (sales === 0) return null;
  return (spend / sales) * 100;
}

export default function CampaignDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;

  const [campaign, setCampaign] = useState<any>(null);
  const [status, setStatus] = useState("");
  const [dailyBudget, setDailyBudget] = useState(0);
  const [adGroups, setAdGroups] = useState<any[]>([]);
  const [metricForm, setMetricForm] = useState({ date: new Date().toISOString().slice(0, 10), impressions: 0, clicks: 0, spend: 0, sales: 0, orders: 0 });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetch(`/api/os/ppc/${id}`)
      .then((r) => r.json())
      .then((data) => {
        setCampaign(data);
        setStatus(data.status);
        setDailyBudget(data.dailyBudget);
        setAdGroups(data.adGroups || []);
      });
  }, [id]);

  function updateKeyword(agIndex: number, kwIndex: number, field: string, value: string) {
    setAdGroups(adGroups.map((ag, idx) => {
      if (idx !== agIndex) return ag;
      const keywords = ag.keywords.map((kw: any, kidx: number) => kidx === kwIndex ? { ...kw, [field]: value } : kw);
      return { ...ag, keywords };
    }));
  }

  function addKeyword(agIndex: number) {
    setAdGroups(adGroups.map((ag, idx) => idx === agIndex ? { ...ag, keywords: [...ag.keywords, { text: "", matchType: "BROAD", bid: ag.defaultBid, searchVolume: "", status: "ENABLED" }] } : ag));
  }

  function removeKeyword(agIndex: number, kwIndex: number) {
    setAdGroups(adGroups.map((ag, idx) => {
      if (idx !== agIndex) return ag;
      return { ...ag, keywords: ag.keywords.filter((_: any, kidx: number) => kidx !== kwIndex) };
    }));
  }

  async function handleSaveCampaign() {
    setLoading(true);
    await fetch(`/api/os/ppc/${id}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status, dailyBudget, adGroups }),
    });
    setLoading(false);
    router.refresh();
  }

  async function handleAddMetric() {
    setLoading(true);
    await fetch(`/api/os/ppc/${id}/metrics`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(metricForm),
    });
    const res = await fetch(`/api/os/ppc/${id}`);
    const data = await res.json();
    setCampaign(data);
    setLoading(false);
  }


  async function handleDeleteMetric(metricId: string) {
    await fetch(`/api/os/ppc/${id}/metrics/${metricId}`, { method: "DELETE" });
    const res = await fetch(`/api/os/ppc/${id}`);
    const data = await res.json();
    setCampaign(data);
  }



  if (!campaign) return <div style={{ padding: 40, color: "#475569" }}>Loading...</div>;

  const inputStyle = { width: "100%", background: "#0a1220", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 8, padding: "10px 16px", fontSize: 14, color: "#fff", outline: "none" };
  const labelStyle = { fontSize: 11, fontFamily: "'DM Mono', monospace", textTransform: "uppercase" as const, letterSpacing: "0.06em", color: "#475569", display: "block" as const, marginBottom: 6 };

  const totalSpend = campaign.metrics?.reduce((s: number, m: any) => s + m.spend, 0) || 0;
  const totalSales = campaign.metrics?.reduce((s: number, m: any) => s + m.sales, 0) || 0;
  const totalClicks = campaign.metrics?.reduce((s: number, m: any) => s + m.clicks, 0) || 0;
  const totalImpressions = campaign.metrics?.reduce((s: number, m: any) => s + m.impressions, 0) || 0;
  const acos = calcAcos(totalSpend, totalSales);

  return (
    <div style={{ padding: 40, maxWidth: 900 }}>
      <p style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, letterSpacing: "0.06em", textTransform: "uppercase" as const, color: "#3b82c4", marginBottom: 8 }}>
        PPC · {campaign.name}
      </p>
      <h1 style={{ fontSize: "2rem", fontWeight: 300, color: "#e2e8f0", marginBottom: 24 }}>
        {campaign.name}
      </h1>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 12, marginBottom: 32 }}>
        {[
          { label: "Spend", value: `$${totalSpend.toFixed(2)}`, color: "#f59e0b" },
          { label: "Sales", value: `$${totalSales.toFixed(2)}`, color: "#22c55e" },
          { label: "ACOS", value: acos !== null ? `${acos.toFixed(1)}%` : "—", color: acos !== null && acos < 30 ? "#22c55e" : "#ef4444" },
          { label: "Clicks", value: totalClicks, color: "#94a3b8" },
          { label: "Impressions", value: totalImpressions, color: "#94a3b8" },
        ].map((m) => (
          <div key={m.label} style={{ background: "rgba(255,255,255,0.03)", borderRadius: 8, padding: "12px 16px", border: "1px solid rgba(255,255,255,0.05)" }}>
            <p style={{ fontSize: 10, fontFamily: "'DM Mono', monospace", textTransform: "uppercase" as const, color: "#475569", marginBottom: 4 }}>{m.label}</p>
            <p style={{ fontSize: 20, fontWeight: 300, color: m.color }}>{m.value}</p>
          </div>
        ))}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 32 }}>
        <div>
          <label style={labelStyle}>Status</label>
          <select value={status} onChange={(e) => setStatus(e.target.value)} style={{ ...inputStyle, cursor: "pointer", color: STATUS_COLOR[status] }}>
            {STATUS_OPTIONS.map((o) => <option key={o} value={o}>{o}</option>)}
          </select>
        </div>
        <div>
          <label style={labelStyle}>Daily Budget</label>
          <input type="number" step="0.01" value={dailyBudget} onChange={(e) => setDailyBudget(parseFloat(e.target.value) || 0)} style={inputStyle} />
        </div>
      </div>

      <div style={{ marginBottom: 24 }}>
        <p style={{ fontSize: 12, fontFamily: "'DM Mono', monospace", textTransform: "uppercase" as const, letterSpacing: "0.06em", color: "#94a3b8", marginBottom: 16 }}>
          Ad Groups & Keywords
        </p>
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          {adGroups.map((ag, agIndex) => (
            <div key={ag.id || agIndex} style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 10, padding: 16 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
                <p style={{ fontSize: 14, fontWeight: 500, color: "#e2e8f0" }}>{ag.name}</p>
                <p style={{ fontSize: 11, fontFamily: "'DM Mono', monospace", color: "#475569" }}>Bid: ${ag.defaultBid}</p>
              </div>
              <div style={{ paddingLeft: 16, borderLeft: "2px solid rgba(255,255,255,0.06)" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
                  <p style={{ fontSize: 10, fontFamily: "'DM Mono', monospace", textTransform: "uppercase" as const, color: "#475569" }}>Keywords ({ag.keywords?.length || 0})</p>
                  <button onClick={() => addKeyword(agIndex)} style={{ fontSize: 11, color: "#60a5fa", background: "none", border: "none", cursor: "pointer" }}>
                    + Add Keyword
                  </button>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                  {ag.keywords?.map((kw: any, kwIndex: number) => (
                    <div key={kw.id || kwIndex} style={{ display: "grid", gridTemplateColumns: "1fr 100px 90px 90px 32px", gap: 6 }}>
                      <input type="text" placeholder="keyword" value={kw.text} onChange={(e) => updateKeyword(agIndex, kwIndex, "text", e.target.value)} style={{ ...inputStyle, fontSize: 12, padding: "8px 12px" }} />
                      <select value={kw.matchType} onChange={(e) => updateKeyword(agIndex, kwIndex, "matchType", e.target.value)} style={{ ...inputStyle, fontSize: 12, padding: "8px 12px", cursor: "pointer" }}>
                        {MATCH_TYPES.map((o) => <option key={o} value={o}>{o}</option>)}
                      </select>
                      <input type="number" step="0.01" placeholder="Bid" value={kw.bid} onChange={(e) => updateKeyword(agIndex, kwIndex, "bid", e.target.value)} style={{ ...inputStyle, fontSize: 12, padding: "8px 12px" }} />
                      <input type="number" placeholder="Vol" value={kw.searchVolume || ""} onChange={(e) => updateKeyword(agIndex, kwIndex, "searchVolume", e.target.value)} style={{ ...inputStyle, fontSize: 12, padding: "8px 12px" }} />
                      <button onClick={() => removeKeyword(agIndex, kwIndex)} style={{ background: "none", border: "none", color: "#ef4444", cursor: "pointer", fontSize: 14 }}>×</button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <button
        onClick={handleSaveCampaign}
        disabled={loading}
        style={{ background: "linear-gradient(135deg, #1a3356, #2563a8)", color: "#fff", padding: "12px 24px", borderRadius: 10, fontSize: 14, fontWeight: 500, border: "none", cursor: "pointer", marginBottom: 40 }}
      >
        {loading ? "Saving..." : "Save Campaign"}
      </button>

      <div style={{ borderTop: "1px solid rgba(255,255,255,0.06)", paddingTop: 32 }}>
        <p style={{ fontSize: 12, fontFamily: "'DM Mono', monospace", textTransform: "uppercase" as const, letterSpacing: "0.06em", color: "#94a3b8", marginBottom: 16 }}>
          Add Daily Metrics
        </p>
        <div style={{ display: "grid", gridTemplateColumns: "130px repeat(5, 1fr) 100px", gap: 8, alignItems: "end", marginBottom: 24 }}>
          <div>
            <label style={labelStyle}>Date</label>
            <input type="date" value={metricForm.date} onChange={(e) => setMetricForm({ ...metricForm, date: e.target.value })} style={{ ...inputStyle, fontSize: 12 }} />
          </div>
          <div>
            <label style={labelStyle}>Impressions</label>
            <input type="number" value={metricForm.impressions} onChange={(e) => setMetricForm({ ...metricForm, impressions: parseInt(e.target.value) || 0 })} style={{ ...inputStyle, fontSize: 12 }} />
          </div>
          <div>
            <label style={labelStyle}>Clicks</label>
            <input type="number" value={metricForm.clicks} onChange={(e) => setMetricForm({ ...metricForm, clicks: parseInt(e.target.value) || 0 })} style={{ ...inputStyle, fontSize: 12 }} />
          </div>
          <div>
            <label style={labelStyle}>Spend ($)</label>
            <input type="number" step="0.01" value={metricForm.spend} onChange={(e) => setMetricForm({ ...metricForm, spend: parseFloat(e.target.value) || 0 })} style={{ ...inputStyle, fontSize: 12 }} />
          </div>
          <div>
            <label style={labelStyle}>Sales ($)</label>
            <input type="number" step="0.01" value={metricForm.sales} onChange={(e) => setMetricForm({ ...metricForm, sales: parseFloat(e.target.value) || 0 })} style={{ ...inputStyle, fontSize: 12 }} />
          </div>
          <div>
            <label style={labelStyle}>Orders</label>
            <input type="number" value={metricForm.orders} onChange={(e) => setMetricForm({ ...metricForm, orders: parseInt(e.target.value) || 0 })} style={{ ...inputStyle, fontSize: 12 }} />
          </div>
          <button onClick={handleAddMetric} disabled={loading} style={{ background: "linear-gradient(135deg, #1a3356, #2563a8)", color: "#fff", padding: "10px", borderRadius: 8, fontSize: 12, fontWeight: 500, border: "none", cursor: "pointer" }}>
            + Add
          </button>
        </div>

        {campaign.metrics?.length > 0 && (
          <div>
            <p style={{ fontSize: 10, fontFamily: "'DM Mono', monospace", textTransform: "uppercase" as const, color: "#475569", marginBottom: 8 }}>History</p>
            <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
              {campaign.metrics
                .slice()
                .sort((a: any, b: any) => new Date(b.date).getTime() - new Date(a.date).getTime())
                .map((m: any) => {
                  const mAcos = calcAcos(m.spend, m.sales);
                  return (
                       <div key={m.id} style={{ display: "grid", gridTemplateColumns: "100px 1fr 1fr 1fr 1fr 1fr 24px", gap: 8, padding: "8px 12px", background: "rgba(255,255,255,0.02)", borderRadius: 6, fontSize: 12, color: "#94a3b8", alignItems: "center" }}>
                      <span>{new Date(m.date).toLocaleDateString()}</span>
                      <span>{m.impressions} impr</span>
                      <span>{m.clicks} clicks</span>
                      <span style={{ color: "#f59e0b" }}>${m.spend.toFixed(2)}</span>
                      <span style={{ color: "#22c55e" }}>${m.sales.toFixed(2)}</span>
                      <span style={{ color: mAcos !== null && mAcos < 30 ? "#22c55e" : "#ef4444" }}>{mAcos !== null ? `${mAcos.toFixed(1)}% ACOS` : "—"}</span>
                       <button onClick={() => handleDeleteMetric(m.id)} style={{ background: "none", border: "none", color: "#ef4444", cursor: "pointer", fontSize: 14 }}>×</button>
                    </div>
                  );
                })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}