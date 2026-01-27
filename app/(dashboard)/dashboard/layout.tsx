import AdminRoute from "@/components/auth/AdminRoute";
import { AppSidebar } from "@/components/dashboard/AppSidebar/AppSidebar";
import AppSidebarHeader from "@/components/dashboard/AppSidebar/AppSidebarHeader";
import { SidebarProvider } from "@/components/ui/sidebar";
import { SocketProvider } from "@/redux/api/socket/SocketProvider";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <AdminRoute>
      <SocketProvider>
        <SidebarProvider>
          <AppSidebar />
          <main className="bg-background-2 w-full">
            <AppSidebarHeader />
            {children}
          </main>
        </SidebarProvider>
      </SocketProvider>
    </AdminRoute>
  );
}
