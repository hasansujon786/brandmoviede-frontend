"use client";

import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  CustomLegend,
  type ChartConfig,
} from "@/components/ui/chart";

export const description = "An interactive area chart";

export const chartData = [
  { month: "January", y1: 420, y2: 680 },
  { month: "February", y1: 980, y2: 740 },
  { month: "March", y1: 760, y2: 520 },
  { month: "April", y1: 310, y2: 860 },
  { month: "May", y1: 690, y2: 610 },
  { month: "June", y1: 840, y2: 720 },
  { month: "July", y1: 1120, y2: 890 },
  { month: "August", y1: 640, y2: 560 },
  { month: "September", y1: 780, y2: 690 },
  { month: "October", y1: 950, y2: 830 },
  { month: "November", y1: 720, y2: 660 },
  { month: "December", y1: 1180, y2: 920 },
];

const chartConfig = {
  y1: {
    label: "2025",
    color: "var(--chart-3)",
  },
  y2: {
    label: "2024",
    color: "var(--chart-1)",
  },
} satisfies ChartConfig;

export default function MonthlyRevenueChart() {
  return (
    <Card>
      <CardHeader className="flex items-center justify-between">
        <CardTitle>Monthly Revenue Comparison</CardTitle>
        <CustomLegend config={chartConfig} />
      </CardHeader>

      <CardContent className="mt-auto pl-0">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[250px] w-full"
        >
          <AreaChart data={chartData}>
            <defs>
              <linearGradient id="fillDesktop" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="0%"
                  stopColor="var(--color-y1)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="40%"
                  stopColor="var(--color-y1)"
                  stopOpacity={0.45}
                />
                <stop
                  offset="75%"
                  stopColor="var(--color-y1)"
                  stopOpacity={0.15}
                />
                <stop
                  offset="100%"
                  stopColor="var(--color-y1)"
                  stopOpacity={0.02}
                />
              </linearGradient>
              <linearGradient id="fillMobile" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="0%"
                  stopColor="var(--color-y2)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="40%"
                  stopColor="var(--color-y2)"
                  stopOpacity={0.45}
                />
                <stop
                  offset="75%"
                  stopColor="var(--color-y2)"
                  stopOpacity={0.15}
                />
                <stop
                  offset="100%"
                  stopColor="var(--color-y2)"
                  stopOpacity={0.02}
                />
              </linearGradient>
            </defs>
            <CartesianGrid
              stroke="var(--sidebar-border)"
              strokeDasharray="4 4"
              vertical={false}
            />
            <YAxis
              // domain={[0, 1200]}
              // tickCount={7}
              // tickFormatter={(value) => `$${value}`}
              tickLine={false}
              axisLine={false}
              tickMargin={8}
            />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={{
                // fill: "red !important",
                strokeDasharray: "4 4",
                strokeWidth: 1,
              }}
              content={
                <ChartTooltipContent
                  labelClassName="text-primary"
                  labelFormatter={(value) => value}
                  indicator="dot"
                />
              }
            />
            <Area
              dataKey="y2"
              type="natural"
              fill="url(#fillMobile)"
              stroke="var(--color-y2)"
              stackId="a"
              strokeWidth={3}
              activeDot={{
                r: 6,
                fill: "var(--primary)",
                stroke: "white",
                strokeWidth: 2,
              }}
            />
            <Area
              dataKey="y1"
              type="natural"
              fill="url(#fillDesktop)"
              stroke="var(--color-y1)"
              stackId="a"
              strokeWidth={3}
              activeDot={{
                r: 6,
                fill: "var(--color-y1)",
                stroke: "white",
                strokeWidth: 2,
              }}
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
