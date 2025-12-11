import Sidebar from "@/components/pages/Profile/Sidebar/Sidebar";

export default function ProfileDashboardLayout({
  children,
}: React.PropsWithChildren) {
  return (
    <div className="custom-container flex w-full gap-12 pt-30 py-8">
      <div>
        <Sidebar />
      </div>
      <div className="flex-1">{children}</div>
    </div>
  );
}
