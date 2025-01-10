import React, { useState } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

interface LoanDetails {
  balance: number;
  totalInterestPaid: number;
  repaymentProgress: number;
  currentRate: number;
}

export default function LoanGraph({ loanDetails }: { loanDetails: LoanDetails }) {
  const [monthlyPayment, setMonthlyPayment] = useState<number>(400); // Default monthly payment
  const [extraPayment, setExtraPayment] = useState<number>(0); // Extra payment slider

  const { balance, currentRate } = loanDetails;

  // Calculate repayment timeline
  const monthsToPayOff = Math.ceil(balance / (monthlyPayment + extraPayment));
  const totalMonths = Math.max(monthsToPayOff, 1);
  const labels = Array.from({ length: totalMonths }, (_, i) => `Maand ${i + 1}`);
  const balances = Array.from({ length: totalMonths }, (_, i) =>
    Math.max(balance - i * (monthlyPayment + extraPayment), 0)
  );

  // Chart data
  const data = {
    labels,
    datasets: [
      {
        label: 'Saldo Over Tijd (€)',
        data: balances,
        borderColor: 'rgba(59, 130, 246, 0.8)', // Blue color
        backgroundColor: 'rgba(59, 130, 246, 0.2)', // Light blue fill
        fill: true,
        tension: 0.4,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      tooltip: {
        callbacks: {
          label: (context: any) =>
            `Saldo: €${context.raw.toLocaleString(undefined, { minimumFractionDigits: 2 })}`,
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Saldo (€)',
        },
      },
      x: {
        title: {
          display: true,
          text: 'Tijd (Maanden)',
        },
      },
    },
  };

  return (
    <div className="bg-white p-8 rounded-lg shadow-lg">
      <h3 className="text-2xl font-bold text-gray-800 mb-4">Interactie Grafiek: Lening Afbetaling</h3>
      <p className="text-gray-600 mb-6">
        Gebruik de sliders om je maandelijkse betaling of extra aflossing aan te passen en bekijk hoe je
        lening sneller kan worden afbetaald.
      </p>

      {/* Graph Section */}
      <div className="mb-8">
        <Line data={data} options={options} />
      </div>

      {/* Controls */}
      <div className="space-y-6">
        {/* Monthly Payment Slider */}
        <div>
          <label className="block text-gray-700 font-medium mb-2">
            Maandelijkse Betaling (€): {monthlyPayment}
          </label>
          <input
            type="range"
            min="50"
            max="2000"
            step="50"
            value={monthlyPayment}
            onChange={(e) => setMonthlyPayment(parseInt(e.target.value, 10))}
            className="w-full"
          />
        </div>

        {/* Extra Payment Slider */}
        <div>
          <label className="block text-gray-700 font-medium mb-2">
            Extra Aflossing (€): {extraPayment}
          </label>
          <input
            type="range"
            min="0"
            max="2000"
            step="50"
            value={extraPayment}
            onChange={(e) => setExtraPayment(parseInt(e.target.value, 10))}
            className="w-full"
          />
        </div>
      </div>

      {/* Summary */}
      <div className="mt-6 bg-blue-50 p-4 rounded-lg">
        <h4 className="text-lg font-bold text-blue-600">Samenvatting</h4>
        <p className="text-gray-700 mt-2">
          <strong>Huidige Saldo:</strong> €{balance.toLocaleString()}
        </p>
        <p className="text-gray-700">
          <strong>Verwachte Einddatum:</strong> Over {monthsToPayOff} maanden
        </p>
        <p className="text-gray-700">
          <strong>Maandelijkse Betaling:</strong> €{(monthlyPayment + extraPayment).toLocaleString()}
        </p>
      </div>
    </div>
  );
}
