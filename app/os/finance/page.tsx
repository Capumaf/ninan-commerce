import { prisma } from "@/lib/prisma";
import Link from "next/link";
import ExpenseRow from "./ExpenseRow";
import ExpenseChart from "./ExpenseChart";

export default async function FinancePage() {
  const products = await prisma.product.findMany({
  include: { inventory: true, expenses: true, amazonCosts: true },
  orderBy: { createdAt: "desc" },
});

  const expenses = await prisma.expense.findMany({
    include: { product: true },
    orderBy: { date: "desc" },
  });

  const totalInvested = expenses.reduce((sum, e) => sum + e.amountUsd, 0);
  const totalRevenue = products.reduce(
    (sum, p) =>
      sum + (p.sellingPriceUsd ?? 0) * (p.inventory?.unitsSold ?? 0),
    0
  );
  const overallProfit = totalRevenue - totalInvested;
  const overallRoi =
    totalInvested > 0 ? (overallProfit / totalInvested) * 100 : 0;

  const expensesByCategory = expenses.reduce((acc, e) => {
    const existing = acc.find((item) => item.category === e.category);
    if (existing) {
      existing.amount += e.amountUsd;
    } else {
      acc.push({ category: e.category, amount: e.amountUsd });
    }
    return acc;
  }, [] as { category: string; amount: number }[]);

  const csvRows = [
    ["Date", "Description", "Category", "Product", "Amount USD"],
    ...expenses.map((e) => [
      new Date(e.date).toLocaleDateString(),
      e.description,
      e.category,
      e.product?.name ?? "General",
      e.amountUsd.toFixed(2),
    ]),
  ];
  const csvContent = csvRows.map((row) => row.join(",")).join("\n");
  const csvDataUrl = `data:text/csv;charset=utf-8,${encodeURIComponent(
    csvContent
  )}`;

 


  return (
    <div className="p-4 md:p-10">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-8">
        <div>
          <p className="text-xs uppercase tracking-widest text-blue-400 font-mono mb-2">
            Commerce OS · Finance
          </p>
          <h1 className="text-2xl md:text-3xl font-light text-white tracking-tight">
            Investment <span className="font-semibold">& ROI</span>
          </h1>
        </div>

        <div className="flex flex-col gap-2 md:flex-row">
              <a
          
            href={csvDataUrl}
            download="ninan-commerce-expenses.csv"
             className="w-full md:w-auto text-center px-5 py-2.5 rounded-xl text-sm font-medium border transition-colors"
             style={{
             color: "#e2e8f0",
             border: "1px solid rgba(255,255,255,0.08)",
             background: "rgba(255,255,255,0.03)",
             }}
          >
            Export CSV
          </a>
          <Link
            href="/os/finance/new"
            className="w-full md:w-auto text-center px-5 py-2.5 rounded-xl text-sm font-medium text-white"
              style={{
             color: "#60a5fa",
             border: "1px solid rgba(96,165,250,0.15)",
             background: "rgba(96,165,250,0.05)",
            }} 
          >
            + New Expense
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-white/5 rounded-xl overflow-hidden border border-white/5 mb-8">
        <div className="bg-[#0a1220] px-6 py-5">
          <p className="text-xs text-slate-500 font-mono mb-1">Total Invested</p>
          <p className="text-2xl font-light text-white">
            ${totalInvested.toFixed(2)}
          </p>
        </div>
        <div className="bg-[#0a1220] px-6 py-5">
          <p className="text-xs text-slate-500 font-mono mb-1">Total Revenue</p>
          <p className="text-2xl font-light text-white">
            ${totalRevenue.toFixed(2)}
          </p>
        </div>
        <div className="bg-[#0a1220] px-6 py-5">
          <p className="text-xs text-slate-500 font-mono mb-1">Overall ROI</p>
          <p
            className="text-2xl font-light"
            style={{ color: overallRoi >= 0 ? "#86efac" : "#fca5a5" }}
          >
            {overallRoi.toFixed(1)}%
          </p>
        </div>
      </div>

      <ExpenseChart data={expensesByCategory} />

      <h2 className="text-sm font-mono text-slate-500 uppercase tracking-widest mb-3">
        By Product
      </h2>
      <div className="flex flex-col gap-px bg-white/5 rounded-xl overflow-hidden border border-white/5 mb-8">
        {products.map((p) => {
          const productInvested = p.expenses.reduce(
            (sum, e) => sum + e.amountUsd,
            0
          );

          const breakEvenUnits =
            p.sellingPriceUsd && p.sellingPriceUsd > 0
              ? Math.ceil(productInvested / p.sellingPriceUsd)
              : null;
          const unitsToBreakEven = breakEvenUnits
            ? Math.max(0, breakEvenUnits - (p.inventory?.unitsSold ?? 0))
            : null;
          const productRevenue =
            (p.sellingPriceUsd ?? 0) * (p.inventory?.unitsSold ?? 0);
          const profit = productRevenue - productInvested;
          const roi =
            productInvested > 0 ? (profit / productInvested) * 100 : 0;

            const costData = p.amazonCosts[0];

           const costFields = [
           "referralFeeUsd",
            "fbaFeeUsd",
           "returnProcessingFeeUsd",
         "ppcCostPerUnitUsd",
           "freightPerUnitUsd",
         "customsBrokerFeeUsd",
          "isfFilingFeeUsd",
         "drayagePerUnitUsd",
           "cargoInsuranceUsd",
          "dutiesUsd",
         "prepCostUsd",
           "labelingCostUsd",
  "inspectionUsd",
  "monthlyStorageUsd",
  "longtermStorageUsd",
] as const;

const totalCostPerUnit = costData
  ? costFields.reduce(
      (sum, f) => sum + Number(costData[f] ?? 0),
      0
    )
  : null;

const profitPerUnit =
  p.sellingPriceUsd && totalCostPerUnit !== null
    ? p.sellingPriceUsd - totalCostPerUnit
    : null;

          return (
            <div
              key={p.id}
              className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between bg-[#0a1220] px-4 md:px-6 py-4"
            >
              <div className="min-w-0">
                <p className="text-sm font-medium text-white">{p.name}</p>
                <p className="text-xs text-slate-500 mt-0.5">
                  Invested: ${productInvested.toFixed(2)} · Revenue: $
                  {productRevenue.toFixed(2)} · Units sold:{" "}
                  {p.inventory?.unitsSold ?? 0}
                  {breakEvenUnits !== null && (
                    <>
                      {" "}
                      · Break-even: {breakEvenUnits} units
                      {unitsToBreakEven !== null && unitsToBreakEven > 0 && (
                        <> ({unitsToBreakEven} to go)</>
                      )}
                      {unitsToBreakEven === 0 && (
                        <span className="text-green-400"> (reached!)</span>
                      )}
                    </>
                  )}
                </p>
              </div>
              <span
                className="w-fit text-xs font-mono px-3 py-1 rounded-full"
                style={{
                  background:
                    roi >= 0 ? "rgba(34,197,94,0.1)" : "rgba(239,68,68,0.1)",
                  border:
                    roi >= 0
                      ? "1px solid rgba(34,197,94,0.2)"
                      : "1px solid rgba(239,68,68,0.2)",
                  color: roi >= 0 ? "#86efac" : "#fca5a5",
                }}
              >
                ROI {roi.toFixed(1)}%
              </span>
            </div>
          );
        })}
      </div>

      <h2 className="text-sm font-mono text-slate-500 uppercase tracking-widest mb-3">
        Expense Log
      </h2>
      {expenses.length === 0 ? (
        <div className="text-center py-20 text-slate-600 text-sm">
          No expenses logged yet.
        </div>
      ) : (
        <div className="flex flex-col gap-px bg-white/5 rounded-xl overflow-hidden border border-white/5">
          {expenses.map((e) => (
            <ExpenseRow
              key={e.id}
              id={e.id}
              description={e.description}
              category={e.category}
              productName={e.product?.name ?? "General"}
              date={e.date}
              amountUsd={e.amountUsd}
            />
          ))}
        </div>
      )}
    </div>
  );
}