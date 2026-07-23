import { SidebarProvider } from "@/components/ui/sidebar";
import { getAllplaygroundForUser } from "@/modules/dashboard/actions";
import { DashboardSidebar } from "@/modules/dashboard/components/dashboard-sidebar";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const playgroundData = await getAllplaygroundForUser();
  const technologIconMap: Record<string, string> = {
    REACT: "Zap",
    NEXTJS: "Lightbulb",
    EXPRESS: "Database",
    VUE: "Compass",
    HONO: "FlameIcon",
    ANGULAR: "Terminal",
  };
  const formatedPlaygroundData = playgroundData?.map((item) => ({
    id: item.id,
    name: item.title,
    starred: item.starMark?.[0]?.isMarked || false,
    icon: technologIconMap[item.template] || "Code2",
  }));
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full overflow-x-hidden">
        {/* Dashboard Sidebar */}
        {/*@ts-expect-error i will resolve */}
        <DashboardSidebar initialPlaygroundData={formatedPlaygroundData} />
        <main className="flex-1">{children}</main>
      </div>
    </SidebarProvider>
  );
}
