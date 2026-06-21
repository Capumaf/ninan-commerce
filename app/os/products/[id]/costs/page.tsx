import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import { saveCosts } from "./actions";

const FIELD_GROUPS = [
  {
    title: "Amazon Fees",
    fields: [
      { name: "referralFeeUsd", label: "Referral Fee (USD)" },
      { name: "fbaFeeUsd", label: "FBA Fulfillment Fee (USD)" },
      { name: "returnProcessingFeeUsd", label: "Return Processing Fee (USD)" },
    ],
  },
  {
    title: "PPC / Ads",
    fields: [
      { name: "targetAcosPct", label: "Target ACOS (%)" },
      { name: "estimatedCpc", label: "Estimated CPC (USD)" },
      { name: "estimatedCvr", label: "Estimated CVR (%)" },
      { name: "ppcCostPerUnitUsd", label: "PPC Cost per Unit (USD)" },
    ],
  },
  {
    title: "Logistics",
    fields: [
      { name: "freightPerUnitUsd", label: "Freight per Unit (USD)" },
      { name: "customsBrokerFeeUsd", label: "Customs Broker Fee (USD)" },
      { name: "isfFilingFeeUsd", label: "ISF Filing Fee (USD)" },
      { name: "drayagePerUnitUsd", label: "Drayage per Unit (USD)" },
      { name: "cargoInsuranceUsd", label: "Cargo Insurance (USD)" },
      { name: "dutiesUsd", label: "Duties (USD)" },
      { name: "dutyRatePct", label: "Duty Rate (%)" },
    ],
  },
  {
    title: "Prep & Storage",
    fields: [
      { name: "prepCostUsd", label: "Prep Cost (USD)" },
      { name: "labelingCostUsd", label: "Labeling Cost (USD)" },
      { name: "inspectionUsd", label: "Inspection (USD)" },
      { name: "monthlyStorageUsd", label: "Monthly Storage (USD)" },
      { name: "longtermStorageUsd", label: "Long-term Storage (USD)" },
    ],
  },
  {
    title: "Other",
    fields: [
      { name: "sampleCostUsd", label: "Sample Cost (USD)" },
      { name: "photographyUsd", label: "Photography (USD)" },
      { name: "miscCostUsd", label: "Misc Cost (USD)" },
    ],
  },
];

export default async function ProductCostsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const product = await prisma.product.findUnique({
    where: { id },
    include: { amazonCosts: true },
  });

  if (!product) notFound();

  const existing = product.amazonCosts[0];

  return (
    <div className="p-4 md:p-10 max-w-3xl">
      <p className="text-xs uppercase tracking-widest text-blue-400 font-mono mb-2">
        Commerce OS · Products · {product.slug}
      </p>
      <h1 className="text-2xl md:text-3xl font-light text-white tracking-tight mb-8">
        Amazon <span className="font-semibold">Costs</span>
      </h1>

      <form action={saveCosts} className="flex flex-col gap-8">
        <input type="hidden" name="productId" value={product.id} />
        <input type="hidden" name="existingId" value={existing?.id ?? ""} />

        {FIELD_GROUPS.map((group) => (
          <div key={group.title}>
            <p className="text-xs font-mono uppercase tracking-widest text-slate-500 mb-3">
              {group.title}
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {group.fields.map((f) => (
                <div key={f.name}>
                  <label className="text-xs text-slate-500 font-mono">
                    {f.label}
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    name={f.name}
                    defaultValue={
                      existing
                        ? ((existing as any)[f.name] ?? "")
                        : ""
                    }
                    className="w-full mt-1 bg-[#0a1220] border border-white/10 rounded-lg px-3 py-2 text-sm text-white"
                  />
                </div>
              ))}
            </div>
          </div>
        ))}

        <div>
          <label className="text-xs text-slate-500 font-mono">Notes</label>
          <textarea
            name="notes"
            rows={3}
            defaultValue={existing?.notes ?? ""}
            className="w-full mt-1 bg-[#0a1220] border border-white/10 rounded-lg px-3 py-2 text-sm text-white"
          />
        </div>

        <button
          type="submit"
          className="px-5 py-2.5 rounded-xl text-sm font-medium text-white w-fit"
          style={{
            background: "linear-gradient(135deg, #1a3356, #2563a8)",
            border: "1px solid rgba(255,255,255,0.1)",
          }}
        >
          Save Costs
        </button>
      </form>
    </div>
  );
}