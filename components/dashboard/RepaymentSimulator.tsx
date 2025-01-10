import React, { useState } from 'react';

type LoanDetails = {
  balance: number; // Current loan balance
  totalInterestPaid: number; // Total interest paid so far
  repaymentProgress: number; // Repayment progress as a percentage
  currentRate: number; // Current DUO interest rate
};

type RepaymentSimulatorProps = {
  loanDetails: LoanDetails;
  setLoanDetails: React.Dispatch<React.SetStateAction<LoanDetails>>;
};

export default function RepaymentSimulator({
  loanDetails,
  setLoanDetails,
}: RepaymentSimulatorProps) {
  const [extraPayment, setExtraPayment] = useState<number>(0);
  const [simulationResult, setSimulationResult] = useState<{
    newBalance: number;
    savings: number;
  } | null>(null);

  const calculateSavings = () => {
    const newBalance = loanDetails.balance - extraPayment;
    const savings = extraPayment * loanDetails.currentRate * 12; // Simplified calculation
    return { newBalance, savings };
  };

  const handleSimulate = () => {
    const { newBalance, savings } = calculateSavings();
    setSimulationResult({ newBalance, savings });

    // Update loan details
    setLoanDetails((prev) => ({
      ...prev,
      balance: newBalance,
      repaymentProgress: ((prev.balance - newBalance) / prev.balance) * 100,
    }));
  };

  return (
    <div className="bg-gradient-to-r from-blue-50 to-white p-6 rounded-lg shadow-lg">
      <h3 className="text-2xl font-bold text-blue-800 mb-4">Simuleer Aflossingen</h3>
      <p className="text-gray-600 mb-6">
        Bereken hoe je extra betalingen je lening kunnen verkorten en hoeveel rente je kunt besparen.
      </p>

      {/* Input Section */}
      <div className="space-y-4">
        <div>
          <label className="block text-gray-700 font-medium">Extra Betaling (€):</label>
          <input
            type="number"
            className="mt-2 w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            value={extraPayment}
            onChange={(e) => setExtraPayment(parseFloat(e.target.value) || 0)}
            placeholder="Voer een extra aflossingsbedrag in"
          />
        </div>

        <button
          onClick={handleSimulate}
          className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
        >
          Simuleer
        </button>
      </div>

      {/* Simulation Results */}
      {simulationResult && (
        <div className="mt-6 bg-blue-50 p-4 rounded-lg">
          <h4 className="text-lg font-bold text-blue-700 mb-2">Resultaten van Simulatie</h4>
          <p className="text-gray-700">
            <strong>Nieuwe Schuld:</strong> €{simulationResult.newBalance.toLocaleString(undefined, {
              minimumFractionDigits: 2,
            })}
          </p>
          <p className="text-gray-700">
            <strong>Geschatte Rente Besparing:</strong> €{simulationResult.savings.toLocaleString(
              undefined,
              {
                minimumFractionDigits: 2,
              }
            )}
          </p>
          <div className="mt-4">
            <label className="block text-gray-700 font-medium mb-1">Voortgang:</label>
            <div className="w-full bg-gray-200 h-4 rounded-full">
              <div
                className="h-4 bg-blue-600 rounded-full"
                style={{
                  width: `${loanDetails.repaymentProgress.toFixed(2)}%`,
                }}
              ></div>
            </div>
            <p className="text-sm text-gray-600 mt-1">
              Je bent nu {loanDetails.repaymentProgress.toFixed(2)}% van je lening afbetaald.
            </p>
          </div>
        </div>
      )}

      {/* Info Section */}
      <div className="mt-6 bg-gray-100 p-4 rounded-lg text-sm text-gray-700">
        <p>
          <strong>Tip:</strong> Door regelmatig extra betalingen te doen, kun je de totale duur van je
          lening aanzienlijk verkorten en rente besparen!
        </p>
      </div>
    </div>
  );
}
