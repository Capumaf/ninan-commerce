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
      ? "bg-blue-700 text-white hover:bg-blue-800"
      : "bg-white text-slate-900 border border-slate-200 hover:border-blue-300";

  return (
    <a
      href={href}
      className={`inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-semibold shadow-sm transition ${styles}`}
    >
      {children}
    </a>
  );
}