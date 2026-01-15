"use client";

import * as React from "react";
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { TrendingUp } from "lucide-react";
import TimeRangeSelector from "@/components/shared/TimeRangeSelector/TimeRangeSelector";
import { useGetSalesAnalyticsChartDataQuery } from "@/redux/api";

export const description = "An interactive area chart";

const chartData = [
  { date: "2024-04-01", month: "Jan", income: 520 },
  { date: "2024-04-02", month: "Feb", income: 480 },
  { date: "2024-04-02", month: "Mar", income: 610 },
  { date: "2024-04-03", month: "Apr", income: 560 },
  { date: "2024-04-04", month: "May", income: 720 },
  { date: "2024-04-05", month: "Jun", income: 980 },
  { date: "2024-04-05", month: "Jul", income: 760 },
  { date: "2024-04-06", month: "Aug", income: 690 },
  { date: "2024-04-07", month: "Sep", income: 820 },
  { date: "2024-04-08", month: "Oct", income: 540 },
  { date: "2024-04-09", month: "Nov", income: 460 },
  { date: "2024-04-09", month: "Dec", income: 580 },
];

const chartConfig = {
  income: {
    label: "Income",
    color: "var(--chart-1)",
  },
} satisfies ChartConfig;

export default function SalesAnalyticsChart() {
  const { data, isLoading } = useGetSalesAnalyticsChartDataQuery();
  const [timeRange, setTimeRange] = React.useState("90d");

  const filteredData = chartData.filter((item) => {
    const date = new Date(item.date);
    const referenceDate = new Date("2024-06-30");
    let daysToSubtract = 90;
    if (timeRange === "30d") {
      daysToSubtract = 30;
    } else if (timeRange === "7d") {
      daysToSubtract = 7;
    }
    const startDate = new Date(referenceDate);
    startDate.setDate(startDate.getDate() - daysToSubtract);
    return date >= startDate;
  });

  return (
    <Card className="h-full">
      <CardHeader className="flex items-center gap-2">
        <CardTitle>Sales Analytics</CardTitle>

        <TimeRangeSelector value={timeRange} onValueChange={setTimeRange} />
      </CardHeader>

      <CardContent className="mt-auto pl-0">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[250px] w-full"
        >
          <AreaChart data={filteredData}>
            <defs>
              <linearGradient id="fillIncome" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="0%"
                  stopColor="var(--color-pink-400)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="40%"
                  stopColor="var(--color-pink-400)"
                  stopOpacity={0.45}
                />
                <stop
                  offset="75%"
                  stopColor="var(--color-pink-400)"
                  stopOpacity={0.15}
                />
                <stop
                  offset="100%"
                  stopColor="var(--color-pink-400)"
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
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) => {
                const date = new Date(value);
                return date.toLocaleDateString("en-US", {
                  month: "long",
                  day: "numeric",
                });
              }}
            />
            <ChartTooltip
              wrapperClassName="bg-red-600"
              // cursor={true}
              cursor={{
                // fill: "red !important",
                strokeDasharray: "4 4",
                strokeWidth: 1,
              }}
              content={
                <ChartTooltipContent
                  formatter={(value, name) => {
                    return (
                      <div className="flex w-full items-center gap-1">
                        <TrendingUp className="size-3 text-green-500" />
                        <span className="capitalize">{name}</span>
                        <span className="mr-1 ml-auto">:</span>
                        <span>${value}</span>
                      </div>
                    );
                  }}
                  labelClassName="text-primary"
                  labelFormatter={(value) => {
                    return new Date(value).toLocaleDateString("en-US", {
                      month: "long",
                      year: "numeric",
                    });
                  }}
                  indicator="dot"
                />
              }
            />
            {/* <Area */}
            {/*   dataKey="mobile" */}
            {/*   type="natural" */}
            {/*   fill="url(#fillMobile)" */}
            {/*   stroke="var(--color-mobile)" */}
            {/*   stackId="a" */}
            {/* /> */}
            <Area
              dataKey="income"
              type="natural"
              fill="url(#fillIncome)"
              stroke="var(--color-income)"
              strokeWidth={3}
              stackId="a"
              activeDot={{
                r: 6,
                fill: "var(--primary)",
                stroke: "white",
                strokeWidth: 2,
              }}
            />
            {/* <ChartLegend content={<ChartLegendContent />} /> */}
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
