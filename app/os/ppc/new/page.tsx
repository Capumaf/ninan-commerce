"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

const CAMPAIGN_TYPES = [
  { value: "SPONSORED_PRODUCTS", label: "Sponsored Products" },
  { value: "SPONSORED_BRANDS", label: "Sponsored Brands" },
  { value: "SPONSORED_DISPLAY", label: "Sponsored Display" },
];

const TARGETING_TYPES = [
  { value: "MANUAL", label: "Manual" },
  { value: "AUTOMATIC", label: "Automatic" },
];

const STATUS_OPTIONS = [
  { value: "ENABLED", label: "Enabled" },
  { value: "PAUSED", label: "Paused" },
  { value: "ARCHIVED", label: "Archived" },
];

const MATCH_TYPES = [
  { value: "BROAD", label: "Broad" },
  { value: "PHRASE", label: "Phrase" },
  { value: "EXACT", label: "Exact" },
];

export default function NewCampaignPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: "",
    campaignType: "SPONSORED_PRODUCTS",
    targetingType: "MANUAL",
    status: "ENABLED",
    dailyBudget: 10,
    notes: "",
  });
  const [adGroups, setAdGroups] = useState<{ name: string; defaultBid: string; keywords: { text: string; matchType: string; bid: string; searchVolume: string }[] }[]>([]);

  function addAdGroup() {
    setAdGroups([...adGroups, { name: "", defaultBid: "0.75", keywords: [] }]);
  }

  function updateAdGroup(i: number, field: string, value: string) {
    setAdGroups(adGroups.map((ag, idx) => idx === i ? { ...ag, [field]: value } : ag));
  }

  function removeAdGroup(i: number) {
    setAdGroups(adGroups.filter((_, idx) => idx !== i));
  }

  function addKeyword(agIndex: number) {
    setAdGroups(adGroups.map((ag, idx) => idx === agIndex ? { ...ag, keywords: [...ag.keywords, { text: "", matchType: "BROAD", bid: ag.defaultBid, searchVolume: "" }] } : ag));
  }

  function updateKeyword(agIndex: number, kwIndex: number, field: string, value: string) {
    setAdGroups(adGroups.map((ag, idx) => {
      if (idx !== agIndex) return ag;
      const keywords = ag.keywords.map((kw, kidx) => kidx === kwIndex ? { ...kw, [field]: value } : kw);
      return { ...ag, keywords };
    }));
  }

  function removeKeyword(agIndex: number, kwIndex: number) {
    setAdGroups(adGroups.map((ag, idx) => {
      if (idx !== agIndex) return ag;
      return { ...ag, keywords: ag.keywords.filter((_, kidx) => kidx !== kwIndex) };
    }));
  }

  async function handleSave() {
    setLoading(true);
    await fetch("/api/os/ppc", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...form, adGroups }),
    });
    router.push("/os/ppc");
  }

  const inputStyle = { width: "100%", background: "#0a1220", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 8, padding: "10px 16px", fontSize: 14, color: "#fff", outline: "none" };
  const labelStyle = { fontSize: 11, fontFamily: "'DM Mono', monospace", textTransform: "uppercase" as const, letterSpacing: "0.06em", color: "#475569", display: "block" as const, marginBottom: 6 };

  return (
    <div style={{ padding: 40, maxWidth: 800 }}>
      <p style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, letterSpacing: "0.06em", textTransform: "uppercase" as const, color: "#3b82c4", marginBottom: 8 }}>
        PPC · New Campaign
      </p>
      <h1 style={{ fontSize: "2rem", fontWeight: 300, color: "#e2e8f0", marginBottom: 32 }}>
        New <span style={{ fontWeight: 600 }}>Campaign</span>
      </h1>

      <div style={{ display: "flex", flexDirection: "column", gap: 16, marginBottom: 32 }}>
        <div>
          <label style={labelStyle}>Campaign Name</label>
          <input
            type="text"
            placeholder="DV180 - Auto - US"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            style={inputStyle}
          />
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 16 }}>
          <div>
            <label style={labelStyle}>Campaign Type</label>
            <select value={form.campaignType} onChange={(e) => setForm({ ...form, campaignType: e.target.value })} style={{ ...inputStyle, cursor: "pointer" }}>
              {CAMPAIGN_TYPES.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
            </select>
          </div>
          <div>
            <label style={labelStyle}>Targeting</label>
            <select value={form.targetingType} onChange={(e) => setForm({ ...form, targetingType: e.target.value })} style={{ ...inputStyle, cursor: "pointer" }}>
              {TARGETING_TYPES.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
            </select>
          </div>
          <div>
            <label style={labelStyle}>Status</label>
            <select value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })} style={{ ...inputStyle, cursor: "pointer" }}>
              {STATUS_OPTIONS.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
            </select>
          </div>
        </div>

        <div>
          <label style={labelStyle}>Daily Budget (USD)</label>
          <input
            type="number"
            step="0.01"
            value={form.dailyBudget}
            onChange={(e) => setForm({ ...form, dailyBudget: parseFloat(e.target.value) || 0 })}
            style={inputStyle}
          />
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
            Ad Groups ({adGroups.length})
          </p>
          <button onClick={addAdGroup} style={{ fontSize: 12, color: "#60a5fa", background: "none", border: "1px solid rgba(96,165,250,0.3)", padding: "4px 12px", borderRadius: 6, cursor: "pointer" }}>
            + Add Ad Group
          </button>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          {adGroups.map((ag, agIndex) => (
            <div key={agIndex} style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 10, padding: 16 }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 120px 32px", gap: 8, marginBottom: 12 }}>
                <input type="text" placeholder="Ad Group name" value={ag.name} onChange={(e) => updateAdGroup(agIndex, "name", e.target.value)} style={{ ...inputStyle, fontSize: 13 }} />
                <input type="number" step="0.01" placeholder="Default bid" value={ag.defaultBid} onChange={(e) => updateAdGroup(agIndex, "defaultBid", e.target.value)} style={{ ...inputStyle, fontSize: 13 }} />
                <button onClick={() => removeAdGroup(agIndex)} style={{ background: "none", border: "none", color: "#ef4444", cursor: "pointer", fontSize: 16 }}>×</button>
              </div>

              <div style={{ paddingLeft: 16, borderLeft: "2px solid rgba(255,255,255,0.06)" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
                  <p style={{ fontSize: 10, fontFamily: "'DM Mono', monospace", textTransform: "uppercase" as const, color: "#475569" }}>Keywords ({ag.keywords.length})</p>
                  <button onClick={() => addKeyword(agIndex)} style={{ fontSize: 11, color: "#60a5fa", background: "none", border: "none", cursor: "pointer" }}>
                    + Add Keyword
                  </button>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                  {ag.keywords.map((kw, kwIndex) => (
                    <div key={kwIndex} style={{ display: "grid", gridTemplateColumns: "1fr 100px 90px 90px 32px", gap: 6 }}>
                      <input type="text" placeholder="dryer vent connector" value={kw.text} onChange={(e) => updateKeyword(agIndex, kwIndex, "text", e.target.value)} style={{ ...inputStyle, fontSize: 12, padding: "8px 12px" }} />
                      <select value={kw.matchType} onChange={(e) => updateKeyword(agIndex, kwIndex, "matchType", e.target.value)} style={{ ...inputStyle, fontSize: 12, padding: "8px 12px", cursor: "pointer" }}>
                        {MATCH_TYPES.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
                      </select>
                      <input type="number" step="0.01" placeholder="Bid" value={kw.bid} onChange={(e) => updateKeyword(agIndex, kwIndex, "bid", e.target.value)} style={{ ...inputStyle, fontSize: 12, padding: "8px 12px" }} />
                      <input type="number" placeholder="Vol (H10)" value={kw.searchVolume} onChange={(e) => updateKeyword(agIndex, kwIndex, "searchVolume", e.target.value)} style={{ ...inputStyle, fontSize: 12, padding: "8px 12px" }} />
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
        onClick={handleSave}
        disabled={loading}
        style={{ background: "linear-gradient(135deg, #1a3356, #2563a8)", color: "#fff", padding: "12px 24px", borderRadius: 10, fontSize: 14, fontWeight: 500, border: "none", cursor: "pointer" }}
      >
        {loading ? "Saving..." : "Save Campaign"}
      </button>
    </div>
  );
}