import DesktopSidebar from "@/components/DesktopSidebar";
import MobileSidebar from "@/components/MobileSidebar";

export default function OSLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      className="flex min-h-screen bg-[#060b14]"
      style={{
        fontFamily: "'DM Sans', system-ui, sans-serif",
      }}
    >
      <DesktopSidebar />

      <div className="flex-1 flex flex-col">
        <MobileSidebar />

        <main className="flex-1 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
}