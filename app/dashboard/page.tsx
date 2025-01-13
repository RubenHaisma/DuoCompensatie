'use client';

import { useEffect, useState } from 'react';
import { Card } from '@/components/ui/card';
import { supabase } from '@/lib/supabase';

interface LoanDetails {
  initial_balance: number;
  current_balance: number;
  monthly_payment: number;
  interest_rate: number;
  repayment_scheme: string;
}

export default function DashboardPage() {
  const [loanDetails, setLoanDetails] = useState<LoanDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function initializeLoanDetails() {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (!session) return;

        // Try to fetch existing loan details
        const { data: existingLoan, error: fetchError } = await supabase
          .from('loan_details')
          .select('*')
          .eq('user_id', session.user.id)
          .single();

        if (fetchError && fetchError.code !== 'PGRST116') {
          throw fetchError;
        }

        if (!existingLoan) {
          // Create initial loan details if none exist
          const initialLoan = {
            user_id: session.user.id,
            initial_balance: 0,
            current_balance: 0,
            monthly_payment: 0,
            interest_rate: 0.02, // 2% default interest rate
            repayment_scheme: 'SF35', // Default scheme
            start_date: new Date().toISOString()
          };

          const { data: newLoan, error: insertError } = await supabase
            .from('loan_details')
            .insert([initialLoan])
            .select()
            .single();

          if (insertError) throw insertError;
          setLoanDetails(newLoan);
        } else {
          setLoanDetails(existingLoan);
        }
      } catch (err) {
        console.error('Error:', err);
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    }

    initializeLoanDetails();
  }, []);

  if (loading) {
    return <div className="flex justify-center items-center min-h-screen">Loading...</div>;
  }

  if (error) {
    return <div className="text-red-500">Error: {error}</div>;
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Loan Overview</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-6">
          <h3 className="text-sm font-medium text-muted-foreground">Current Balance</h3>
          <p className="text-2xl font-bold">€{loanDetails?.current_balance.toLocaleString()}</p>
        </Card>
        <Card className="p-6">
          <h3 className="text-sm font-medium text-muted-foreground">Monthly Payment</h3>
          <p className="text-2xl font-bold">€{loanDetails?.monthly_payment.toLocaleString()}</p>
        </Card>
        <Card className="p-6">
          <h3 className="text-sm font-medium text-muted-foreground">Interest Rate</h3>
          <p className="text-2xl font-bold">{(loanDetails?.interest_rate ?? 0) * 100}%</p>
        </Card>
      </div>

      <Card className="p-6">
        <h2 className="text-xl font-semibold mb-4">Loan Details</h2>
        <div className="space-y-2">
          <p><strong>Repayment Scheme:</strong> {loanDetails?.repayment_scheme}</p>
          <p><strong>Initial Balance:</strong> €{loanDetails?.initial_balance.toLocaleString()}</p>
        </div>
      </Card>
    </div>
  );
}