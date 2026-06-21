"use client";

import { useState } from "react";
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

export default function MobileSidebar() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="md:hidden sticky top-0 z-50 bg-[#060b14]/95 backdrop-blur-md border-b border-white/5">
        <div className="flex items-center justify-between px-4 py-3">
          <button
            onClick={() => setOpen(!open)}
            className="text-white text-xl"
          >
            {open ? "✕" : "☰"}
          </button>

          <span className="text-sm font-semibold text-white tracking-tight">
            NINAN OS
          </span>

          <div className="w-5" />
        </div>

        <div
          className={`overflow-hidden transition-all duration-300 ${
            open ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <nav className="px-4 pb-4 flex flex-col gap-1 border-t border-white/5">
            {items.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="px-3 py-3 rounded-xl text-sm hover:bg-white/5 transition-colors"
                style={{
                  color: "#ffffff",
                  textDecoration: "none",
                }}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>

      {open && (
        <div
          className="md:hidden fixed inset-0 top-[57px] bg-black/20 backdrop-blur-sm -z-10"
          onClick={() => setOpen(false)}
        />
      )}
    </>
  );
}