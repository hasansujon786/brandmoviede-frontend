"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetRecentOrdersQuery } from "@/redux/api";
import { IOrderItem } from "@/types";
import { formatDistanceToNow } from "date-fns";

export default function RecentOrderList() {
  const { data, isLoading } = useGetRecentOrdersQuery();

  return (
    <Card>
      <CardHeader className="flex items-center gap-2 space-y-0 sm:flex-row">
        <CardTitle>Recent Orders</CardTitle>
      </CardHeader>
      <CardContent className="h-full max-h-[340px] space-y-3 overflow-y-scroll">
        {isLoading ? (
          Array.from({ length: 4 }).map((_, index) => (
            <RecentOrderItemSkeleton key={index} />
          ))
        ) : Array.isArray(data) && data.length ? (
          data?.map((item) => <RecentOrderListItem {...item} key={item.id} />)
        ) : (
          <div className="grid h-full place-items-center">
            <p className="text-muted-foreground -mt-12 text-center text-sm">
              There are no recent orders to display
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

function RecentOrderListItem(props: IOrderItem) {
  return (
    <div className="rounded-2lg space-y-2 bg-[#F8FAFB] p-3">
      <div className="font-heading text-heading-100 flex items-center justify-between text-base font-medium">
        <h6>{props.user_name}</h6>
        <h6>{props.amount}</h6>
      </div>
      <div className="text-body-200 flex items-center justify-between text-sm">
        <h6>{props.type}</h6>
        <h6>
          {/* fix: there is no date */}
          {props?.created_at
            ? formatDistanceToNow(new Date(props?.created_at), {
                addSuffix: true,
              })
            : ""}
        </h6>
      </div>
    </div>
  );
}

function RecentOrderItemSkeleton() {
  return (
    <div>
      <div className="rounded-2lg space-y-2 bg-[#F8FAFB] p-3">
        <div className="grid grid-cols-[3fr_1fr] gap-x-8">
          <Skeleton className="h-6 w-4/5" />
          <Skeleton className="h-6 w-4/5" />
        </div>

        <div className="grid grid-cols-2 gap-x-8">
          <Skeleton className="h-5" />
          <Skeleton className="h-5" />
        </div>
      </div>
    </div>
  );
}
