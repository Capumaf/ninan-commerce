import DesktopSidebar from "@/components/DesktopSidebar";
import MobileSidebar from "@/components/MobileSidebar";
import UserMenu from "@/components/UserMenu";
import { auth } from "@/lib/auth";

export default async function OSLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

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

        <UserMenu
          name={session?.user?.name}
          email={session?.user?.email}
        />

        <main className="flex-1 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
}