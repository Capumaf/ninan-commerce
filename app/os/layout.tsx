import Link from "next/link";

export default function OSLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-[#060b14]" style={{ fontFamily: "'DM Sans', system-ui, sans-serif" }}>
      <aside className="w-52 border-r border-white/5 flex flex-col py-6 px-3 sticky top-0 h-screen">
        <div className="flex items-center gap-2 px-3 mb-8">
          <div className="w-5 h-5 rounded-[4px]" style={{ background: "linear-gradient(135deg, #a4bedc, #3b82c4)" }} />
          <span className="text-xs font-semibold text-white tracking-tight">NINAN OS</span>
        </div>
        <nav className="flex flex-col gap-1">
          {[
            { href: "/os", label: "Overview" },
            { href: "/os/products", label: "Products" },
            { href: "/os/suppliers", label: "Suppliers" },
            { href: "/os/inventory", label: "Inventory" },
            { href: "/os/shipments", label: "Shipments" },
            { href: "/os/ppc", label: "PPC" },
            { href: "/os/analytics", label: "Analytics" },
          ].map((item) => (
            <Link
              key={item.href}
              href={item.href}
              style={{ fontSize: 13, color: "#ffffff", padding: "8px 12px", borderRadius: 8, textDecoration: "none", display: "block" }} >
              {item.label}
            </Link>
          ))}
        </nav>
      </aside>
      <main className="flex-1 overflow-auto">
        {children}
      </main>
    </div>
  );
}