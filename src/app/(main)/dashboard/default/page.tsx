import { InsightCards } from "../crm/_components/insight-cards";
import { OperationalCards } from "../crm/_components/operational-cards";

import { ChartAreaInteractive } from "./_components/chart-area-interactive";
import { DataTable } from "./_components/data-table";
import data from "./_components/data.json";
import { SectionCards } from "./_components/section-cards";

export default function Page() {
  return (
    <div className="@container/main flex flex-col gap-4 md:gap-6">
      <SectionCards />
      <div className="grid grid-cols-1 gap-4 @xl/main:grid-cols-2">
        <OperationalCards />
        <InsightCards />
      </div>
      <ChartAreaInteractive />
      <DataTable data={data} />
    </div>
  );
}
