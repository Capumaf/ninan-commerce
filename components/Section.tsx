type SectionProps = {
  eyebrow?: string;
  title: string;
  children: React.ReactNode;
};

export default function Section({ eyebrow, title, children }: SectionProps) {
  return (
    <section className="mx-auto w-full max-w-6xl px-5 py-12 md:px-8 md:py-16">
      {eyebrow && (
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.24em] text-blue-700">
          {eyebrow}
        </p>
      )}

      <h2 className="mb-7 max-w-2xl text-2xl font-semibold tracking-tight text-slate-950 md:text-4xl">
        {title}
      </h2>

      {children}
    </section>
  );
}