'use client';

import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { supabase } from "@/lib/supabase";
import { format } from "date-fns";

interface Payment {
  id: string;
  amount: number;
  payment_date: string;
  payment_type: string;
}

export default function HistoryPage() {
  const [payments, setPayments] = useState<Payment[]>([]);

  useEffect(() => {
    const fetchPayments = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) return;

      const { data } = await supabase
        .from('payments')
        .select('*')
        .order('payment_date', { ascending: false });

      if (data) setPayments(data);
    };

    fetchPayments();
  }, []);

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Payment History</h1>

      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Type</TableHead>
              <TableHead className="text-right">Amount</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {payments.map((payment) => (
              <TableRow key={payment.id}>
                <TableCell>
                  {format(new Date(payment.payment_date), 'MMM d, yyyy')}
                </TableCell>
                <TableCell className="capitalize">{payment.payment_type}</TableCell>
                <TableCell className="text-right">€{payment.amount.toFixed(2)}</TableCell>
              </TableRow>
            ))}
            {payments.length === 0 && (
              <TableRow>
                <TableCell colSpan={3} className="text-center text-muted-foreground">
                  No payments recorded yet
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
}