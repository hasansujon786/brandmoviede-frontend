import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/dashboard/AppSidebar/AppSidebar";
import AppSidebarHeader from "@/components/dashboard/AppSidebar/AppSidebarHeader";
import ProtectedRoute from "@/components/auth/ProtectedRoute";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <ProtectedRoute>
      <SidebarProvider>
        <AppSidebar />
        <main className="bg-background-2 w-full">
          <AppSidebarHeader />
          {children}
        </main>
      </SidebarProvider>
    </ProtectedRoute>
  );
}
