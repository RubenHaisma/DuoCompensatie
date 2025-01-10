'use client';

import React from "react";
import dynamic from "next/dynamic";
import { Card } from "@/components/ui/card";
import { supabase } from "@/lib/supabase";

// Dynamically import recharts components to prevent SSR issues
const ResponsiveContainer = dynamic(() => import("recharts").then((mod) => mod.ResponsiveContainer), { ssr: false });
const LineChart = dynamic(() => import("recharts").then((mod) => mod.LineChart), { ssr: false });
import { Line } from "recharts";
import { XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";

async function getLoanData() {
  const { data: { session } } = await supabase.auth.getSession();
  if (!session) return null;

  const { data: loanDetails } = await supabase
    .from('loan_details')
    .select('*')
    .eq('user_id', session.user.id)
    .single();

  const { data: payments } = await supabase
    .from('payments')
    .select('*')
    .eq('user_id', session.user.id)
    .order('payment_date', { ascending: true });

  return {
    loanDetails,
    payments,
  };
}

export default async function DashboardPage() {
  const data = await getLoanData();
  
  const currentBalance = data?.loanDetails?.current_balance || 35000;
  const monthlyPayment = data?.loanDetails?.monthly_payment || 200;
  const totalInterestPaid = data?.payments?.reduce((sum, payment) => 
    sum + (payment.amount * (data.loanDetails?.interest_rate || 0.02)), 0
  ) || 1200;

  const balanceHistory = data?.payments?.map((payment, index) => ({
    month: new Date(payment.payment_date).toLocaleString('default', { month: 'short' }),
    balance: currentBalance - (index * monthlyPayment),
  })) || [
    { month: "Jan", balance: 35000 },
    { month: "Feb", balance: 34800 },
    { month: "Mar", balance: 34600 },
    { month: "Apr", balance: 34400 },
    { month: "May", balance: 34200 },
    { month: "Jun", balance: 34000 },
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Loan Overview</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-6">
          <h3 className="text-sm font-medium text-muted-foreground">
            Current Balance
          </h3>
          <p className="text-2xl font-bold">€{currentBalance.toLocaleString()}</p>
        </Card>
        <Card className="p-6">
          <h3 className="text-sm font-medium text-muted-foreground">
            Monthly Payment
          </h3>
          <p className="text-2xl font-bold">€{monthlyPayment.toLocaleString()}</p>
        </Card>
        <Card className="p-6">
          <h3 className="text-sm font-medium text-muted-foreground">
            Interest Paid
          </h3>
          <p className="text-2xl font-bold">€{totalInterestPaid.toLocaleString()}</p>
        </Card>
      </div>

      <Card className="p-6">
        <h2 className="text-xl font-semibold mb-4">Balance History</h2>
        <div className="h-[300px]">
          {balanceHistory.length > 0 && (
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={balanceHistory}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip formatter={(value) => `€${value.toLocaleString()}`} />
                <Line
                  type="monotone"
                  dataKey="balance"
                  stroke="hsl(var(--primary))"
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          )}
        </div>
      </Card>
    </div>
  );
}
