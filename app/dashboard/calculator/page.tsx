'use client';

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { REPAYMENT_SCHEMES } from "@/lib/constants";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

export default function CalculatorPage() {
  const [loanAmount, setLoanAmount] = useState("35000");
  const [scheme, setScheme] = useState("SF35");
  const [income, setIncome] = useState("30000");
  const [extraPayment, setExtraPayment] = useState("0");

  const calculateRepayment = () => {
    const amount = parseFloat(loanAmount);
    const annualIncome = parseFloat(income);
    const extra = parseFloat(extraPayment);
    const selectedScheme = REPAYMENT_SCHEMES[scheme as keyof typeof REPAYMENT_SCHEMES];

    const monthlyData = [];
    let balance = amount;
    const monthlyInterest = 0.02 / 12; // 2% annual interest
    
    for (let month = 1; month <= 12; month++) {
      const incomeAboveThreshold = Math.max(0, annualIncome - selectedScheme.freeThreshold);
      let monthlyPayment = (incomeAboveThreshold * selectedScheme.repaymentPercentage) / 12 + extra;
      
      const interestAmount = balance * monthlyInterest;
      balance = balance + interestAmount - monthlyPayment;
      
      monthlyData.push({
        month: month,
        balance: Math.max(0, balance),
        payment: monthlyPayment,
      });
    }

    return monthlyData;
  };

  const repaymentData = calculateRepayment();

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Repayment Calculator</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="p-6 space-y-4">
          <div className="space-y-2">
            <Label htmlFor="loanAmount">Loan Amount (€)</Label>
            <Input
              id="loanAmount"
              type="number"
              value={loanAmount}
              onChange={(e) => setLoanAmount(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="scheme">Repayment Scheme</Label>
            <Select value={scheme} onValueChange={setScheme}>
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
            <Label htmlFor="income">Annual Income (€)</Label>
            <Input
              id="income"
              type="number"
              value={income}
              onChange={(e) => setIncome(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="extraPayment">Extra Monthly Payment (€)</Label>
            <Input
              id="extraPayment"
              type="number"
              value={extraPayment}
              onChange={(e) => setExtraPayment(e.target.value)}
            />
          </div>
        </Card>

        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Repayment Projection</h2>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={repaymentData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="balance"
                  stroke="hsl(var(--primary))"
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>
    </div>
  );
}