import { prisma } from "@/lib/prisma";
import Link from "next/link";
import BackButton from "@/components/BackButton";

export default async function ProductsPage() {
  const products = await prisma.product.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="p-4 md:p-10">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-8">
        <div>
          <p className="text-xs uppercase tracking-widest text-blue-400 font-mono mb-2">
            Commerce OS · Products
          </p>
          <h1 className="text-2xl md:text-3xl font-light text-white tracking-tight">
            Product <span className="font-semibold">Catalog</span>
          </h1>
        </div>

        <Link
          href="/os/products/new"
          className="w-full md:w-auto text-center px-5 py-2.5 rounded-xl text-sm font-medium text-white"
          style={{
            background: "linear-gradient(135deg, #1a3356, #2563a8)",
            border: "1px solid rgba(255,255,255,0.1)",
          }}
        >
          + New Product
        </Link>
      </div>

      {products.length === 0 ? (
        <div className="text-center py-20 text-slate-600 text-sm">
          No products yet. Create your first one.
        </div>
      ) : (
        <div className="flex flex-col gap-px bg-white/5 rounded-xl overflow-hidden border border-white/5">
          {products.map((p) => (
            <Link
              key={p.id}
              href={`/os/products/${p.id}`}
              className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between bg-[#0a1220] px-4 md:px-6 py-4 hover:bg-[#0e1c30] transition-colors"
            >
              <div className="min-w-0">
                <p className="text-sm font-medium text-white break-words">
                  {p.name}
                </p>
                <p className="text-xs text-slate-500 mt-0.5 break-all">
                  {p.slug}
                </p>
              </div>

              <span
                className="w-fit text-xs font-mono px-3 py-1 rounded-full"
                style={{
                  background:
                    p.status === "ACTIVE"
                      ? "rgba(34,197,94,0.1)"
                      : "rgba(37,99,168,0.1)",
                  border:
                    p.status === "ACTIVE"
                      ? "1px solid rgba(34,197,94,0.2)"
                      : "1px solid rgba(37,99,168,0.2)",
                  color: p.status === "ACTIVE" ? "#86efac" : "#93c5e8",
                }}
              >
                {p.status}
              </span>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}