type ButtonProps = {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "secondary";
};

export default function Button({
  href,
  children,
  variant = "primary",
}: ButtonProps) {
  const styles =
    variant === "primary"
      ? "bg-[#1d4f8f] text-white hover:bg-[#163b6b] shadow-blue-900/10"
      : "bg-white text-slate-900 border border-slate-200 hover:border-blue-300";

  return (
    <a
      href={href}
      className={`inline-flex items-center justify-center rounded-full px-7 py-4 text-sm font-semibold shadow-lg transition ${styles}`}
    >
      {children}
    </a>
  );
}