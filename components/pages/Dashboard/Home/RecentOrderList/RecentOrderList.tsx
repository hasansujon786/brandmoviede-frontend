"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetRecentOrdersQuery } from "@/redux/api";
import { formatDistanceToNow } from "date-fns";

export default function RecentOrderList() {
  const { data, isLoading } = useGetRecentOrdersQuery();

  return (
    <Card>
      <CardHeader className="flex items-center gap-2 space-y-0 sm:flex-row">
        <CardTitle>Recent Orders</CardTitle>
      </CardHeader>
      <CardContent className="max-h-[340px] space-y-3 overflow-y-scroll">
        {isLoading
          ? Array.from({ length: 4 }).map((_, index) => (
              <RecentOrderItemSkeleton key={index} />
            ))
          : Array.isArray(data)
            ? data?.map((item, index) => (
                <div
                  key={index}
                  className="rounded-2lg space-y-2 bg-[#F8FAFB] p-3"
                >
                  <div className="font-heading text-heading-100 flex items-center justify-between text-base font-medium">
                    <h6>{item.user_name}</h6>
                    <h6>{item.amount}</h6>
                  </div>
                  <div className="text-body-200 flex items-center justify-between text-sm">
                    <h6>{item.type}</h6>
                    <h6>
                      {formatDistanceToNow(new Date(item.created_at), {
                        addSuffix: true,
                      })}
                    </h6>
                  </div>
                </div>
              ))
            : null}
      </CardContent>
    </Card>
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
