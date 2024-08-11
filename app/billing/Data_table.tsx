"use client";
//all
import { useState } from "react";
import {
  ColumnDef,
  useReactTable,
  getCoreRowModel,
  flexRender,
} from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import {
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  Table,
} from "@/components/ui/table";

// Define the shape of the data
export type Billing = {
  invoiceId: string;
  customerName: string;
  email: string;
  issueDate: string;
  dueDate: string;
  amount: number;
  status: "Pending" | "Processing" | "Paid" | "Overdue";
};

export function BillingTable({
  data,
  columns,
}: {
  data: Billing[];
  columns: ColumnDef<Billing>[];
}) {
  const [rowSelection, setRowSelection] = useState({});

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    onRowSelectionChange: setRowSelection,
    state: {
      rowSelection,
    },
  });

  const selectedRows = table.getSelectedRowModel().rows;

  const handlePrint = () => {
    const selectedBillings = selectedRows.map((row) => row.original);

    // Print each billing detail one by one
    selectedBillings.forEach((billing) => {
      const printWindow = window.open("", "", "width=600,height=600");
      printWindow?.document.write(`
        <html>
          <head>
            <title>Billing Details</title>
            <style>
              body { font-family: Arial, sans-serif; padding: 20px; }
              .container { max-width: 600px; margin: 0 auto; }
              .details { border: 1px solid #ddd; padding: 10px; border-radius: 5px; }
              .details p { margin: 5px 0; }
            </style>
          </head>
          <body>
            <div class="container">
              <h1>Billing Details</h1>
              <div class="details">
                <p><strong>Invoice ID:</strong> ${billing.invoiceId}</p>
                <p><strong>Customer Name:</strong> ${billing.customerName}</p>
                <p><strong>Email:</strong> ${billing.email}</p>
                <p><strong>Issue Date:</strong> ${billing.issueDate}</p>
                <p><strong>Due Date:</strong> ${billing.dueDate}</p>
                <p><strong>Amount:</strong> $${billing.amount.toFixed(2)}</p>
                <p><strong>Status:</strong> ${billing.status}</p>
              </div>
            </div>
          </body>
        </html>
      `);
      printWindow?.document.close();
      printWindow?.focus();
      printWindow?.print();
    });
  };

  return (
    <div className="container mx-auto py-10">
      <div className="mb-4">
        {selectedRows.length > 1 && (
          <Button onClick={handlePrint} className="mb-4">
            Print Selected Billing Details
          </Button>
        )}
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
