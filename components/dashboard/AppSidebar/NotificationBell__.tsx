import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { getTitleFromType } from "@/redux/api/socket/SocketProvider";
import { useSocketState } from "@/redux/api/socket/useSocketState";
import { useGetAdminNotificationsQuery } from "@/redux/features/admin/nofiticationApis";
import { IAdminNotificationItem } from "@/types";
import { Bell } from "lucide-react";

export interface UINotification {
  id: string;
  title: string;
  message: string;
  type: string;
  createdAt: string;
  read: boolean;
}

export const mapAdminNotificationToUI = (
  item: IAdminNotificationItem,
): UINotification => ({
  id: item.id,
  title: getTitleFromType(item.notification_event.type),
  message: item.notification_event.text,
  type: item.notification_event.type,
  createdAt: item.created_at,
  read: false,
});

export default function NotificationBell() {
  const {
    hasNewNotification,
    clearNotification,
    notifications, // ← array
  } = useSocketState();
  const { data, isLoading } = useGetAdminNotificationsQuery();

  const fetchedNotifications = data?.map(mapAdminNotificationToUI);
  console.log("fetchedNotifications", fetchedNotifications);

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
            <Bell className="text-body-200" />
          </div>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-80 p-0">
        <div className="px-4 py-2 font-semibold">Notifications</div>
        <DropdownMenuSeparator />

        <div className="max-h-[calc(64*5px)] overflow-y-scroll">
          {notifications.length === 0 ? (
            <div className="text-muted-foreground px-4 py-6 text-center text-sm">
              No new notifications
            </div>
          ) : (
            notifications.map((n, i) => (
              <DropdownMenuItem
                key={i}
                className="flex cursor-pointer flex-col items-start gap-1 px-4 py-3"
              >
                <span className="text-sm font-medium">{n.title}</span>
                <span className="text-muted-foreground text-xs">
                  {n.message}
                </span>
              </DropdownMenuItem>
            ))
          )}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
