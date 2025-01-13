'use client';

import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/lib/supabase";
import { REPAYMENT_SCHEMES } from "@/lib/constants";

export default function SettingsPage() {
  const [loading, setLoading] = useState(true);
  const [loanDetails, setLoanDetails] = useState({
    initial_balance: "",
    current_balance: "",
    interest_rate: "",
    monthly_payment: "",
    repayment_scheme: "SF35",
    annual_income: "",
    partner_income: "",
    start_date: "",
  });
  const { toast } = useToast();

  useEffect(() => {
    const fetchLoanDetails = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) return;

      const { data } = await supabase
        .from('loan_details')
        .select('*')
        .single();

      if (data) {
        setLoanDetails({
          initial_balance: data.initial_balance.toString(),
          current_balance: data.current_balance.toString(),
          interest_rate: data.interest_rate.toString(),
          monthly_payment: data.monthly_payment.toString(),
          repayment_scheme: data.repayment_scheme,
          annual_income: data.annual_income?.toString() || "",
          partner_income: data.partner_income?.toString() || "",
          start_date: data.start_date,
        });
      }
      setLoading(false);
    };

    fetchLoanDetails();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) throw new Error("Not authenticated");

      const { error } = await supabase
        .from('loan_details')
        .upsert({
          user_id: session.user.id,
          ...loanDetails,
          initial_balance: parseFloat(loanDetails.initial_balance),
          current_balance: parseFloat(loanDetails.current_balance),
          interest_rate: parseFloat(loanDetails.interest_rate),
          monthly_payment: parseFloat(loanDetails.monthly_payment),
          annual_income: loanDetails.annual_income ? parseFloat(loanDetails.annual_income) : null,
          partner_income: loanDetails.partner_income ? parseFloat(loanDetails.partner_income) : null,
        });

      if (error) throw error;

      toast({
        title: "Success",
        description: "Loan details updated successfully",
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Loan Settings</h1>

      <Card className="p-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="initial_balance">Initial Balance (€)</Label>
              <Input
                id="initial_balance"
                type="number"
                value={loanDetails.initial_balance}
                onChange={(e) => setLoanDetails(prev => ({
                  ...prev,
                  initial_balance: e.target.value
                }))}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="current_balance">Current Balance (€)</Label>
              <Input
                id="current_balance"
                type="number"
                value={loanDetails.current_balance}
                onChange={(e) => setLoanDetails(prev => ({
                  ...prev,
                  current_balance: e.target.value
                }))}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="interest_rate">Interest Rate (%)</Label>
              <Input
                id="interest_rate"
                type="number"
                step="0.01"
                value={loanDetails.interest_rate}
                onChange={(e) => setLoanDetails(prev => ({
                  ...prev,
                  interest_rate: e.target.value
                }))}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="repayment_scheme">Repayment Scheme</Label>
              <Select
                value={loanDetails.repayment_scheme}
                onValueChange={(value) => setLoanDetails(prev => ({
                  ...prev,
                  repayment_scheme: value
                }))}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="SF35">SF35 (35 years)</SelectItem>
                  <SelectItem value="SF15">SF15 (15 years)</SelectItem>
                  <SelectItem value="SF15-oud">SF15-oud (15 years - Old)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="annual_income">Annual Income (€)</Label>
              <Input
                id="annual_income"
                type="number"
                value={loanDetails.annual_income}
                onChange={(e) => setLoanDetails(prev => ({
                  ...prev,
                  annual_income: e.target.value
                }))}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="partner_income">Partner Income (€)</Label>
              <Input
                id="partner_income"
                type="number"
                value={loanDetails.partner_income}
                onChange={(e) => setLoanDetails(prev => ({
                  ...prev,
                  partner_income: e.target.value
                }))}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="start_date">Start Date</Label>
              <Input
                id="start_date"
                type="date"
                value={loanDetails.start_date}
                onChange={(e) => setLoanDetails(prev => ({
                  ...prev,
                  start_date: e.target.value
                }))}
                required
              />
            </div>
          </div>

          <Button type="submit" className="w-full">
            Save Changes
          </Button>
        </form>
      </Card>
    </div>
  );
}