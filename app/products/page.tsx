import Link from "next/link";

export default function ProductsPage() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#f6f9fc] text-slate-950">
      <section className="relative mx-auto w-full max-w-6xl px-5 py-16 md:px-8 md:py-24">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,#dbeafe_0%,transparent_45%)]" />

        <Link
          href="/"
          className="mb-10 inline-flex w-fit items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm transition hover:border-blue-300 hover:text-[#1d4f8f]"
        >
          <span>←</span>
          Back home
        </Link>

        <p className="mb-6 text-xs font-semibold uppercase tracking-[0.28em] text-[#1d4f8f]">
          NINAN Commerce / Products
        </p>

        <h1 className="max-w-5xl text-4xl font-semibold leading-[0.95] tracking-[-0.04em] md:text-7xl">
          Product Support
        </h1>

        <p className="mt-8 max-w-2xl text-base leading-7 text-slate-600 md:text-lg md:leading-8">
          Setup guidance, onboarding resources, installation support, and
          product information for NINAN Commerce products.
        </p>

        <div className="mt-12 grid gap-5 md:mt-16 md:grid-cols-2">
          <Link
            href="/dv180"
            className="group rounded-[2rem] border border-slate-200 bg-white p-6 shadow-[0_10px_30px_rgba(15,23,42,0.06)] transition-all duration-300 hover:-translate-y-1 hover:border-blue-300 hover:shadow-[0_18px_50px_rgba(29,79,143,0.12)] md:p-7"
          >
            <div className="mb-8 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#eef6ff]">
              <svg
                viewBox="0 0 64 64"
                className="h-8 w-8 text-[#1d4f8f] transition-transform duration-300 group-hover:scale-110"
                fill="none"
              >
                <circle
                  cx="32"
                  cy="32"
                  r="19"
                  stroke="currentColor"
                  strokeWidth="3"
                />

                <circle
                  cx="32"
                  cy="32"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="3"
                />

                <path
                  d="M45 20l7-7"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeLinecap="round"
                />
              </svg>
            </div>

            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#1d4f8f]">
              DV180
            </p>

            <h2 className="mt-3 text-2xl font-semibold tracking-tight text-slate-950 md:text-3xl">
              Magnetic Dryer Vent Connector Kit
            </h2>

            <p className="mt-4 max-w-md text-sm leading-7 text-slate-600">
              Installation guidance, onboarding resources, and customer product
              support.
            </p>

            <div className="mt-8 text-sm font-semibold text-slate-900">
              <span className="inline-flex items-center gap-2">
                Open Guide
                <span className="transition-transform duration-300 group-hover:translate-x-1">
                  →
                </span>
              </span>
            </div>
          </Link>
        </div>
      </section>
    </main>
  );
}