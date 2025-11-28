import { ColumnDef } from "@tanstack/react-table";
import { Download } from "lucide-react";
import { z } from "zod";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";

import { sectionSchema } from "./schema";

export const dashboardColumns: ColumnDef<z.infer<typeof sectionSchema>>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "id",
    header: "ID",
    cell: ({ row }) => <div className="font-medium">#{row.getValue("id")}</div>,
  },
  {
    accessorKey: "header",
    header: "Offense Type",
    cell: ({ row }) => <div className="font-medium">{row.getValue("header")}</div>,
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status");
      const variant = status === "Done" ? "default" : "secondary";
      return (
        <Badge variant={variant} className="capitalize">
          {status}
        </Badge>
      );
    },
  },
  {
    id: "download",
    header: "Download",
    enableHiding: false,
    cell: ({ row }) => {
      const handleDownload = () => {
        console.log(`Downloading report for offense ID: ${row.original.id}`);
        // Implement download logic here
      };

      return (
        <Button variant="ghost" size="sm" onClick={handleDownload}>
          <Download className="h-4 w-4" />
        </Button>
      );
    },
  },
];
