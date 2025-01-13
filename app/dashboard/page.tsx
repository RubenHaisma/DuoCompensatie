'use client';

import { getLoanData } from '@/utils/supabase/data'; // Ensure the path is correct
import { notFound } from 'next/navigation';
import dynamic from 'next/dynamic';
import { Card } from '@/components/ui/card';

// Dynamically import Recharts components
const ResponsiveContainer = dynamic(() => import('recharts').then(mod => mod.ResponsiveContainer), { ssr: false });
const LineChart = dynamic(() => import('recharts').then(mod => mod.LineChart), { ssr: false });
import { Line, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';

export default async function DashboardPage() {
  const data = await getLoanData(); // Fetch data server-side

  if (!data.loanDetails) {
    notFound();
  }

  const { loanDetails, payments } = data;
  const balanceHistory = payments
    ? payments.map((payment, index) => ({
        month: new Date(payment.payment_date).toLocaleString('default', { month: 'short' }),
        balance: loanDetails.current_balance - index * loanDetails.monthly_payment,
      }))
    : [];

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Loan Overview</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-6">
          <h3 className="text-sm font-medium text-muted-foreground">Current Balance</h3>
          <p className="text-2xl font-bold">€{loanDetails.current_balance.toLocaleString()}</p>
        </Card>
        <Card className="p-6">
          <h3 className="text-sm font-medium text-muted-foreground">Monthly Payment</h3>
          <p className="text-2xl font-bold">€{loanDetails.monthly_payment.toLocaleString()}</p>
        </Card>
        <Card className="p-6">
          <h3 className="text-sm font-medium text-muted-foreground">Interest Paid</h3>
          <p className="text-2xl font-bold">
            €{(payments ? payments.reduce((sum, payment) => sum + payment.amount * loanDetails.interest_rate, 0) : 0).toLocaleString()}
          </p>
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
                <Line type="monotone" dataKey="balance" stroke="hsl(var(--primary))" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          )}
        </div>
      </Card>
    </div>
  );
}
