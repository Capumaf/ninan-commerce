export default function SupportPage() {
  return (
    <main className="min-h-screen bg-[#f3f4f6] text-slate-950">

      <section className="mx-auto flex w-full max-w-5xl flex-col px-5 py-16 md:px-8 md:py-24">

        <a
          href="/products"
          className="mb-10 inline-flex w-fit items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm transition hover:border-slate-300 hover:text-slate-950"
        >
          <span>←</span>
          Back to products
        </a>

        <p className="mb-5 text-xs font-semibold uppercase tracking-[0.28em] text-[#1d4f8f]">
          NINAN Commerce / Support
        </p>

        <h1 className="max-w-4xl text-4xl font-semibold leading-[0.95] tracking-[-0.04em] md:text-7xl">
          Customer Assistance
        </h1>

        <p className="mt-6 max-w-2xl text-base leading-7 text-slate-600 md:text-lg">
          Product setup assistance, installation questions,
          onboarding guidance, and general support for
          NINAN Commerce products.
        </p>

      </section>

      <section className="mx-auto grid w-full max-w-5xl gap-5 px-5 pb-24 md:grid-cols-2 md:px-8">

        <div className="rounded-[2rem] border border-slate-200 bg-white p-7 shadow-sm">

          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#1d4f8f]">
            Email Support
          </p>

          <h2 className="mt-4 break-all text-2xl font-semibold tracking-tight text-slate-950">
            support@ninancommerce.com
          </h2>

          <p className="mt-4 text-sm leading-7 text-slate-600">
            For installation questions, onboarding support,
            replacement requests, and product assistance.
          </p>

          <a
            href="https://mail.google.com/mail/?view=cm&fs=1&to=support@ninancommerce.com&su=DV180%20Product%20Assistance"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-flex items-center justify-center rounded-full bg-[#1d4f8f] px-7 py-4 text-sm font-semibold text-white shadow-sm transition hover:bg-[#163b6b]"
          >
            Send Email
          </a>

          <p className="mt-4 text-sm text-slate-500">
            Or email us directly at support@ninancommerce.com
          </p>

        </div>

        <div className="rounded-[2rem] border border-slate-200 bg-white p-7 shadow-sm">

          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#1d4f8f]">
            Product Guides
          </p>

          <h2 className="mt-4 text-2xl font-semibold tracking-tight text-slate-950">
            DV180 Installation Guide
          </h2>

          <p className="mt-4 text-sm leading-7 text-slate-600">
            Access setup instructions, installation steps,
            included components, safety notes, and product guidance.
          </p>

          <a
            href="/dv180"
            className="mt-8 inline-flex items-center justify-center rounded-full border border-slate-200 bg-white px-7 py-4 text-sm font-semibold text-slate-950 transition hover:border-slate-300"
          >
            Open Guide
          </a>

        </div>

      </section>

    </main>
  );
}