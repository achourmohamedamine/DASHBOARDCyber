"use client";

import * as React from "react";

import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";

import { Card, CardAction, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { useIsMobile } from "@/hooks/use-mobile";

const chartData = [
  { time: "00:00", logs: 145 },
  { time: "00:15", logs: 178 },
  { time: "00:30", logs: 132 },
  { time: "00:45", logs: 189 },
  { time: "01:00", logs: 156 },
  { time: "01:15", logs: 201 },
  { time: "01:30", logs: 167 },
  { time: "01:45", logs: 143 },
  { time: "02:00", logs: 198 },
  { time: "02:15", logs: 234 },
  { time: "02:30", logs: 187 },
  { time: "02:45", logs: 221 },
  { time: "03:00", logs: 176 },
  { time: "03:15", logs: 209 },
  { time: "03:30", logs: 192 },
  { time: "03:45", logs: 245 },
  { time: "04:00", logs: 267 },
  { time: "04:15", logs: 289 },
  { time: "04:30", logs: 312 },
  { time: "04:45", logs: 298 },
  { time: "05:00", logs: 334 },
  { time: "05:15", logs: 356 },
  { time: "05:30", logs: 387 },
  { time: "05:45", logs: 401 },
  { time: "06:00", logs: 423 },
  { time: "06:15", logs: 445 },
  { time: "06:30", logs: 467 },
  { time: "06:45", logs: 489 },
  { time: "07:00", logs: 512 },
  { time: "07:15", logs: 534 },
  { time: "07:30", logs: 556 },
  { time: "07:45", logs: 578 },
  { time: "08:00", logs: 601 },
  { time: "08:15", logs: 623 },
  { time: "08:30", logs: 645 },
  { time: "08:45", logs: 667 },
  { time: "09:00", logs: 689 },
  { time: "09:15", logs: 712 },
  { time: "09:30", logs: 734 },
  { time: "09:45", logs: 756 },
  { time: "10:00", logs: 778 },
  { time: "10:15", logs: 801 },
  { time: "10:30", logs: 823 },
  { time: "10:45", logs: 845 },
  { time: "11:00", logs: 867 },
  { time: "11:15", logs: 889 },
  { time: "11:30", logs: 912 },
  { time: "11:45", logs: 934 },
  { time: "12:00", logs: 956 },
  { time: "12:15", logs: 943 },
  { time: "12:30", logs: 921 },
  { time: "12:45", logs: 898 },
  { time: "13:00", logs: 876 },
  { time: "13:15", logs: 854 },
  { time: "13:30", logs: 831 },
  { time: "13:45", logs: 809 },
  { time: "14:00", logs: 787 },
  { time: "14:15", logs: 765 },
  { time: "14:30", logs: 742 },
  { time: "14:45", logs: 720 },
  { time: "15:00", logs: 698 },
  { time: "15:15", logs: 676 },
  { time: "15:30", logs: 653 },
  { time: "15:45", logs: 631 },
  { time: "16:00", logs: 609 },
  { time: "16:15", logs: 587 },
  { time: "16:30", logs: 564 },
  { time: "16:45", logs: 542 },
  { time: "17:00", logs: 520 },
  { time: "17:15", logs: 498 },
  { time: "17:30", logs: 475 },
  { time: "17:45", logs: 453 },
  { time: "18:00", logs: 431 },
  { time: "18:15", logs: 409 },
  { time: "18:30", logs: 386 },
  { time: "18:45", logs: 364 },
  { time: "19:00", logs: 342 },
  { time: "19:15", logs: 320 },
  { time: "19:30", logs: 297 },
  { time: "19:45", logs: 275 },
  { time: "20:00", logs: 253 },
  { time: "20:15", logs: 231 },
  { time: "20:30", logs: 208 },
  { time: "20:45", logs: 186 },
  { time: "21:00", logs: 164 },
  { time: "21:15", logs: 142 },
  { time: "21:30", logs: 119 },
  { time: "21:45", logs: 97 },
  { time: "22:00", logs: 123 },
  { time: "22:15", logs: 145 },
  { time: "22:30", logs: 167 },
  { time: "22:45", logs: 189 },
  { time: "23:00", logs: 156 },
  { time: "23:15", logs: 134 },
  { time: "23:30", logs: 112 },
  { time: "23:45", logs: 134 },
];

const chartConfig = {
  logs: {
    label: "Logs",
    color: "var(--chart-1)",
  },
} satisfies ChartConfig;

export function ChartAreaInteractive() {
  const isMobile = useIsMobile();
  const [timeRange, setTimeRange] = React.useState("24h");

  React.useEffect(() => {
    if (isMobile) {
      setTimeRange("6h");
    }
  }, [isMobile]);

  const filteredData = React.useMemo(() => {
    let dataPoints = chartData.length;
    if (timeRange === "12h") {
      dataPoints = Math.floor(chartData.length / 2);
    } else if (timeRange === "6h") {
      dataPoints = Math.floor(chartData.length / 4);
    }
    return chartData.slice(-dataPoints);
  }, [timeRange]);

  return (
    <Card className="@container/card">
      <CardHeader>
        <CardTitle>Logs Per Minute</CardTitle>
        <CardDescription>
          <span className="hidden @[540px]/card:block">System log activity over time</span>
          <span className="@[540px]/card:hidden">Log activity</span>
        </CardDescription>
        <CardAction>
          <ToggleGroup
            type="single"
            value={timeRange}
            onValueChange={setTimeRange}
            variant="outline"
            className="hidden *:data-[slot=toggle-group-item]:!px-4 @[767px]/card:flex"
          >
            <ToggleGroupItem value="24h">Last 24 hours</ToggleGroupItem>
            <ToggleGroupItem value="12h">Last 12 hours</ToggleGroupItem>
            <ToggleGroupItem value="6h">Last 6 hours</ToggleGroupItem>
          </ToggleGroup>
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger
              className="flex w-40 **:data-[slot=select-value]:block **:data-[slot=select-value]:truncate @[767px]/card:hidden"
              size="sm"
              aria-label="Select a value"
            >
              <SelectValue placeholder="Last 24 hours" />
            </SelectTrigger>
            <SelectContent className="rounded-xl">
              <SelectItem value="24h" className="rounded-lg">
                Last 24 hours
              </SelectItem>
              <SelectItem value="12h" className="rounded-lg">
                Last 12 hours
              </SelectItem>
              <SelectItem value="6h" className="rounded-lg">
                Last 6 hours
              </SelectItem>
            </SelectContent>
          </Select>
        </CardAction>
      </CardHeader>
      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        <ChartContainer config={chartConfig} className="aspect-auto h-[250px] w-full">
          <AreaChart data={filteredData}>
            <defs>
              <linearGradient id="fillLogs" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--color-logs)" stopOpacity={0.8} />
                <stop offset="95%" stopColor="var(--color-logs)" stopOpacity={0.1} />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="time"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) => value}
            />
            <ChartTooltip
              cursor={false}
              defaultIndex={isMobile ? -1 : 10}
              content={<ChartTooltipContent labelFormatter={(value) => `Time: ${value}`} indicator="dot" />}
            />
            <Area dataKey="logs" type="natural" fill="url(#fillLogs)" stroke="var(--color-logs)" strokeWidth={2} />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
