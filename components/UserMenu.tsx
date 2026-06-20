"use client";

import { signOut } from "next-auth/react";

export default function UserMenu({
  name,
  email,
}: {
  name?: string | null;
  email?: string | null;
}) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-end",
        gap: 12,
        padding: "10px 24px",
        borderBottom: "1px solid rgba(255,255,255,0.06)",
        fontFamily: "'DM Mono', monospace",
        fontSize: 12,
      }}
    >
      <span style={{ color: "#94a3b8" }}>
        {name || email}
      </span>
      <button
        onClick={() => signOut({ callbackUrl: "/login" })}
        style={{
          background: "rgba(239,68,68,0.1)",
          border: "1px solid rgba(239,68,68,0.3)",
          borderRadius: 6,
          color: "#ef4444",
          padding: "4px 10px",
          fontSize: 11,
          fontFamily: "'DM Mono', monospace",
          cursor: "pointer",
        }}
      >
        Cerrar sesión
      </button>
    </div>
  );
}