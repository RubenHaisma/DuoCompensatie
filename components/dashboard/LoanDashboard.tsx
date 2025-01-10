import React, { useState } from 'react';
import RepaymentSimulator from './RepaymentSimulator';
import LoanProgress from './LoanProgress';
import InterestRateUpdates from './InterestRateUpdates';
import DeadlineReminders from './DeadlineReminders';
import LoanGraph from './LoanGraph';

export default function LoanDashboard() {
  const [loanDetails, setLoanDetails] = useState({
    balance: 25000,
    totalInterestPaid: 1200,
    repaymentProgress: 20, // percentage
    currentRate: 0.0246, // DUO interest rate
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoanDetails((prev) => ({
      ...prev,
      [name]: parseFloat(value) || 0, // Ensure numerical values
    }));
  };

  return (
    <div className="bg-gray-50 min-h-screen p-6">
      {/* Header */}
      <header className="text-center">
        <h1 className="text-4xl font-bold text-blue-600">Premium Loan Management Dashboard</h1>
        <p className="text-gray-600 mt-2">Beheer je DUO-lening moeiteloos en optimaliseer je afbetalingen.</p>
      </header>

      {/* User Input Section */}
      <div className="bg-white p-6 rounded-lg shadow mt-8 max-w-4xl mx-auto">
        <h2 className="text-xl font-bold text-gray-800">Bewerk Jouw Leninggegevens</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <div>
            <label className="block text-gray-700">Huidig Saldo (€):</label>
            <input
              type="number"
              name="balance"
              value={loanDetails.balance}
              onChange={handleInputChange}
              className="w-full p-2 border rounded-lg"
            />
          </div>
          <div>
            <label className="block text-gray-700">Betaalde Rente Tot Nu Toe (€):</label>
            <input
              type="number"
              name="totalInterestPaid"
              value={loanDetails.totalInterestPaid}
              onChange={handleInputChange}
              className="w-full p-2 border rounded-lg"
            />
          </div>
          <div>
            <label className="block text-gray-700">Voortgang (%):</label>
            <input
              type="number"
              name="repaymentProgress"
              value={loanDetails.repaymentProgress}
              onChange={handleInputChange}
              className="w-full p-2 border rounded-lg"
            />
          </div>
          <div>
            <label className="block text-gray-700">Huidige Rente (%):</label>
            <input
              type="number"
              name="currentRate"
              value={loanDetails.currentRate * 100} // Convert to percentage for display
              onChange={(e) =>
                setLoanDetails((prev) => ({
                  ...prev,
                  currentRate: parseFloat(e.target.value) / 100 || 0, // Convert back to decimal
                }))
              }
              className="w-full p-2 border rounded-lg"
            />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
        {/* Smaller Components */}
        <LoanProgress loanDetails={loanDetails} />
        <InterestRateUpdates currentRate={loanDetails.currentRate} />
        <RepaymentSimulator loanDetails={loanDetails} setLoanDetails={setLoanDetails} />
        <DeadlineReminders />

        {/* Loan Graph Section */}
        <div className="lg:col-span-2">
          <LoanGraph loanDetails={loanDetails} />
        </div>
      </div>

      {/* CTA Section */}
      <div className="mt-8 bg-blue-100 p-6 rounded-lg text-center">
        <h2 className="text-2xl font-bold text-blue-600">Upgrade naar Premium</h2>
        <p className="text-gray-700 mt-2">Krijg volledige toegang tot onze geavanceerde tools voor slechts €4.99/maand of €39.99 eenmalig!</p>
        <button className="mt-4 bg-blue-600 text-white py-2 px-6 rounded-lg hover:bg-blue-700">
          Upgrade Nu
        </button>
      </div>
    </div>
  );
}
