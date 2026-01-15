import AdminRoute from "@/components/auth/AdminRoute";
import { AppSidebar } from "@/components/dashboard/AppSidebar/AppSidebar";
import AppSidebarHeader from "@/components/dashboard/AppSidebar/AppSidebarHeader";
import { SidebarProvider } from "@/components/ui/sidebar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <AdminRoute>
      <SidebarProvider>
        <AppSidebar />
        <main className="bg-background-2 w-full">
          <AppSidebarHeader />
          {children}
        </main>
      </SidebarProvider>
    </AdminRoute>
  );
}
