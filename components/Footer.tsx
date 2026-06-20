import Link from "next/link";

export default function Footer() {
  return (
    <footer className="mt-12 border-t border-slate-200 py-10">
      <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-sm font-semibold tracking-tight text-slate-900">
            NINAN COMMERCE
          </p>

         

          <p className="mt-4 text-xs leading-5 text-slate-400">
            Ninan Cuyuchi LLC, DBA Ninan Commerce
            <br />
            Wyoming, USA · By NINAN Studio
          </p>
        </div>

        <div className="flex items-center gap-8 text-sm text-slate-500">
          <Link href="/products" className="transition hover:text-slate-900">
            Support
          </Link>

          <Link href="/login" className="transition hover:text-slate-900">
            Commerce OS →
          </Link>
        </div>
      </div>
    </footer>
  );
}