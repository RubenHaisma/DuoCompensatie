import React, { useState, useEffect } from 'react';

export default function InterestRateUpdates({ currentRate }: { currentRate: number }) {
  const [updatedRate, setUpdatedRate] = useState(currentRate);

  useEffect(() => {
    // Simulate fetching new interest rates (you can replace this with a real API call)
    const fetchInterestRate = async () => {
      // Example: Fake interest rate update after 5 seconds
      setTimeout(() => {
        const newRate = 0.025; // Example new rate (2.5%)
        setUpdatedRate(newRate);
      }, 5000);
    };

    fetchInterestRate();
  }, []);

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h3 className="text-xl font-bold text-gray-800">Renteupdates</h3>
      <p className="text-gray-600 mt-2">
        Houd de actuele rentepercentages in de gaten en zie hoe deze jouw afbetalingen beïnvloeden.
      </p>
      <div className="mt-4">
        <p className="text-lg font-bold">
          Huidige Rente: <span className="text-blue-600">{(updatedRate * 100).toFixed(2)}%</span>
        </p>
        {updatedRate !== currentRate && (
          <p className="text-sm text-green-600 mt-2">
            Rente is bijgewerkt! Voorheen: {(currentRate * 100).toFixed(2)}%
          </p>
        )}
      </div>
    </div>
  );
}
