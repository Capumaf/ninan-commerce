import { prisma } from "@/lib/prisma";
import Link from "next/link";

export default async function AllSuppliersPage() {
  const suppliers = await prisma.supplier.findMany({
    orderBy: { createdAt: "desc" },
    include: { product: { select: { name: true, slug: true, id: true } } },
  });

  return (
    <div className="p-10">
      <p style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, letterSpacing: "0.06em", textTransform: "uppercase", color: "#3b82c4", marginBottom: 8 }}>
        Commerce OS · Suppliers
      </p>
      <h1 style={{ fontSize: "2rem", fontWeight: 300, letterSpacing: "-0.03em", color: "#e2e8f0", marginBottom: 32 }}>
        All <span style={{ fontWeight: 600 }}>Suppliers</span>
      </h1>

      {suppliers.length === 0 ? (
        <p style={{ color: "#475569", fontSize: 14, textAlign: "center", paddingTop: 80 }}>No suppliers yet.</p>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: 1, background: "rgba(255,255,255,0.04)", borderRadius: 12, overflow: "hidden", border: "1px solid rgba(255,255,255,0.06)" }}>
          {suppliers.map((s) => (
            <Link
              key={s.id}
              href={`/os/products/${s.product.id}/suppliers`}
              style={{ display: "block", padding: "16px 24px", background: "#0a1220", textDecoration: "none" }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div>
                  <p style={{ fontSize: 14, fontWeight: 500, color: "#e2e8f0", marginBottom: 4 }}>{s.supplierName}</p>
                  <p style={{ fontSize: 12, color: "#475569" }}>{s.product.name} · {s.country ?? "—"}</p>
                </div>
                <div style={{ display: "flex", gap: 24, alignItems: "center" }}>
                  {s.unitPrice && <span style={{ fontSize: 13, color: "#93c5e8" }}>${s.unitPrice} {s.currency}</span>}
                  {s.moq && <span style={{ fontSize: 12, color: "#475569" }}>MOQ {s.moq}</span>}
                  <span style={{ fontSize: 11, fontFamily: "'DM Mono', monospace", padding: "3px 10px", borderRadius: 20, background: "rgba(37,99,168,0.1)", border: "1px solid rgba(37,99,168,0.2)", color: "#93c5e8" }}>{s.status}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}