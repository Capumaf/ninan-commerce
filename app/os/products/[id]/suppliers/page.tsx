import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import Link from "next/link";
import BackButton from "@/components/BackButton";

export default async function SuppliersPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const product = await prisma.product.findUnique({
    where: { id },
    include: { suppliers: { orderBy: { createdAt: "desc" } } },
  });
  if (!product) notFound();

  return (
    <div className="p-4 md:p-10 w-full max-w-5xl">
        <BackButton />
      <p className="text-xs uppercase tracking-widest text-blue-400 font-mono mb-2">
        {product.slug} · Suppliers
      </p>
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-8">
        <h1 className="text-2xl md:text-3xl font-light text-white tracking-tight">
          Supplier <span className="font-semibold">Management</span>
        </h1>
        <Link
          href={`/os/products/${id}/suppliers/new`}
          className="w-full md:w-auto text-center px-5 py-2.5 rounded-xl text-sm font-medium text-white"
          style={{ background: "linear-gradient(135deg, #1a3356, #2563a8)" }}
        >
          + Add Supplier
        </Link>
      </div>

      {product.suppliers.length === 0 ? (
        <p className="text-slate-600 text-sm text-center py-20">No suppliers yet.</p>
      ) : (
        <div className="flex flex-col gap-px bg-white/5 rounded-xl overflow-hidden border border-white/5">
          {product.suppliers.map((s) => (
            <div key={s.id} className="bg-[#0a1220] px-6 py-4">
              <div className="flex items-center justify-between mb-1">
                <p className="text-sm font-medium text-white">{s.supplierName}</p>
                <span className="text-xs font-mono text-blue-400">{s.status}</span>
              </div>
              <div className="flex gap-6 text-xs text-slate-500 mt-1">
                {s.unitPrice && <span>Unit: ${s.unitPrice} {s.currency}</span>}
                {s.moq && <span>MOQ: {s.moq}</span>}
                {s.leadTimeDays && <span>Lead: {s.leadTimeDays}d</span>}
                {s.country && <span>{s.country}</span>}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}