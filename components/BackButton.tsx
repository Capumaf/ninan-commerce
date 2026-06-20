"use client";

import { useRouter } from "next/navigation";

export default function BackButton() {
  const router = useRouter();

  return (
    <button
      onClick={() => router.back()}
      className="mb-6 text-sm text-blue-400 hover:text-blue-300 transition-colors"
    >
      ← Back
    </button>
  );
}