import { prisma } from "@/lib/prisma";
import BackButton from "@/components/BackButton";

export default async function OSPage() {
  const products = await prisma.product.findMany();

  return (
    <div className="p-10">
      <p className="text-xs uppercase tracking-widest text-blue-400 font-mono mb-2">Commerce OS</p>
      <h1 className="text-3xl font-light text-white tracking-tight mb-1">
        Operational <span className="font-semibold">Dashboard</span>
      </h1>
      <p className="text-slate-500 text-sm mb-10">
        {products.length} product{products.length !== 1 ? "s" : ""} in system
      </p>

      <div className="grid grid-cols-3 gap-px bg-white/5 rounded-xl overflow-hidden border border-white/5">
        {[
          { label: "Active SKUs", value: products.filter(p => p.status === "ACTIVE").length },
          { label: "Total Products", value: products.length },
          { label: "In Research", value: products.filter(p => p.status === "RESEARCHING").length },
        ].map((m) => (
          <div key={m.label} className="bg-[#0a1220] p-6">
            <p className="text-xs font-mono uppercase tracking-widest text-slate-500 mb-2">{m.label}</p>
            <p className="text-4xl font-light text-white">{m.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}