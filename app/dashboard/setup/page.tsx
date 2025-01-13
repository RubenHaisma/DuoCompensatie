'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { supabase } from '@/lib/supabase';
import { REPAYMENT_SCHEMES } from '@/lib/constants';
import { parse } from 'path';

export default function SetupPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    fullName: '',
    initialBalance: '',
    currentBalance: '',
    interestRate: '0.0246',
    repaymentScheme: 'SF35',
    annualIncome: '',
    partnerIncome: '',
    startDate: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) throw new Error('Not authenticated');

      // Update profile
      await supabase
        .from('profiles')
        .upsert({
          id: session.user.id,
          full_name: formData.fullName,
          email: session.user.email || '',
        });

      // Create loan details
      await supabase
        .from('loan_details')
        .upsert({
          user_id: session.user.id,
          initial_balance: parseFloat(formData.initialBalance),
          current_balance: parseFloat(formData.currentBalance),
          interest_rate: parseFloat(formData.interestRate),
          monthly_payment: parseFloat(formData.initialBalance) * parseFloat(formData.interestRate),
          repayment_scheme: formData.repaymentScheme,
          annual_income: formData.annualIncome ? parseFloat(formData.annualIncome) : null,
          partner_income: formData.partnerIncome ? parseFloat(formData.partnerIncome) : null,
          start_date: formData.startDate,
        });

      router.push('/dashboard');
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Persoonlijke Informatie</h2>
            <div className="space-y-2">
              <Label htmlFor="fullName">Volledige Naam</Label>
              <Input
                id="fullName"
                name="fullName"
                value={formData.fullName}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Lening Details</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="initialBalance">Oorspronkelijk Leenbedrag (€)</Label>
                <Input
                  id="initialBalance"
                  name="initialBalance"
                  type="number"
                  value={formData.initialBalance}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="currentBalance">Huidig Leenbedrag (€)</Label>
                <Input
                  id="currentBalance"
                  name="currentBalance"
                  type="number"
                  value={formData.currentBalance}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Terugbetaling Details</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="interestRate">Rente (%)</Label>
                <Input
                  id="interestRate"
                  name="interestRate"
                  type="number"
                  step="0.0001"
                  value={formData.interestRate}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="repaymentScheme">Terugbetalingsregeling</Label>
                <Select
                  value={formData.repaymentScheme}
                  onValueChange={(value) => setFormData({ ...formData, repaymentScheme: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.entries(REPAYMENT_SCHEMES).map(([key, scheme]) => (
                      <SelectItem key={key} value={key}>
                        {key} ({scheme.years} jaar)
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Inkomen & Start Datum</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="annualIncome">Jaarinkomen (€)</Label>
                <Input
                  id="annualIncome"
                  name="annualIncome"
                  type="number"
                  value={formData.annualIncome}
                  onChange={handleInputChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="partnerIncome">Partner Inkomen (€)</Label>
                <Input
                  id="partnerIncome"
                  name="partnerIncome"
                  type="number"
                  value={formData.partnerIncome}
                  onChange={handleInputChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="startDate">Start Datum Lening</Label>
                <Input
                  id="startDate"
                  name="startDate"
                  type="date"
                  value={formData.startDate}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container max-w-2xl mx-auto">
        <Card className="p-6">
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-[#003b5c]">Dashboard Setup</h1>
            <p className="text-gray-600 mt-2">
              Vul je gegevens in om je persoonlijke dashboard in te stellen
            </p>
          </div>

          <div className="mb-8">
            <div className="relative">
              <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-gray-200">
                <div
                  style={{ width: `${(step / 4) * 100}%` }}
                  className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-[#003b5c]"
                ></div>
              </div>
            </div>
            <div className="flex justify-between text-xs text-gray-600">
              <span className={step >= 1 ? 'text-[#003b5c] font-bold' : ''}>
                Persoonlijk
              </span>
              <span className={step >= 2 ? 'text-[#003b5c] font-bold' : ''}>
                Lening
              </span>
              <span className={step >= 3 ? 'text-[#003b5c] font-bold' : ''}>
                Terugbetaling
              </span>
              <span className={step >= 4 ? 'text-[#003b5c] font-bold' : ''}>
                Inkomen
              </span>
            </div>
          </div>

          {renderStep()}

          <div className="flex justify-between mt-8">
            {step > 1 && (
              <Button
                onClick={() => setStep(step - 1)}
                variant="outline"
              >
                Vorige
              </Button>
            )}
            {step < 4 ? (
              <Button
                onClick={() => setStep(step + 1)}
                className="ml-auto bg-[#003b5c]"
              >
                Volgende
              </Button>
            ) : (
              <Button
                onClick={handleSubmit}
                className="ml-auto bg-[#003b5c]"
              >
                Voltooien
              </Button>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
}