import { CompensationResult } from '../../types/calculator';
import { EuroIcon, CheckCircle, XCircle } from 'lucide-react';
import Tooltip from '../UI/Tooltip';

interface ResultsDisplayProps {
  results: CompensationResult;
}

export default function ResultsDisplay({ results }: ResultsDisplayProps) {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold text-duo-blue text-center">Jouw compensatie resultaten</h2>

      {/* Basisbeurs */}
      <div className="bg-duo-light-blue p-4 rounded-md space-y-2">
        <div className="flex items-center gap-2">
          {results.isEligibleForBasicGrant ? (
            <CheckCircle className="w-5 h-5 text-green-500" />
          ) : (
            <XCircle className="w-5 h-5 text-red-500" />
          )}
          <h3 className="font-medium text-duo-blue">Basisbeurs</h3>
          <Tooltip
            content={`€34,17 p/m, max. €1640,16. Vereisten:
- Startjaar 2015-2023
- Min. 12 maanden financiering
- Diploma binnen 10 jaar`}
          />
        </div>
        <p className="text-2xl font-bold text-duo-blue">€{results.basicGrantAmount.toFixed(2)}</p>
      </div>

      {/* Studievoucher */}
      <div className="bg-duo-light-blue p-4 rounded-md space-y-2">
        <div className="flex items-center gap-2">
          {results.isEligibleForVoucher ? (
            <CheckCircle className="w-5 h-5 text-green-500" />
          ) : (
            <XCircle className="w-5 h-5 text-red-500" />
          )}
          <h3 className="font-medium text-duo-blue">Studievoucher</h3>
          <Tooltip
            content={`€2097,08. Vereisten:
- Startjaar 2015-2019
- Diploma binnen 10 jaar`}
          />
        </div>
        <p className="text-2xl font-bold text-duo-blue">€{results.voucherAmount.toFixed(2)}</p>
      </div>

      {/* Totale Compensatie */}
      <div className="bg-duo-orange/10 p-4 rounded-md space-y-2">
        <div className="flex items-center gap-2">
          <EuroIcon className="w-5 h-5 text-duo-orange" />
          <h3 className="font-medium text-duo-blue">Totale Compensatie</h3>
          <Tooltip
            content={`Totaal: Basisbeurs (€${results.basicGrantAmount.toFixed(
              2
            )}) + Studievoucher (€${results.voucherAmount.toFixed(2)}).`}
          />
        </div>
        <p className="text-3xl font-bold text-duo-orange">€{results.totalAmount.toFixed(2)}</p>
      </div>
    </div>
  );
}
