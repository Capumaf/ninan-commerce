export default function HomePage() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#f6f9fc] text-slate-950">
      <section className="relative mx-auto flex min-h-screen w-full max-w-6xl flex-col justify-center px-5 py-20 md:px-8">

        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,#dbeafe_0%,transparent_45%)]" />

        <p className="mb-6 text-xs font-semibold uppercase tracking-[0.28em] text-[#1d4f8f]">
          NINAN Commerce
        </p>

        <h1 className="max-w-5xl text-5xl font-semibold leading-[0.95] tracking-[-0.04em] md:text-7xl">
          Practical products designed for modern everyday living.
        </h1>

        <p className="mt-8 max-w-2xl text-lg leading-8 text-slate-600">
          NINAN Commerce develops modern private-label products with
          structured onboarding, installation guidance, and reliable
          customer support designed for long-term everyday use.
        </p>

        <div className="mt-10">

          <a
            href="/products"
            className="inline-flex items-center justify-center rounded-full bg-[#1d4f8f] px-7 py-4 text-sm font-semibold text-white shadow-lg shadow-blue-900/10 transition hover:bg-[#163b6b]"
          >
            Product Support
          </a>

        </div>

      </section>
    </main>
  );
}