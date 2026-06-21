import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import Link from "next/link";
import UpdateStatusForm from "@/components/UpdateStatusForm";
import UpdateSellingPriceForm from "@/components/UpdateSellingPriceForm";
import UpdateNameForm from "@/components/UpdateNameForm";
import BackButton from "@/components/BackButton";

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const product = await prisma.product.findUnique({
    where: { id },
  });

  if (!product) notFound();

  return (
       <div className="p-4 md:p-10 w-full max-w-4xl">
          <BackButton />
      <p className="text-xs uppercase tracking-widest text-blue-400 font-mono mb-2">
        Commerce OS · Products · {product.slug}
      </p>

      <h1 className="text-2xl md:text-3xl font-light text-white tracking-tight mb-8">
        {product.name}
      </h1>

      <div className="flex flex-col gap-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            { label: "ASIN", value: product.asin },
            { label: "Category", value: product.category },
            { label: "Slug", value: product.slug },
            { label: "Status", value: product.status },
          ].map((f) => (
            <div
              key={f.label}
              className="bg-[#0a1220] border border-white/5 rounded-xl p-4"
            >
              <p className="text-xs font-mono uppercase tracking-widest text-slate-500 mb-1">
                {f.label}
              </p>
              <p className="text-sm text-white">{f.value ?? "—"}</p>
            </div>
          ))}
        </div>

        {product.referenceUrl && (
        <a
            href={product.referenceUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-blue-400 hover:underline"
          >
            Amazon listing →
          </a>
        )}

        {product.notes && (
          <div className="bg-[#0a1220] border border-white/5 rounded-xl p-4">
            <p className="text-xs font-mono uppercase tracking-widest text-slate-500 mb-2">
              Notes
            </p>
            <p className="text-sm text-slate-300 leading-relaxed">
              {product.notes}
            </p>
          </div>
        )}
      </div>

      <UpdateNameForm
        productId={product.id}
        currentName={product.name}
      />

      <UpdateStatusForm
        productId={product.id}
        currentStatus={product.status}
      />

   <UpdateSellingPriceForm
  productId={product.id}
  currentSellingPriceUsd={product.sellingPriceUsd}
/>

      <Link
        href={`/os/products/${product.id}/suppliers`}
          style={{
  marginTop: 24,
  display: "inline-block",
  fontSize: 13,
  color: "#60a5fa",
  textDecoration: "none",
  width: "fit-content",
}}
      >
        View Suppliers →
      </Link>

      <Link
      href={`/os/products/${product.id}/costs`}
      style={{
      marginTop: 12,
      display: "inline-block",
      fontSize: 13,
      color: "#60a5fa",
      textDecoration: "none",
      width: "fit-content",
      }}
     >
  Edit Amazon Costs →
</Link>
    </div>
  );
}