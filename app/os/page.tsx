import { prisma } from "@/lib/prisma";
import Link from "next/link";

export default async function OSPage() {
  const products = await prisma.product.findMany({
    include: { inventory: true, expenses: true },
  });

  const expenses = await prisma.expense.findMany();

  const totalInvested = expenses.reduce((sum, e) => sum + e.amountUsd, 0);
  const totalRevenue = products.reduce(
    (sum, p) =>
      sum + (p.sellingPriceUsd ?? 0) * (p.inventory?.unitsSold ?? 0),
    0
  );
  const overallRoi =
    totalInvested > 0
      ? ((totalRevenue - totalInvested) / totalInvested) * 100
      : 0;

  const totalUnitsInFBA = products.reduce(
    (sum, p) => sum + (p.inventory?.unitsInFBA ?? 0),
    0
  );
  const totalUnitsInTransit = products.reduce(
    (sum, p) => sum + (p.inventory?.unitsInTransit ?? 0),
    0
  );
  const totalUnitsSold = products.reduce(
    (sum, p) => sum + (p.inventory?.unitsSold ?? 0),
    0
  );

  const alerts = products
    .filter(
      (p) =>
        (p.inventory?.unitsInFBA ?? 0) <= (p.inventory?.reorderPoint ?? 50)
    )
    .map((p) => ({
      id: p.id,
      name: p.name,
      unitsInFBA: p.inventory?.unitsInFBA ?? 0,
      unitsInTransit: p.inventory?.unitsInTransit ?? 0,
      critical: (p.inventory?.unitsInTransit ?? 0) === 0,
    }));

  return (
    <div className="p-4 md:p-10">
      <p className="text-xs uppercase tracking-widest text-blue-400 font-mono mb-2">
        Commerce OS
      </p>
      <h1 className="text-2xl md:text-3xl font-light text-white tracking-tight mb-1">
        Operational <span className="font-semibold">Dashboard</span>
      </h1>
      <p className="text-slate-500 text-sm mb-8">
        {products.length} product{products.length !== 1 ? "s" : ""} in system
      </p>

      {alerts.length > 0 && (
        <div className="mb-8 flex flex-col gap-2">
          {alerts.map((a) => (
            <Link
              key={a.id}
              href={`/os/inventory/${a.id}`}
              className="flex items-center justify-between px-4 py-3 rounded-xl text-sm"
              style={{
                background: a.critical
                  ? "rgba(239,68,68,0.08)"
                  : "rgba(251,191,36,0.08)",
                border: a.critical
                  ? "1px solid rgba(239,68,68,0.2)"
                  : "1px solid rgba(251,191,36,0.2)",
                color: a.critical ? "#fca5a5" : "#fbbf24",
              }}
            >
              <span>
                ⚠ {a.name} — {a.unitsInFBA} units in FBA
              </span>
              <span className="text-xs font-mono uppercase">
                {a.critical ? "Reorder Now" : "Low Stock"}
              </span>
            </Link>
          ))}
        </div>
      )}

      <p className="text-xs font-mono uppercase tracking-widest text-slate-500 mb-3">
        Finance
      </p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-white/5 rounded-xl overflow-hidden border border-white/5 mb-8">
        <div className="bg-[#0a1220] p-6">
          <p className="text-xs font-mono uppercase tracking-widest text-slate-500 mb-2">
            Total Invested
          </p>
          <p className="text-3xl font-light text-white">
            ${totalInvested.toFixed(2)}
          </p>
        </div>
        <div className="bg-[#0a1220] p-6">
          <p className="text-xs font-mono uppercase tracking-widest text-slate-500 mb-2">
            Total Revenue
          </p>
          <p className="text-3xl font-light text-white">
            ${totalRevenue.toFixed(2)}
          </p>
        </div>
        <div className="bg-[#0a1220] p-6">
          <p className="text-xs font-mono uppercase tracking-widest text-slate-500 mb-2">
            Overall ROI
          </p>
          <p
            className="text-3xl font-light"
            style={{ color: overallRoi >= 0 ? "#86efac" : "#fca5a5" }}
          >
            {overallRoi.toFixed(1)}%
          </p>
        </div>
      </div>

      <p className="text-xs font-mono uppercase tracking-widest text-slate-500 mb-3">
        Inventory
      </p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-white/5 rounded-xl overflow-hidden border border-white/5 mb-8">
        <div className="bg-[#0a1220] p-6">
          <p className="text-xs font-mono uppercase tracking-widest text-slate-500 mb-2">
            Units in FBA
          </p>
          <p className="text-3xl font-light text-green-400">
            {totalUnitsInFBA}
          </p>
        </div>
        <div className="bg-[#0a1220] p-6">
          <p className="text-xs font-mono uppercase tracking-widest text-slate-500 mb-2">
            Units in Transit
          </p>
          <p className="text-3xl font-light text-amber-400">
            {totalUnitsInTransit}
          </p>
        </div>
        <div className="bg-[#0a1220] p-6">
          <p className="text-xs font-mono uppercase tracking-widest text-slate-500 mb-2">
            Units Sold
          </p>
          <p className="text-3xl font-light text-blue-400">
            {totalUnitsSold}
          </p>
        </div>
      </div>

      <p className="text-xs font-mono uppercase tracking-widest text-slate-500 mb-3">
        Products
      </p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-white/5 rounded-xl overflow-hidden border border-white/5">
        {[
          {
            label: "Active SKUs",
            value: products.filter((p) => p.status === "ACTIVE").length,
          },
          { label: "Total Products", value: products.length },
          {
            label: "In Research",
            value: products.filter((p) => p.status === "RESEARCHING").length,
          },
        ].map((m) => (
          <div key={m.label} className="bg-[#0a1220] p-6">
            <p className="text-xs font-mono uppercase tracking-widest text-slate-500 mb-2">
              {m.label}
            </p>
            <p className="text-4xl font-light text-white">{m.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}