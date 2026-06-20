import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { productGuides } from "@/lib/productGuides";
import Button from "@/components/Button";
import Section from "@/components/Section";

function ComponentIcon({ item }: { item: string }) {
  const iconClass = "h-8 w-8 text-[#1d4f8f]";

  if (item === "Dryer vent adapter x1") {
    return (
      <svg viewBox="0 0 64 64" className={iconClass} fill="none">
        <circle cx="32" cy="32" r="19" stroke="currentColor" strokeWidth="3" />
        <circle cx="32" cy="32" r="10" stroke="currentColor" strokeWidth="3" />
      </svg>
    );
  }

  if (item === "Wall assembly x1") {
    return (
      <svg viewBox="0 0 64 64" className={iconClass} fill="none">
        <rect x="13" y="13" width="38" height="38" rx="7" stroke="currentColor" strokeWidth="3" />
        <circle cx="32" cy="32" r="11" stroke="currentColor" strokeWidth="3" />
        <circle cx="22" cy="22" r="2.5" fill="currentColor" />
        <circle cx="42" cy="22" r="2.5" fill="currentColor" />
        <circle cx="22" cy="42" r="2.5" fill="currentColor" />
        <circle cx="42" cy="42" r="2.5" fill="currentColor" />
      </svg>
    );
  }

  if (item === "Vent hose x1") {
    return (
      <svg viewBox="0 0 64 64" className={iconClass} fill="none">
        <path d="M10 25h44v14H10z" stroke="currentColor" strokeWidth="3" strokeLinejoin="round" />
        <path d="M18 25v14M26 25v14M34 25v14M42 25v14M50 25v14" stroke="currentColor" strokeWidth="2" />
      </svg>
    );
  }

  if (item === "Hose clamps x2") {
    return (
      <svg viewBox="0 0 64 64" className={iconClass} fill="none">
        <circle cx="25" cy="32" r="12" stroke="currentColor" strokeWidth="3" />
        <circle cx="39" cy="32" r="12" stroke="currentColor" strokeWidth="3" />
      </svg>
    );
  }

  if (item === "Wall anchors x4") {
    return (
      <svg viewBox="0 0 64 64" className={iconClass} fill="none">
        <path d="M22 14v36M42 14v36" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
        <path d="M17 24h10M37 24h10M17 40h10M37 40h10" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
      </svg>
    );
  }

  if (item === "Screws x4") {
    return (
      <svg viewBox="0 0 64 64" className={iconClass} fill="none">
        <circle cx="32" cy="16" r="8" stroke="currentColor" strokeWidth="3" />
        <path d="M28 12h8M28 16h8M28 20h8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <path d="M32 24v26" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
        <path d="M28 30l4-3 4 3M28 38l4-3 4 3M28 46l4-3 4 3" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 64 64" className={iconClass} fill="none">
      <path d="M20 18l26 26" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const product = await prisma.product.findUnique({
    where: { slug, status: "ACTIVE" },
  });

  if (!product) {
    notFound();
  }

  const guide = productGuides[slug];

  return (
    <main className="min-h-screen bg-[#f3f4f6] text-slate-950">
      <section className="mx-auto flex w-full max-w-6xl flex-col justify-center px-5 py-12 md:px-8 md:py-20">
        <Link
          href="/products"
          className="mb-10 inline-flex w-fit items-center gap-1.5 text-xs font-medium text-slate-400 transition hover:text-slate-700"
        >
          ← Back to products
        </Link>

        <p className="mb-6 text-xs font-semibold uppercase tracking-[0.28em] text-[#1d4f8f]">
  DV180
</p>

        <h1 className="max-w-4xl text-4xl font-semibold leading-[0.95] tracking-[-0.04em] md:text-6xl">
          {product.name.trim()}
        </h1>

        <p className="mt-6 max-w-2xl text-base leading-7 text-slate-600">
          Installation guidance and setup instructions for your{" "}
          {product.name.trim()}.
        </p>

        <div className="mt-8 flex flex-wrap gap-4">
          {product.amazonUrl && (

            <a
            
              href={product.amazonUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-[#ff9900] px-7 py-4 text-sm font-semibold text-slate-950 shadow-lg shadow-orange-900/10 transition hover:bg-[#e88a00]"
            >
              Buy on Amazon →
            </a>
          )}

          {guide && <Button href="#installation">Start Guide</Button>}
        </div>
      </section>

      {guide && (
        <>
          <Section eyebrow="Included Components" title="What's included in your kit">
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {guide.included.map((item) => (
                <div
                  key={item}
                  className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-[2px] hover:border-slate-300 hover:shadow-md"
                >
                  <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100">
                    <ComponentIcon item={item} />
                  </div>
                  <p className="text-base font-semibold tracking-tight text-slate-950">
                    {item}
                  </p>
                </div>
              ))}
            </div>
          </Section>

          <Section eyebrow="Specifications" title="Product dimensions">
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {guide.specifications.map((item) => (
                <div
                  key={item.label}
                  className="rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-sm"
                >
                  <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#1d4f8f]">
                    {item.label}
                  </p>
                  <p className="mt-4 text-lg font-semibold tracking-tight text-slate-950">
                    {item.value}
                  </p>
                </div>
              ))}
            </div>
          </Section>

          <Section eyebrow="Before You Start" title="Tools and preparation">
            <div className="grid gap-5 lg:grid-cols-[1fr_1.1fr]">
              <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
                <h3 className="text-lg font-semibold tracking-tight text-slate-950">
                  Tools required
                </h3>
                <div className="mt-5 grid gap-3 sm:grid-cols-2">
                  {guide.tools.map((tool) => (
                    <div
                      key={tool}
                      className="rounded-2xl bg-slate-100 px-4 py-3 text-sm font-medium text-slate-700"
                    >
                      {tool}
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-[2rem] border border-slate-200 bg-white p-6 text-sm leading-7 text-slate-700 shadow-sm">
                <h3 className="mb-3 text-lg font-semibold tracking-tight text-slate-950">
                  Installation prerequisites
                </h3>
                <p>
                  The dryer vent path should already be hung and should
                  continue straight behind the dryer or within 1–2 inches of
                  alignment. For new installations, a dryer exhaust wall boot
                  may be needed.
                </p>
              </div>
            </div>
          </Section>

          <section id="installation">
            <Section eyebrow="Installation Guide" title="Step-by-step setup">
              <div className="grid gap-4">
                {guide.steps.map((step, index) => (
                  <div
                    key={step.title}
                    className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm md:grid md:grid-cols-[70px_1fr] md:gap-8"
                  >
                    <p className="mb-4 text-sm font-semibold text-[#1d4f8f] md:mb-0">
                      {String(index + 1).padStart(2, "0")}
                    </p>
                    <div>
                      <h3 className="text-lg font-semibold tracking-tight text-slate-950">
                        {step.title}
                      </h3>
                      <p className="mt-2 max-w-2xl text-sm leading-7 text-slate-600">
                        {step.text}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </Section>
          </section>

          <Section eyebrow="Safety Notes" title="Before installation">
            <div className="grid gap-4">
              {guide.safetyNotes.map((note, i) => (
                <div
                  key={i}
                  className="rounded-[2rem] border border-slate-200 bg-white p-6 text-sm leading-7 text-slate-700 shadow-sm"
                >
                  {note}
                </div>
              ))}
            </div>
          </Section>
        </>
      )}

      <Section eyebrow="Customer Assistance" title="Need help with your guide?">
        <div className="rounded-[2.5rem] bg-slate-950 p-8 text-white shadow-xl md:p-10">
          <p className="max-w-2xl text-sm leading-7 text-slate-300">
            For questions about setup, installation, or product use,
            contact NINAN Commerce assistance.
          </p>
          <div className="mt-7">
            <Link
              href="/support"
              className="inline-flex items-center justify-center rounded-full bg-[#1d4f8f] px-7 py-4 text-sm font-semibold text-white shadow-lg shadow-blue-950/20 transition hover:bg-[#163b6b]"
            >
              Contact Assistance
            </Link>
          </div>
        </div>
      </Section>

      <footer className="mt-10 border-t border-slate-200 px-5 py-10 text-sm text-slate-500">
        <div className="mx-auto max-w-6xl">
          <p className="font-semibold text-slate-900">NINAN Commerce</p>
          <p className="mt-2">
            Product guides and onboarding resources for NINAN Commerce products.
          </p>
          <p className="mt-2">ninancommerce.com</p>
        </div>
      </footer>
    </main>
  );
}