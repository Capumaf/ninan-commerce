import { prisma } from "@/lib/prisma";
import { updateExpense } from "../../actions";
import { notFound } from "next/navigation";

export default async function EditExpensePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const [expense, products] = await Promise.all([
    prisma.expense.findUnique({ where: { id } }),
    prisma.product.findMany({ orderBy: { name: "asc" } }),
  ]);

  if (!expense) notFound();

  return (
    <div className="p-4 md:p-10 max-w-xl">
      <p className="text-xs uppercase tracking-widest text-blue-400 font-mono mb-2">
        Commerce OS · Finance
      </p>
      <h1 className="text-2xl md:text-3xl font-light text-white tracking-tight mb-8">
        Edit <span className="font-semibold">Expense</span>
      </h1>

      <form action={updateExpense} className="flex flex-col gap-4">
        <input type="hidden" name="id" value={expense.id} />

        <div>
          <label className="text-xs text-slate-500 font-mono">Product (optional)</label>
          <select
            name="productId"
            defaultValue={expense.productId ?? ""}
            className="w-full mt-1 bg-[#0a1220] border border-white/10 rounded-lg px-3 py-2 text-sm text-white"
          >
            <option value="">General (not tied to a product)</option>
            {products.map((p) => (
              <option key={p.id} value={p.id}>
                {p.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="text-xs text-slate-500 font-mono">Category</label>
          <select
            name="category"
            required
            defaultValue={expense.category}
            className="w-full mt-1 bg-[#0a1220] border border-white/10 rounded-lg px-3 py-2 text-sm text-white"
          >
            <option value="LLC_LEGAL">LLC / Legal</option>
            <option value="SOFTWARE_TOOLS">Software / Tools</option>
            <option value="SOURCING_SAMPLES">Sourcing / Samples</option>
            <option value="SHIPPING_LOGISTICS">Shipping / Logistics</option>
            <option value="PACKAGING_DESIGN">Packaging / Design</option>
            <option value="PHOTOGRAPHY">Photography</option>
            <option value="PPC_ADS">PPC / Ads</option>
            <option value="AMAZON_FEES">Amazon Fees</option>
            <option value="MISC">Misc</option>
          </select>
        </div>

        <div>
          <label className="text-xs text-slate-500 font-mono">Description</label>
          <input
            type="text"
            name="description"
            required
            defaultValue={expense.description}
            className="w-full mt-1 bg-[#0a1220] border border-white/10 rounded-lg px-3 py-2 text-sm text-white"
          />
        </div>

        <div>
          <label className="text-xs text-slate-500 font-mono">Amount (USD)</label>
          <input
            type="number"
            step="0.01"
            name="amountUsd"
            required
            defaultValue={expense.amountUsd}
            className="w-full mt-1 bg-[#0a1220] border border-white/10 rounded-lg px-3 py-2 text-sm text-white"
          />
        </div>

        <div>
          <label className="text-xs text-slate-500 font-mono">Date</label>
          <input
            type="date"
            name="date"
            defaultValue={expense.date.toISOString().split("T")[0]}
            className="w-full mt-1 bg-[#0a1220] border border-white/10 rounded-lg px-3 py-2 text-sm text-white"
          />
        </div>

        <label className="flex items-center gap-2 text-sm text-slate-400">
          <input
            type="checkbox"
            name="isRecurring"
            defaultChecked={expense.isRecurring}
          />
          Recurring expense
        </label>

        <div>
          <label className="text-xs text-slate-500 font-mono">Notes (optional)</label>
          <textarea
            name="notes"
            rows={3}
            defaultValue={expense.notes ?? ""}
            className="w-full mt-1 bg-[#0a1220] border border-white/10 rounded-lg px-3 py-2 text-sm text-white"
          />
        </div>

        <button
          type="submit"
          className="mt-2 px-5 py-2.5 rounded-xl text-sm font-medium text-white"
          style={{
            background: "linear-gradient(135deg, #1a3356, #2563a8)",
            border: "1px solid rgba(255,255,255,0.1)",
          }}
        >
          Save Changes
        </button>
      </form>
    </div>
  );
}