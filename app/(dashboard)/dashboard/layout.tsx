import { SidebarProvider  } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/dashboard/AppSidebar/AppSidebar";
import AppSidebarHeader from "@/components/dashboard/AppSidebar/AppSidebarHeader";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="bg-background-2 w-full">
        <AppSidebarHeader />
        {children}
      </main>
    </SidebarProvider>
  );
}
