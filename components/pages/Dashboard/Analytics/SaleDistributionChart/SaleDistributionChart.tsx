"use client";

import { Label, Pie, PieChart } from "recharts";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import { useAdminGetSaleDistributionPieChartQuery } from "@/redux/features/admin/analyticsApis";

const chartConfig = {
  coin: {
    label: "Sugo Coin",
    color: "var(--chart-1)",
  },
  ticket: {
    label: "Event Ticket",
    color: "var(--chart-3)",
  },
} satisfies ChartConfig;

export default function SaleDistributionChart() {
  const { data, isLoading, isError } =
    useAdminGetSaleDistributionPieChartQuery();

  const chartData = [
    {
      product: "coin",
      label: "Sugo Coin",
      value: data?.coin?.percentage ?? 0,
      fill: "var(--chart-1)",
    },
    {
      product: "ticket",
      label: "Event Ticket",
      value: data?.event_ticket?.percentage ?? 0,
      fill: "var(--chart-3)",
    },
  ];

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Sale Distribution</CardTitle>
      </CardHeader>

      <CardContent className="flex-1 pb-0">
        {isLoading ? (
          <div className="text-muted-foreground flex h-[250px] items-center justify-center text-sm">
            Loading...
          </div>
        ) : isError ? (
          <div className="text-destructive flex h-[250px] items-center justify-center text-sm">
            Failed to load data
          </div>
        ) : (
          <ChartContainer
            config={chartConfig}
            className="mx-auto aspect-square max-h-[250px]"
          >
            <PieChart>
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent hideLabel />}
              />

              <Pie
                data={chartData}
                dataKey="value"
                nameKey="product"
                innerRadius={82}
                outerRadius={110}
                paddingAngle={4} // space between slices
                cornerRadius={3} // rounded ends
              >
                <Label
                  content={({ viewBox }) => {
                    if (!viewBox || !("cx" in viewBox) || !("cy" in viewBox)) {
                      return null;
                    }
                    const { cx, cy } = viewBox;

                    return <circle cx={cx} cy={cy} r={64} fill="#F8C0CC" />;
                  }}
                />
              </Pie>
            </PieChart>
          </ChartContainer>
        )}
      </CardContent>

      <CardFooter className="flex-col items-stretch gap-1">
        {chartData.map((item, index) => (
          <div
            key={index}
            className="flex items-center justify-between gap-1.5"
          >
            <div
              style={{ backgroundColor: item.fill }}
              className="bg-sidebar-border size-3 rounded-full"
            />
            <p className="text-heading-100 mr-auto text-xs font-medium">
              {item.label}
            </p>
            <p className="text-body-200 text-xs font-medium">{item.value}%</p>
          </div>
        ))}
      </CardFooter>
    </Card>
  );
}
