import UserRoute from "@/components/auth/UserRoute";
import Sidebar from "@/components/pages/Profile/Sidebar/Sidebar";

export default function ProfileDashboardLayout({
  children,
}: React.PropsWithChildren) {
  return (
    <UserRoute>
      <div className="navbar-padding">
        <div className="lg:custom-container grid max-w-none gap-4 lg:grid-cols-[200px_1fr] lg:gap-12 lg:pt-8">
          <Sidebar />
          <div className="custom-container flex-1 pb-10 lg:px-0!">
            {children}
          </div>
        </div>
      </div>
    </UserRoute>
  );
}
