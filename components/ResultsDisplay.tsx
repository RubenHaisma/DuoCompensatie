import { CompensationResult } from '../types/calculator';
import { EuroIcon, CheckCircle, XCircle } from 'lucide-react';

interface ResultsDisplayProps {
  results: CompensationResult;
}

export default function ResultsDisplay({ results }: ResultsDisplayProps) {
  return (
    <div className="mt-8 space-y-6">
      <h2 className="text-xl font-semibold text-gray-800">Jouw compensatie resultaten</h2>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            {results.isEligibleForBasicGrant ? (
              <CheckCircle className="w-5 h-5 text-green-500" />
            ) : (
              <XCircle className="w-5 h-5 text-red-500" />
            )}
            <h3 className="font-medium">Basisbeurs</h3>
          </div>
          <p className="text-2xl font-bold text-gray-900">
            €{results.basicGrantAmount.toFixed(2)}
          </p>
        </div>

        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            {results.isEligibleForVoucher ? (
              <CheckCircle className="w-5 h-5 text-green-500" />
            ) : (
              <XCircle className="w-5 h-5 text-red-500" />
            )}
            <h3 className="font-medium">Studievoucher</h3>
          </div>
          <p className="text-2xl font-bold text-gray-900">
            €{results.voucherAmount.toFixed(2)}
          </p>
        </div>
      </div>

      <div className="bg-blue-50 p-4 rounded-lg">
        <div className="flex items-center gap-2 mb-2">
          <EuroIcon className="w-5 h-5 text-blue-600" />
          <h3 className="font-medium">Totale Compensatie</h3>
        </div>
        <p className="text-3xl font-bold text-blue-600">
          €{results.totalAmount.toFixed(2)}
        </p>
      </div>
    </div>
  );
}