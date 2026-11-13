import Link from "next/link";
import Footer from "@/components/Footer";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#f6f9fc] text-slate-950">
      <div className="mx-auto flex min-h-screen w-full max-w-6xl flex-col px-5 md:px-8">
        <header className="flex items-center justify-between py-6">
          <p className="text-sm font-semibold tracking-tight">
            NINAN
          </p>

        </header>

        <section className="relative flex flex-1 flex-col justify-center py-12">
          <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,#dbeafe_0%,transparent_45%)]" />

          <h1 className="max-w-5xl text-5xl font-semibold leading-[0.95] tracking-[-0.04em] md:text-7xl">
            Practical products designed for modern everyday living.
          </h1>

          <p className="mt-8 max-w-2xl text-lg leading-8 text-slate-600">
            NINAN Commerce develops modern private-label products with
            structured onboarding, installation guidance, and reliable customer
            support designed for long-term everyday use.
          </p>

          <div className="mt-10 flex flex-wrap gap-4">
            <a
              href="https://www.amazon.com/dp/B0GXR4DSJQ"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-[#ff9900] px-7 py-4 text-sm font-semibold text-slate-950 shadow-lg shadow-orange-900/10 transition hover:bg-[#e88a00]"
            >
              Buy on Amazon →
            </a>

            <Link
              href="/products"
              className="inline-flex items-center justify-center rounded-full border border-slate-300 bg-white px-7 py-4 text-sm font-semibold text-slate-900 shadow-sm transition hover:border-slate-400"
            >
              Product Support
            </Link>
          </div>
        </section>

        <Footer />
      </div>
    </main>
  );
}