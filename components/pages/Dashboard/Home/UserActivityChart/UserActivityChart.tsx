"use client";

import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  CustomLegend,
  type ChartConfig,
} from "@/components/ui/chart";
import { useGetUserActivityChartDataQuery } from "@/redux/api";

export const description = "A multiple bar chart";

const chartConfig: ChartConfig = {
  inactiveUser: {
    label: "Inactive User",
    color: "var(--chart-2)",
  },
  activeUser: {
    label: "Active User",
    color: "var(--chart-1)",
  },
};

export default function UserActivityChart() {
  const { data } = useGetUserActivityChartDataQuery();

  return (
    <Card className="overflow-x-hidden">
      <CardHeader className="flex items-center justify-between">
        <CardTitle>User Activity</CardTitle>
        <CustomLegend config={chartConfig} />
      </CardHeader>
      <CardContent className="grid">
        <div className="overflow-x-auto">
          <ChartContainer
            config={chartConfig}
            className="h-[200px] w-full"
            style={{
              minWidth: (Array.isArray(data) && data.length * 100) || 0,
            }}
          >
            <BarChart accessibilityLayer data={data}>
              <CartesianGrid
                stroke="var(--sidebar-border)"
                strokeDasharray="4 4"
                vertical={false}
              />
              <XAxis
                dataKey="month"
                tickLine={false}
                tickMargin={10}
                axisLine={false}
                tickFormatter={(value) => value.slice(0, 3)}
              />
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent indicator="dot" />}
              />
              <Bar
                dataKey="inactive"
                fill="var(--color-inactiveUser)"
                radius={4}
              />
              <Bar dataKey="active" fill="var(--color-activeUser)" radius={4} />
            </BarChart>
          </ChartContainer>
        </div>
      </CardContent>
    </Card>
  );
}
