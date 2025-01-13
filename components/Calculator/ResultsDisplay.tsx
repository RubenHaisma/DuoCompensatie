import { CompensationResult } from '../../types/calculator';
import { EuroIcon, CheckCircle, XCircle } from 'lucide-react';
import DonationButton from '../Payment/DonationButton_1';
import Tooltip from '@/components/ui/Tooltip';
interface ResultsDisplayProps {
  results: CompensationResult;
}

export default function ResultsDisplay({ results }: ResultsDisplayProps) {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold text-[#003b5c] text-center">Jouw compensatie resultaten</h2>

      {/* Basisbeurs */}
      <div className="bg-[#e9f7fd] p-4 rounded-md space-y-2 shadow-md">
        <div className="flex items-center gap-2">
          {results.isEligibleForBasicGrant ? (
            <CheckCircle className="w-5 h-5 text-green-500" />
          ) : (
            <XCircle className="w-5 h-5 text-red-500" />
          )}
          <h3 className="font-medium text-[#003b5c]">Basisbeurs</h3>
          <Tooltip
            content={`€34,17 p/m, max. €1640,16. Vereisten:
- Startjaar 2015-2023
- Min. 12 maanden financiering
- Diploma binnen 10 jaar`}
          />
        </div>
        <p className="text-2xl font-bold text-[#003b5c]">€{results.basicGrantAmount.toFixed(2)}</p>
      </div>

      {/* Studievoucher */}
      <div className="bg-[#e9f7fd] p-4 rounded-md space-y-2 shadow-md">
        <div className="flex items-center gap-2">
          {results.isEligibleForVoucher ? (
            <CheckCircle className="w-5 h-5 text-green-500" />
          ) : (
            <XCircle className="w-5 h-5 text-red-500" />
          )}
          <h3 className="font-medium text-[#003b5c]">Studievoucher</h3>
          <Tooltip
            content={`€2097,08. Vereisten:
- Startjaar 2015-2019
- Diploma binnen 10 jaar`}
          />
        </div>
        <p className="text-2xl font-bold text-[#003b5c]">€{results.voucherAmount.toFixed(2)}</p>
      </div>

      {/* Totale Compensatie */}
      <div className="bg-[#ff6a13]/10 p-4 rounded-md space-y-2 shadow-md">
        <div className="flex items-center gap-2">
          <EuroIcon className="w-5 h-5 text-[#ff6a13]" />
          <h3 className="font-medium text-[#003b5c]">Totale Compensatie</h3>
          <Tooltip
            content={`Totaal: Basisbeurs (€${results.basicGrantAmount.toFixed(
              2
            )}) + Studievoucher (€${results.voucherAmount.toFixed(2)}).`}
          />
        </div>
        <p className="text-3xl font-bold text-[#ff6a13]">€{results.totalAmount.toFixed(2)}</p>
      </div>

      {/* Donation Button */}
      <DonationButton />
    </div>
  );
}
