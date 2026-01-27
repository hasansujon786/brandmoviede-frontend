"use client";

import { ChevronDown } from "@/components/shared/icons/chevron";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetMeQuery } from "@/redux/api";
import { SearchIcon } from "lucide-react";
import NotificationBell from "./NotificationBell";

export default function AppSidebarHeader() {
  return (
    <header className="border-sidebar-border sticky top-0 z-10 flex h-20 items-center justify-between border-b bg-white px-4">
      <div className="text-heading-100 flex items-center gap-2">
        <SidebarTrigger />
        <h3 className="font-heading text-2xl font-medium">Dashboard</h3>
      </div>

      <div className="ml-auto flex items-center gap-2">
        <InputGroup className="h-9 w-[180px] rounded-2xl border-[#FFEBF8] bg-[#FFEBF8]/30">
          <InputGroupInput
            placeholder="Search..."
            className="placeholder:text-[#D2D2D5]"
          />
          <InputGroupAddon>
            <SearchIcon className="text-[#A5A5AB]" />
          </InputGroupAddon>
        </InputGroup>

        <NotificationBell />

        <DropdownMenu>
          <DropdownMenuTrigger>
            <div className="flex items-center gap-2">
              <UserInfo />
              <ChevronDown className="text-heading-100 size-6" />
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="relative z-100">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem>Billing</DropdownMenuItem>
            <DropdownMenuItem>Team</DropdownMenuItem>
            <DropdownMenuItem>Subscription</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}

const UserInfo = () => {
  const { data, isLoading } = useGetMeQuery();

  if (isLoading) {
    return (
      <div className="space-y-2">
        <Skeleton className="h-3 w-[100px]" />
        <Skeleton className="h-2 w-20" />
      </div>
    );
  }

  return (
    <div className="flex flex-col text-left whitespace-nowrap">
      <span className="text-heading-100 text-base font-medium">
        {data?.name}
      </span>
      <span className="text-xs capitalize">{data?.type}</span>
    </div>
  );
};
