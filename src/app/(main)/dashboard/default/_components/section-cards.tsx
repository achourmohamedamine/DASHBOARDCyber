import { TrendingUp, TrendingDown } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card, CardAction, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

export function SectionCards() {
  return (
    <div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs @xl/main:grid-cols-2 @5xl/main:grid-cols-4">
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Monitored Devices</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-4xl">10</CardTitle>
        </CardHeader>
      </Card>
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Number of Logs</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-4xl">1,234</CardTitle>
        </CardHeader>
      </Card>
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Number of Unique IP addresses</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-4xl">45,678</CardTitle>
        </CardHeader>
      </Card>
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Latest Attack</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-4xl">Generic</CardTitle>
        </CardHeader>
      </Card>
    </div>
  );
}
