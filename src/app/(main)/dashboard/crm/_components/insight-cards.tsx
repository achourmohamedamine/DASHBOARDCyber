"use client";

import { XAxis, Label, Pie, PieChart, Bar, BarChart, CartesianGrid, LabelList, YAxis } from "recharts";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent, ChartLegend } from "@/components/ui/chart";

import {
  leadsBySourceChartData,
  leadsBySourceChartConfig,
  projectRevenueChartData,
  projectRevenueChartConfig,
} from "./crm.config";

export function InsightCards() {
  const totalLeads = leadsBySourceChartData.reduce((acc, curr) => acc + curr.leads, 0);

  return (
    <Card data-slot="card">
      <CardHeader>
        <CardTitle>Risk Category Breakdown</CardTitle>
      </CardHeader>
      <CardContent className="max-h-48">
        <ChartContainer config={leadsBySourceChartConfig} className="size-full">
          <PieChart
            className="m-0"
            margin={{
              top: 0,
              right: 0,
              left: 0,
              bottom: 0,
            }}
          >
            <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
            <Pie
              data={leadsBySourceChartData}
              dataKey="leads"
              nameKey="source"
              innerRadius={65}
              outerRadius={90}
              paddingAngle={2}
              cornerRadius={4}
            >
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text x={viewBox.cx} y={viewBox.cy} textAnchor="middle" dominantBaseline="middle">
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground text-3xl font-bold tabular-nums"
                        >
                          {totalLeads.toLocaleString()}
                        </tspan>
                        <tspan x={viewBox.cx} y={(viewBox.cy ?? 0) + 24} className="fill-muted-foreground">
                          Risks
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </Pie>
            <ChartLegend
              layout="vertical"
              verticalAlign="middle"
              align="right"
              content={() => (
                <ul className="ml-8 flex flex-col gap-3">
                  {leadsBySourceChartData.map((item) => (
                    <li key={item.source} className="flex w-36 items-center justify-between">
                      <span className="flex items-center gap-2 capitalize">
                        <span className="size-2.5 rounded-full" style={{ background: item.fill }} />
                        {leadsBySourceChartConfig[item.source].label}
                      </span>
                      <span className="tabular-nums">{item.leads}</span>
                    </li>
                  ))}
                </ul>
              )}
            />
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="gap-2">
        <Button size="sm" variant="outline" className="basis-1/2">
          View Full Report
        </Button>
        <Button size="sm" variant="outline" className="basis-1/2">
          Download CSV
        </Button>
      </CardFooter>
    </Card>
  );
}
