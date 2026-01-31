"use client";

import { getTitleFromType } from "@/components/dashboard/AppSidebar/NotificationBell";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Spinner } from "@/components/ui/spinner";
import { cn } from "@/lib/utils";
import { useSocketState } from "@/redux/api/socket/useSocketState";
import { useGetAppNotificationsQuery } from "@/redux/features/app/notificationApis";
import { IAppNotificationItem } from "@/types/app/notification";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { Bell } from "lucide-react";
dayjs.extend(relativeTime);

export interface UINotification {
  id: string;
  title: string;
  message: string;
  type: string;
  createdAt: string;
  read: boolean;
}

export const mapAdminNotificationToUI = (
  item: IAppNotificationItem,
): UINotification => ({
  id: item.id,
  title: getTitleFromType(item.notification_event.type),
  message: item.notification_event.text,
  type: item.notification_event.type,
  createdAt: item.created_at,
  read: false,
});

export default function UserNotificationBell() {
  const { hasNewNotification, clearNotification } = useSocketState();
  const { data, isLoading } = useGetAppNotificationsQuery();

  const fetchedNotifications = data?.map(mapAdminNotificationToUI) ?? [];

  return (
    <DropdownMenu onOpenChange={(open) => open && clearNotification()}>
      <DropdownMenuTrigger asChild>
        <Button size="icon" className="rounded-full border-none">
          <div className="relative">
            <span
              className={cn(
                "bg-primary absolute top-0 right-0 hidden size-3 rounded-full border-2 border-white",
                { block: hasNewNotification },
              )}
            />
            {isLoading ? <Spinner /> : <Bell className="text-body-200" />}
          </div>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="z-300 w-80 p-0">
        <div className="flex items-center justify-between px-4 py-2 font-semibold">
          <span>Notifications</span>

          <span className="text-xs">{fetchedNotifications.length}</span>
        </div>
        <DropdownMenuSeparator />

        <div className="max-h-[320px] overflow-y-auto">
          {isLoading ? (
            <div className="text-muted-foreground px-4 py-6 text-center text-sm">
              Loading notifications…
            </div>
          ) : fetchedNotifications.length === 0 ? (
            <div className="text-muted-foreground px-4 py-6 text-center text-sm">
              No notifications
            </div>
          ) : (
            fetchedNotifications.map((n) => (
              <DropdownMenuItem
                key={n.id}
                className="flex cursor-pointer flex-col items-start gap-1 px-4 py-3"
              >
                <span className="text-sm font-medium">{n.title}</span>

                <span className="text-muted-foreground text-xs">
                  {n.message}
                </span>

                <span className="text-muted-foreground text-[11px]">
                  {dayjs(n.createdAt).fromNow()}
                </span>
              </DropdownMenuItem>
            ))
          )}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
