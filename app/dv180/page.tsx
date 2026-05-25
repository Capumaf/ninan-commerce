import Button from "../../components/Button";
import Section from "../../components/Section";


const included = [
  "Flexible aluminum duct",
  "Magnetic connector",
  "Metal clamps",
  "Mounting screws",
  "Wall anchors",
];

const steps = [
  {
    title: "Prepare the installation area",
    text: "Ensure the wall vent area and dryer outlet are clean, accessible, and aligned for proper connector placement.",
  },
  {
    title: "Position the magnetic connector",
    text: "Place the connector onto the vent opening and verify that the contact surface sits evenly before securing.",
  },
  {
    title: "Attach the duct",
    text: "Connect the flexible duct to the adapter and tighten the clamp until the connection feels firm and stable.",
  },
  {
    title: "Secure mounting hardware",
    text: "Use the included screws and anchors when wall mounting is required. Confirm the connector remains level.",
  },
  {
    title: "Final alignment check",
    text: "Move the dryer carefully into position and confirm that the magnetic connection aligns smoothly.",
  },
];

export default function DV180Page() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-slate-50 text-slate-950">
      <section className="mx-auto flex min-h-[82vh] w-full max-w-6xl flex-col justify-center px-5 py-20 md:px-8">
        <p className="mb-5 text-xs font-semibold uppercase tracking-[0.28em] text-blue-700">
          NINAN Commerce / Product Support
        </p>

        <h1 className="max-w-4xl text-4xl font-semibold tracking-tight md:text-6xl">
          DV180 Magnetic Dryer Vent Connector Kit
        </h1>

        <p className="mt-6 max-w-2xl text-base leading-7 text-slate-600 md:text-lg">
          Setup guidance, installation support, and product assistance for your
          NINAN magnetic dryer vent connector kit.
        </p>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Button href="mailto:support@ninan-commerce.com">
            Contact Support
          </Button>

          <Button href="#installation" variant="secondary">
            View Installation Guide
          </Button>
        </div>
      </section>

      <Section eyebrow="Included Components" title="What’s included in your kit">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {included.map((item) => (
            <div
              key={item}
              className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm"
            >
              <div className="mb-5 h-10 w-10 rounded-2xl bg-blue-50" />
              <p className="text-sm font-medium text-slate-900">{item}</p>
            </div>
          ))}
        </div>
      </Section>

      <section id="installation">
        <Section eyebrow="Installation Guide" title="Step-by-step setup">
          <div className="grid gap-4">
            {steps.map((step, index) => (
              <div
                key={step.title}
                className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm md:grid md:grid-cols-[80px_1fr] md:gap-8"
              >
                <p className="mb-4 text-sm font-semibold text-blue-700 md:mb-0">
                  {String(index + 1).padStart(2, "0")}
                </p>

                <div>
                  <h3 className="text-lg font-semibold text-slate-950">
                    {step.title}
                  </h3>

                  <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">
                    {step.text}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Section>
      </section>

      <Section eyebrow="Safety Notes" title="Before installation">
        <div className="rounded-3xl border border-blue-100 bg-blue-50 p-6 text-sm leading-7 text-slate-700 shadow-sm md:p-8">
          For best performance, install the connector on a clean, stable, and
          properly aligned vent surface. Confirm that all mounting hardware is
          secure before positioning the appliance. Avoid excessive bending of
          the duct and maintain a clear airflow path according to standard dryer
          vent installation practices.
        </div>
      </Section>

      <Section eyebrow="Support" title="Need help with setup or product support?">
        <div className="rounded-[2rem] bg-slate-950 p-8 text-white shadow-xl md:p-10">
          <p className="max-w-2xl text-sm leading-7 text-slate-300">
            Our support flow is being built as part of the NINAN Commerce
            ecosystem, including product assistance, warranty registration, and
            customer experience tools.
          </p>

          <div className="mt-7">
            <a
              href="mailto:support@ninan-commerce.com"
              className="inline-flex rounded-full bg-white px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-blue-50"
            >
              Email Support
            </a>
          </div>
        </div>
      </Section>

      <footer className="border-t border-slate-200 bg-white px-5 py-10 text-sm text-slate-500">
        <div className="mx-auto max-w-6xl">
          <p className="font-semibold text-slate-900">NINAN Commerce</p>
          <p className="mt-2">
            Scalable commerce infrastructure for premium product brands.
          </p>
        </div>
      </footer>
    </main>
  );
}