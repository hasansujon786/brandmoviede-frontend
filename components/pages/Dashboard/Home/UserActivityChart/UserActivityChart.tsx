"use client";

import { TrendingUp } from "lucide-react";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import { createPortal } from "react-dom";
import { useEffect, useLayoutEffect, useRef, useState } from "react";

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

export default function ChartBarMultiple() {
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

export const CustomLegend = ({ config }: { config: ChartConfig }) => {
  const items = Object.keys(config).map((k) => config[k]);

  if (!items?.length) {
    return null;
  }

  return (
    <div className="flex gap-4">
      {items.map((item, index) => (
        <div key={index} className="flex items-center justify-center gap-1.5">
          <div
            style={{ backgroundColor: item.color }}
            className="bg-sidebar-border size-3 rounded-full"
          />
          <p className="text-body-200 text-xs font-medium">{item.label}</p>
        </div>
      ))}
    </div>
  );
};
