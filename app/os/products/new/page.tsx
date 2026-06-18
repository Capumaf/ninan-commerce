"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function NewProductPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: "",
    slug: "",
    category: "",
    asin: "",
    referenceUrl: "",
    notes: "",
  });

  async function handleSubmit() {
    setLoading(true);
    const res = await fetch("/api/os/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    if (res.ok) router.push("/os/products");
    setLoading(false);
  }

  return (
    <div className="p-10 max-w-2xl">
      <p className="text-xs uppercase tracking-widest text-blue-400 font-mono mb-2">Commerce OS · Products</p>
      <h1 className="text-3xl font-light text-white tracking-tight mb-8">
        New <span className="font-semibold">Product</span>
      </h1>

      <div className="flex flex-col gap-4">
        {[
          { key: "name", label: "Product Name", placeholder: "Magnetic Dryer Vent Connector Kit" },
          { key: "slug", label: "Slug", placeholder: "dv180" },
          { key: "category", label: "Category", placeholder: "Home Improvement" },
          { key: "asin", label: "ASIN", placeholder: "B0XXXXXXXX" },
          { key: "referenceUrl", label: "Reference URL", placeholder: "https://..." },
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
            placeholder="Internal notes..."
            value={form.notes}
            onChange={(e) => setForm({ ...form, notes: e.target.value })}
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
          {loading ? "Creating..." : "Create Product"}
        </button>
      </div>
    </div>
  );
}