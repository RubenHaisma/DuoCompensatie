import React from 'react';
import { useForm } from 'react-hook-form';
import { Calculator, Info } from 'lucide-react';
import { StudentInfo } from '../types/calculator';
import { calculateCompensation } from '../utils/calculations';
import Tooltip from './Tooltip';
import ResultsDisplay from './ResultsDisplay';
import DonationButton from './DonationButton';

export default function CalculatorForm() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<StudentInfo>();

  const [results, setResults] = React.useState<null | ReturnType<typeof calculateCompensation>>(null);

  const onSubmit = (data: StudentInfo) => {
    setResults(calculateCompensation(data));
  };

  const receivedFinance = watch('receivedStudentFinance');

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow-xl p-6">
        <div className="flex items-center gap-3 mb-6">
          <Calculator className="w-8 h-8 text-blue-600" />
          <h1 className="text-2xl font-bold text-gray-800">
            Studiefinanciering Compensatie Calculator
          </h1>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-4">
            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                Startjaar Studie
                <Tooltip content="Het jaar waarin je bent begonnen met studeren (2015-2023)" />
              </label>
              <input
                type="number"
                {...register('studyStartYear', {
                  required: true,
                  min: 2015,
                  max: 2023,
                })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
              {errors.studyStartYear && (
                <p className="mt-1 text-sm text-red-600">
                  Vul een geldig jaar in tussen 2015 en 2023
                </p>
              )}
            </div>

            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                Afstudeerjaar
                <Tooltip content="Je werkelijke of verwachte afstudeerjaar" />
              </label>
              <input
                type="number"
                {...register('graduationYear', {
                  required: true,
                  min: 2015,
                })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  {...register('receivedStudentFinance')}
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="text-sm font-medium text-gray-700">
                  Studiefinanciering Ontvangen
                </span>
                <Tooltip content="Heb je studiefinanciering ontvangen?" />
              </label>
            </div>

            {receivedFinance && (
              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                  Aantal Maanden Financiering
                  <Tooltip content="Aantal maanden dat je studiefinanciering hebt ontvangen" />
                </label>
                <input
                  type="number"
                  {...register('monthsWithFinance', {
                    required: receivedFinance,
                    min: 0,
                  })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Bereken Compensatie
          </button>
        </form>

        {results && <ResultsDisplay results={results} />}

        <div className="mt-6 space-y-4">
          <DonationButton />

          <div className="p-4 bg-gray-50 rounded-md">
            <div className="flex items-center gap-2 text-gray-600 mb-2">
              <Info className="w-5 h-5" />
              <h2 className="font-medium">Belangrijke Informatie</h2>
            </div>
            <ul className="text-sm text-gray-600 space-y-2">
              <li>• Compensatie wordt eerst gebruikt om bestaande studieschuld te verminderen</li>
              <li>• Eventueel resterend bedrag wordt binnen zes weken uitbetaald</li>
              <li>• Automatische meldingen starten januari 2024 voor in aanmerking komende afgestudeerden</li>
              <li>
                <a
                  href="https://duo.nl"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  Bezoek de DUO website
                </a>{' '}
                voor meer informatie
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}