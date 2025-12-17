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

export const description = "A multiple bar chart";

const chartData = [
  { month: "January", inactiveUser: 80, activeUser: 186 },
  { month: "February", inactiveUser: 305, activeUser: 200 },
  { month: "March", inactiveUser: 237, activeUser: 120 },
  { month: "April", inactiveUser: 73, activeUser: 190 },
  { month: "May", inactiveUser: 209, activeUser: 130 },
  { month: "June", inactiveUser: 214, activeUser: 140 },
  { month: "July", inactiveUser: 214, activeUser: 140 },
  { month: "August", inactiveUser: 214, activeUser: 140 },
  { month: "Septermber", inactiveUser: 214, activeUser: 140 },
  { month: "October", inactiveUser: 214, activeUser: 140 },
  { month: "November", inactiveUser: 214, activeUser: 140 },
  { month: "December", inactiveUser: 214, activeUser: 140 },
];

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
            style={{ minWidth: chartData.length * 100 }}
          >
            <BarChart accessibilityLayer data={chartData}>
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
                dataKey="inactiveUser"
                fill="var(--color-inactiveUser)"
                radius={4}
              />
              <Bar
                dataKey="activeUser"
                fill="var(--color-activeUser)"
                radius={4}
              />
            </BarChart>
          </ChartContainer>
        </div>
      </CardContent>
    </Card>
  );
}
