export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#f6f9fc] text-slate-950">
      <section className="mx-auto flex min-h-screen max-w-7xl flex-col justify-center px-6 py-24">

        <p className="mb-6 text-xs font-semibold uppercase tracking-[0.28em] text-blue-700">
          NINAN Commerce
        </p>

        <h1 className="max-w-4xl text-5xl font-semibold tracking-tight md:text-7xl">
          Scalable commerce infrastructure for modern product brands.
        </h1>

        <p className="mt-8 max-w-2xl text-lg leading-8 text-slate-600">
          Customer experience, product support, QR onboarding,
          operational systems, and Amazon FBA infrastructure —
          built into one scalable ecosystem.
        </p>

        <div className="mt-10 flex flex-col gap-4 sm:flex-row">
          <a
            href="/dv180"
            className="inline-flex items-center justify-center rounded-full bg-blue-700 px-7 py-4 text-sm font-semibold text-white shadow-lg transition hover:bg-blue-800"
          >
            Open DV180 Support
          </a>

          <a
            href="/os"
            className="inline-flex items-center justify-center rounded-full border border-slate-300 bg-white px-7 py-4 text-sm font-semibold text-slate-900 transition hover:border-blue-300"
          >
            Commerce OS
          </a>
        </div>
      </section>
    </main>
  );
}