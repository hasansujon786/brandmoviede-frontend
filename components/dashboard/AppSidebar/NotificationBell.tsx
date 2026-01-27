import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useSocketState } from "@/redux/api/socket/useSocketState";
import { Bell } from "lucide-react";

export default function NotificationBell() {
  const { hasNewNotification, clearNotification } = useSocketState();

  return (
    <Button
      onClick={clearNotification}
      size="icon"
      className="cursor-pointer border-none"
    >
      <div className="relative">
        <span
          className={cn(
            "bg-primary absolute top-0 right-0 box-content hidden size-2 rounded-full border-2 border-white",
            {
              block: hasNewNotification,
            },
          )}
        />
        <Bell className="text-body-200" />
      </div>
    </Button>
  );
}
