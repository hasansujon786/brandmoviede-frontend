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
import { useGetAdminNotificationsQuery } from "@/redux/features/admin/nofiticationApis";
import { IAdminNotificationItem } from "@/types";
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

const formatTitle = (str: string) =>
  str.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());

export const getTitleFromType = (type: string) => {
  switch (type) {
    case "ticket_purchase":
      return "Ticket Purchase";
    case "owner_coin_low":
      return "Low balance";
    case "payment_done":
      return "Payment successful";
    case "coin_purchase":
      return "Coins Purchased";
    case "client_coin_purchase":
      return "Coins Purchased";
    case "client_coin_purchase_failed":
      return "Coins Purchase Failed";
    default:
      return formatTitle(type) || "Notification";
  }
};

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
  const { hasNewNotification, clearNotification } = useSocketState();
  const { data, isLoading } = useGetAdminNotificationsQuery();

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

      <DropdownMenuContent align="end" className="w-80 p-0">
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
