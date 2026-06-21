import Link from "next/link";

const items = [
  { href: "/os", label: "Overview" },
  { href: "/os/products", label: "Products" },
  { href: "/os/suppliers", label: "Suppliers" },
  { href: "/os/inventory", label: "Inventory" },
  { href: "/os/shipments", label: "Shipments" },
  { href: "/os/ppc", label: "PPC" },
  { href: "/os/analytics", label: "Analytics" },
  { href: "/os/finance", label: "Finance" },

];

export default function DesktopSidebar() {
  return (
    <aside
      className="hidden md:flex w-52 border-r border-white/5 flex-col py-6 px-3 sticky top-0 h-screen"
      style={{
        background: "#060b14",
      }}
    >
      <div className="flex items-center gap-2 px-3 mb-8">
        <div
          className="w-5 h-5 rounded-[4px]"
          style={{
            background:
              "linear-gradient(135deg, #a4bedc, #3b82c4)",
          }}
        />

        <span className="text-xs font-semibold text-white tracking-tight">
          NINAN OS
        </span>
      </div>

      <nav className="flex flex-col gap-1">
        {items.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            style={{
              fontSize: 13,
              color: "#ffffff",
              padding: "8px 12px",
              borderRadius: 8,
              textDecoration: "none",
              display: "block",
            }}
          >
            {item.label}
          </Link>
        ))}
      </nav>
    </aside>
  );
}