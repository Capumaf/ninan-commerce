import Link from "next/link";

export default function ProductsPage() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#f6f9fc] text-slate-950">
      <section className="relative mx-auto w-full max-w-6xl px-5 py-24 md:px-8">

        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,#dbeafe_0%,transparent_45%)]" />

        <p className="mb-6 text-xs font-semibold uppercase tracking-[0.28em] text-[#1d4f8f]">
          NINAN Commerce / Products
        </p>

        <h1 className="max-w-5xl text-5xl font-semibold leading-[0.95] tracking-[-0.04em] md:text-7xl">
          Product Support
        </h1>

        <p className="mt-8 max-w-2xl text-lg leading-8 text-slate-600">
          Setup guidance, onboarding resources, installation support,
          and product information for NINAN Commerce products.
        </p>

        <div className="mt-16 grid gap-5 md:grid-cols-2">

          <Link
            href="/dv180"
            className="group rounded-[2rem] border border-slate-200 bg-white p-7 shadow-sm transition hover:border-blue-300"
          >

            <div className="mb-8 h-12 w-12 rounded-2xl bg-blue-50" />

            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#1d4f8f]">
              DV180
            </p>

            <h2 className="mt-3 text-2xl font-semibold tracking-tight text-slate-950">
              Magnetic Dryer Vent Connector Kit
            </h2>

            <p className="mt-4 max-w-md text-sm leading-7 text-slate-600">
              Installation guidance, onboarding resources,
              and customer product support.
            </p>

            <div className="mt-8 text-sm font-semibold text-slate-900">
              Open Guide →
            </div>

          </Link>

        </div>

      </section>
    </main>
  );
}