import { Billing, Columns } from "./Columns";
import { BillingTable } from "./Data_table";

async function getData(): Promise<Billing[]> {
  // Replace this with actual API call to fetch data
  return [
    {
      invoiceId: "INV-001",
      customerName: "John Doe",
      email: "john.doe@example.com",
      issueDate: "2024-08-01",
      dueDate: "2024-08-15",
      amount: 1000,
      status: "Paid",
    },
    {
      invoiceId: "INV-002",
      customerName: "Jane Smith",
      email: "jane.smith@example.com",
      issueDate: "2024-08-02",
      dueDate: "2024-08-16",
      amount: 750,
      status: "Pending",
    },
    // Add more dummy data as needed
  ];
}

export default async function DemoPage() {
  const data = await getData();

  return (
    <div className="container mx-auto py-10">
      <BillingTable data={data} columns={Columns} />
    </div>
  );
}
