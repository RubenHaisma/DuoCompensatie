import React from 'react';

interface LoanDetails {
  balance: number;
  totalInterestPaid: number;
  repaymentProgress: number;
}

export default function LoanProgress({ loanDetails }: { loanDetails: LoanDetails }) {
  const { balance, totalInterestPaid, repaymentProgress } = loanDetails;

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h3 className="text-xl font-bold text-gray-800">Huidige Leningstatus</h3>
      <div className="mt-4">
        <p><strong>Openstaand Saldo:</strong> €{balance.toLocaleString()}</p>
        <p><strong>Betaalde Rente:</strong> €{totalInterestPaid.toLocaleString()}</p>
        <p><strong>Voortgang:</strong> {repaymentProgress}%</p>
      </div>
      <div className="mt-4 bg-gray-200 rounded-full h-4">
        <div
          className="bg-blue-600 h-4 rounded-full"
          style={{ width: `${repaymentProgress}%` }}
        ></div>
      </div>
    </div>
  );
}
