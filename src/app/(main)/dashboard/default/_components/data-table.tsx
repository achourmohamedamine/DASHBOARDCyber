"use client";

import * as React from "react";

import { FileDown, Plus } from "lucide-react";
import { z } from "zod";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useDataTableInstance } from "@/hooks/use-data-table-instance";

import { DataTable as DataTableNew } from "../../../../../components/data-table/data-table";
import { DataTablePagination } from "../../../../../components/data-table/data-table-pagination";
import { DataTableViewOptions } from "../../../../../components/data-table/data-table-view-options";
import { withDndColumn } from "../../../../../components/data-table/table-utils";

import { dashboardColumns } from "./columns";
import { sectionSchema } from "./schema";

export function DataTable({ data: initialData }: { data: z.infer<typeof sectionSchema>[] }) {
  const [data, setData] = React.useState(() => initialData);
  const columns = React.useMemo(() => withDndColumn(dashboardColumns), []);
  const table = useDataTableInstance({ data, columns, getRowId: (row) => row.id.toString() });

  const handleGeneratePDF = () => {
    // PDF generation logic here
    console.log("Generating PDF report...");
    // You can implement actual PDF generation using libraries like jsPDF or pdfmake
  };

  return (
    <div className="flex w-full flex-col gap-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Recent Offenses</h2>
        <div className="flex items-center gap-2">
          <DataTableViewOptions table={table} />
          <Button variant="outline" size="sm" onClick={handleGeneratePDF}>
            <FileDown />
            <span className="hidden lg:inline">Generate PDF</span>
          </Button>
        </div>
      </div>

      <div className="overflow-hidden rounded-lg border">
        <DataTableNew dndEnabled table={table} columns={columns} onReorder={setData} />
      </div>

      <DataTablePagination table={table} />
    </div>
  );
}
