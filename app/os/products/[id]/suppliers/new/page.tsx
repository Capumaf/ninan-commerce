"use client";
import { useState } from "react";
import { useRouter, useParams } from "next/navigation";

export default function NewSupplierPage() {
  const router = useRouter();
  const params = useParams();
  const productId = params.id as string;
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    supplierName: "",
    contactEmail: "",
    country: "",
    unitPrice: "",
    currency: "USD",
    moq: "",
    leadTimeDays: "",
    sourceUrl: "",
    generalNotes: "",
  });

  async function handleSubmit() {
    setLoading(true);
    await fetch(`/api/os/products/${productId}/suppliers`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...form,
        unitPrice: form.unitPrice ? parseFloat(form.unitPrice) : null,
        moq: form.moq ? parseInt(form.moq) : null,
        leadTimeDays: form.leadTimeDays ? parseInt(form.leadTimeDays) : null,
      }),
    });
    router.push(`/os/products/${productId}/suppliers`);
    setLoading(false);
  }

  return (
    <div className="p-10 max-w-2xl">
      <p className="text-xs uppercase tracking-widest text-blue-400 font-mono mb-2">New Supplier</p>
      <h1 className="text-3xl font-light text-white tracking-tight mb-8">
        Add <span className="font-semibold">Supplier</span>
      </h1>

      <div className="flex flex-col gap-4">
        {[
          { key: "supplierName", label: "Supplier Name", placeholder: "Shenzhen XYZ Co." },
          { key: "contactEmail", label: "Contact Email", placeholder: "sales@supplier.com" },
          { key: "country", label: "Country", placeholder: "China" },
          { key: "unitPrice", label: "Unit Price (USD)", placeholder: "4.50" },
          { key: "moq", label: "MOQ", placeholder: "500" },
          { key: "leadTimeDays", label: "Lead Time (days)", placeholder: "30" },
          { key: "sourceUrl", label: "Alibaba / Source URL", placeholder: "https://..." },
        ].map((field) => (
          <div key={field.key}>
            <label className="text-xs font-mono uppercase tracking-widest text-slate-500 mb-1.5 block">
              {field.label}
            </label>
            <input
              type="text"
              placeholder={field.placeholder}
              value={form[field.key as keyof typeof form]}
              onChange={(e) => setForm({ ...form, [field.key]: e.target.value })}
              className="w-full bg-[#0a1220] border border-white/10 rounded-lg px-4 py-3 text-sm text-white placeholder:text-slate-600 outline-none focus:border-blue-500/50"
            />
          </div>
        ))}

        <div>
          <label className="text-xs font-mono uppercase tracking-widest text-slate-500 mb-1.5 block">Notes</label>
          <textarea
            placeholder="Negotiation notes, quality observations..."
            value={form.generalNotes}
            onChange={(e) => setForm({ ...form, generalNotes: e.target.value })}
            rows={3}
            className="w-full bg-[#0a1220] border border-white/10 rounded-lg px-4 py-3 text-sm text-white placeholder:text-slate-600 outline-none focus:border-blue-500/50 resize-none"
          />
        </div>

        <button
          onClick={handleSubmit}
          disabled={loading}
          className="mt-2 px-6 py-3 rounded-xl text-sm font-medium text-white disabled:opacity-50"
          style={{ background: "linear-gradient(135deg, #1a3356, #2563a8)" }}
        >
          {loading ? "Saving..." : "Add Supplier"}
        </button>
      </div>
    </div>
  );
}