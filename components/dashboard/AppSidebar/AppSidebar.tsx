import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import Image from "next/image";
import Link from "next/link";
import {
  AnalyticsIcon,
  DashboardIcon,
  DoubleCoinIcon,
  SettingsIcon,
  SignOutIcon,
  TicketIcon,
} from "./AppSidebarIcons";

const links = [
  { title: "Dashboard", icon: DashboardIcon, url: "/dashboard" },
  { title: "Sugo Coin Management", icon: DoubleCoinIcon, url: "/dashboard" },
  { title: "Event Ticket Management", icon: TicketIcon, url: "/dashboard" },
  { title: "Analytics & insights", icon: AnalyticsIcon, url: "/dashboard" },
  { title: "Settings", icon: SettingsIcon, url: "/dashboard" },
];

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarHeader className="">
        <div className="flex items-center justify-center border-b border-b-[#F8C0CC] py-3">
          <Image
            alt=""
            width={136}
            height={45}
            src="/images/dashboard/header-logo.png"
          />
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {links.map((item, index) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton isActive={index == 0} size="lg" asChild>
                    <Link href={item.url}>
                      <span>
                        <item.icon className="size-6" />
                      </span>
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <SidebarMenuButton
          variant="destractive"
          className="h-12"
          size="lg"
          asChild
        >
          <Link href="#">
            <span>
              <SignOutIcon className="size-6" />
            </span>
            <span>Log Out</span>
          </Link>
        </SidebarMenuButton>
      </SidebarFooter>
    </Sidebar>
  );
}
