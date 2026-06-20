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
      ? "bg-white text-slate-900 border border-slate-300 hover:border-slate-400 shadow-sm"
      : "bg-white text-slate-900 border border-slate-200 hover:border-blue-300";

  return (
    <a
      href={href}
      className={`inline-flex items-center justify-center rounded-full px-7 py-4 text-sm font-semibold transition ${styles}`}
    >
      {children}
    </a>
  );
}