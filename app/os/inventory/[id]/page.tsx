"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import BackButton from "@/components/BackButton";

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

  const [warehouses, setWarehouses] = useState<
  { id: string; warehouseCode: string; units: number }[]
>([]);
  const [showWarehouses, setShowWarehouses] = useState(false);
  const [newCode, setNewCode] = useState("");
  const [newUnits, setNewUnits] = useState(0);

  useEffect(() => {
    if (!productId) return;

    fetch(`/api/os/inventory/${productId}`)
      .then((r) => r.json())
      .then((data) => {
        if (data) {
          setForm({
            unitsInFBA: data.unitsInFBA ?? 0,
            unitsInTransit: data.unitsInTransit ?? 0,
            unitsSold: data.unitsSold ?? 0,
            unitsReserved: data.unitsReserved ?? 0,
            reorderPoint: data.reorderPoint ?? 50,
            notes: data.notes ?? "",
          });
        }
      });
  }, [productId]);

  function loadWarehouses() {
    fetch(`/api/os/inventory/${productId}/warehouses`)
      .then((r) => r.json())
      .then(setWarehouses);
  }

  useEffect(() => {
    if (showWarehouses) loadWarehouses();
  }, [showWarehouses]);

  async function handleAddWarehouse() {
    if (!newCode) return;
    await fetch(`/api/os/inventory/${productId}/warehouses`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ warehouseCode: newCode, units: newUnits }),
    });
    setNewCode("");
    setNewUnits(0);
    loadWarehouses();
  }

  async function handleDeleteWarehouse(warehouseId: string) {
    await fetch(`/api/os/inventory/warehouses/${warehouseId}`, {
      method: "DELETE",
    });
    loadWarehouses();
  }

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
    <div className="p-4 md:p-10 w-full max-w-2xl">
      <BackButton />

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
        Inventory · Update
      </p>

      <h1
        style={{
          fontSize: "clamp(1.75rem, 4vw, 2rem)",
          fontWeight: 300,
          color: "#e2e8f0",
          marginBottom: 32,
        }}
      >
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
            <label
              style={{
                fontSize: 11,
                fontFamily: "'DM Mono', monospace",
                textTransform: "uppercase" as const,
                letterSpacing: "0.06em",
                color: "#475569",
                display: "block",
                marginBottom: 6,
              }}
            >
              {f.label}
            </label>

            <input
              type="number"
              value={form[f.key as keyof typeof form] as number}
              onChange={(e) =>
                setForm({
                  ...form,
                  [f.key]: parseInt(e.target.value) || 0,
                })
              }
              style={{
                width: "100%",
                background: "#0a1220",
                border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: 8,
                padding: "10px 16px",
                fontSize: 14,
                color: "#fff",
                outline: "none",
              }}
            />
          </div>
        ))}

        <div>
          <label
            style={{
              fontSize: 11,
              fontFamily: "'DM Mono', monospace",
              textTransform: "uppercase" as const,
              letterSpacing: "0.06em",
              color: "#475569",
              display: "block",
              marginBottom: 6,
            }}
          >
            Notes
          </label>

          <textarea
            value={form.notes}
            onChange={(e) => setForm({ ...form, notes: e.target.value })}
            rows={3}
            style={{
              width: "100%",
              background: "#0a1220",
              border: "1px solid rgba(255,255,255,0.1)",
              borderRadius: 8,
              padding: "10px 16px",
              fontSize: 14,
              color: "#fff",
              outline: "none",
              resize: "none",
            }}
          />
        </div>

        <div
          style={{
            border: "1px solid rgba(255,255,255,0.1)",
            borderRadius: 10,
            padding: 16,
          }}
        >
          <button
            onClick={() => setShowWarehouses(!showWarehouses)}
            style={{
              background: "none",
              border: "none",
              color: "#60a5fa",
              fontSize: 13,
              cursor: "pointer",
              padding: 0,
              display: "flex",
              alignItems: "center",
              gap: 6,
            }}
          >
            {showWarehouses ? "▼" : "▶"} Warehouse Breakdown
          </button>

          {showWarehouses && (
            <div
              style={{
                marginTop: 16,
                display: "flex",
                flexDirection: "column",
                gap: 12,
              }}
            >
              {warehouses.map((w) => (
                <div
                  key={w.id}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    background: "#0a1220",
                    padding: "10px 14px",
                    borderRadius: 8,
                  }}
                >
                  <span
                    style={{
                      fontSize: 13,
                      color: "#e2e8f0",
                      fontFamily: "'DM Mono', monospace",
                    }}
                  >
                    {w.warehouseCode}
                  </span>
                  <div
                    style={{ display: "flex", alignItems: "center", gap: 12 }}
                  >
                    <span style={{ fontSize: 14, color: "#22c55e" }}>
                      {w.units} units
                    </span>
                    <button
                      onClick={() => handleDeleteWarehouse(w.id)}
                      style={{
                        background: "none",
                        border: "none",
                        color: "#fca5a5",
                        fontSize: 12,
                        cursor: "pointer",
                      }}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}

              <div style={{ display: "flex", gap: 8 }}>
                <input
                  type="text"
                  placeholder="Warehouse code (ej. ONT8)"
                  value={newCode}
                  onChange={(e) => setNewCode(e.target.value)}
                  style={{
                    flex: 1,
                    background: "#0a1220",
                    border: "1px solid rgba(255,255,255,0.1)",
                    borderRadius: 8,
                    padding: "8px 12px",
                    fontSize: 13,
                    color: "#fff",
                  }}
                />
                <input
                  type="number"
                  placeholder="Units"
                  value={newUnits}
                  onChange={(e) =>
                    setNewUnits(parseInt(e.target.value) || 0)
                  }
                  style={{
                    width: 100,
                    background: "#0a1220",
                    border: "1px solid rgba(255,255,255,0.1)",
                    borderRadius: 8,
                    padding: "8px 12px",
                    fontSize: 13,
                    color: "#fff",
                  }}
                />
                <button
                  onClick={handleAddWarehouse}
                  style={{
                    background: "linear-gradient(135deg, #1a3356, #2563a8)",
                    color: "#fff",
                    border: "none",
                    borderRadius: 8,
                    padding: "8px 16px",
                    fontSize: 13,
                    cursor: "pointer",
                  }}
                >
                  + Add
                </button>
              </div>
            </div>
          )}
        </div>

        <button
          onClick={handleSave}
          disabled={loading}
          style={{
            width: "100%",
            background: "linear-gradient(135deg, #1a3356, #2563a8)",
            color: "#fff",
            padding: "12px 24px",
            borderRadius: 10,
            fontSize: 14,
            fontWeight: 500,
            border: "none",
            cursor: "pointer",
          }}
        >
          {loading ? "Saving..." : "Save Inventory"}
        </button>
      </div>
    </div>
  );
}