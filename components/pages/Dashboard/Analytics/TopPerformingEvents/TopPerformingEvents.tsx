"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getFormatedDate, isArrayEmpty } from "@/lib/utils";
import { useAdminGetTopPerformingEventsQuery } from "@/redux/features/admin/analyticsApis";

export default function TopPerformingEvents() {
  const { data, isLoading, isError } = useAdminGetTopPerformingEventsQuery();

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Top Performing Events</CardTitle>
      </CardHeader>

      <CardContent className="flex max-h-[408px] flex-1 flex-col gap-4 overflow-y-scroll pb-0">
        {isLoading ? (
          <p className="text-muted-foreground py-6 text-center text-sm">
            Loading...
          </p>
        ) : isError ? (
          <p className="text-destructive py-6 text-center text-sm">
            Failed to load top events
          </p>
        ) : !isArrayEmpty(data) ? (
          data?.map((item, index) => (
            <div
              key={item.title ?? index}
              className="flex gap-4 rounded bg-[#FDEBEF] px-2 py-2.5"
            >
              <div className="bg-primary text-primary-foreground flex size-12 items-center justify-center rounded-full">
                {index + 1}
              </div>

              <div className="mr-auto">
                <p className="text-heading-100">{item.title}</p>
                <p className="text-sm">{getFormatedDate(item?.event_date)}</p>
              </div>

              <div className="text-right">
                <p className="text-primary text-lg font-medium">
                  ${item.ticket_price}
                </p>
                <p className="text-xs">
                  {item.total_sold}/{item.sold_limit}
                </p>
              </div>
            </div>
          ))
        ) : (
          <p className="text-muted-foreground py-6 text-center text-sm">
            No events found
          </p>
        )}
      </CardContent>
    </Card>
  );
}
