import Sidebar from "@/components/pages/Profile/Sidebar/Sidebar";

export default function ProfileDashboardLayout({
  children,
}: React.PropsWithChildren) {
  return (
    <div className="custom-container flex w-full flex-col gap-4 lg:flex-row lg:items-start lg:gap-12">
      <aside className="top-0 -mx-3 pt-24 lg:sticky lg:mx-0 lg:pt-30">
        <Sidebar />
      </aside>
      <div className="flex-1 pb-10 lg:pt-30">{children}</div>
    </div>
  );
}
