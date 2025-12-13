import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/dashboard/AppSidebar/AppSidebar";
import { Input } from "@/components/ui/input";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="bg-background-2 w-full">
        <nav className="border-sidebar-border flex h-20 items-center justify-between border-b bg-white px-4">
          <div className="text-heading-100 flex items-center gap-1">
            <SidebarTrigger />
            <h3 className="font-heading text-2xl font-medium">Dashboard</h3>

            <Input className="bg-[#FFEBF8]/30 border-[#FFEBF8] h-9 rounded-2xl" />
          </div>
        </nav>
        {children}
      </main>
    </SidebarProvider>
  );
}
