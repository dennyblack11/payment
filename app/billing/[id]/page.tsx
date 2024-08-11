"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface Billing {
  invoiceId: string;
  customerName: string;
  email: string;
  issueDate: string;
  dueDate: string;
  amount: number;
  status: "Pending" | "Processing" | "Paid" | "Overdue";
}

export default function BillingDetail() {
  const router = useRouter();
  const { id } = useParams();

  const [billingData, setBillingData] = useState<Billing | null>(null);

  useEffect(() => {
    if (id) {
      // Replace this with your actual data fetching logic
      const fetchBillingData = async () => {
        const data: Billing = {
          invoiceId: "INV-001",
          customerName: "John Doe",
          email: "john.doe@example.com",
          issueDate: "2024-08-01",
          dueDate: "2024-08-15",
          amount: 1000,
          status: "Paid",
        };
        setBillingData(data);
      };

      fetchBillingData();
    }
  }, [id]);

  if (!billingData) {
    return <div>Loading...</div>;
  }

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="container mx-auto py-10">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Billing Details</h1>
        <button
          onClick={handlePrint}
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          Print
        </button>
      </div>
      <div className="border p-4 rounded-md">
        <p>
          <strong>Invoice ID:</strong> {billingData.invoiceId}
        </p>
        <p>
          <strong>Customer Name:</strong> {billingData.customerName}
        </p>
        <p>
          <strong>Email:</strong> {billingData.email}
        </p>
        <p>
          <strong>Issue Date:</strong> {billingData.issueDate}
        </p>
        <p>
          <strong>Due Date:</strong> {billingData.dueDate}
        </p>
        <p>
          <strong>Amount:</strong> ${billingData.amount.toFixed(2)}
        </p>
        <p>
          <strong>Status:</strong> {billingData.status}
        </p>
      </div>
    </div>
  );
}
