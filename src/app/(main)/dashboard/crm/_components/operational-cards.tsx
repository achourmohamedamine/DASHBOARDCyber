"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

import { regionSalesData } from "./crm.config";

export function OperationalCards() {
  return (
    <Card data-slot="card">
      <CardHeader>
        <CardTitle>Monitored Servers</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2.5">
          {regionSalesData.map((region) => (
            <div key={region.region} className="space-y-0.5">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">{region.region}</span>
                <span className="text-muted-foreground text-xs font-medium tabular-nums">{region.percentage}</span>
              </div>
              <div className="flex items-center gap-2">
                <Progress value={region.percentage} />
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
