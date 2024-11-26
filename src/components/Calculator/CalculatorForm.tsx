import React from 'react';
import { useForm } from 'react-hook-form';
import { StudentInfo } from '../../types/calculator';
import { calculateCompensation } from '../../utils/calculations';
import FormFields from './FormFields';
import ResultsDisplay from './ResultsDisplay';
import InfoSection from './InfoSection';
import DonationButton from '../Payment/DonationButton';

export default function CalculatorForm() {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<StudentInfo>();

  const [results, setResults] = React.useState<null | ReturnType<typeof calculateCompensation>>(null);

  const onSubmit = (data: StudentInfo) => {
    setResults(calculateCompensation(data));
  };

  // Watch fields
  const receivedFinance = watch('receivedStudentFinance');
  const studyStartYear = watch('studyStartYear');
  const graduationYear = watch('graduationYear');

  // Calculate Aantal Maanden Financiering dynamically
  React.useEffect(() => {
    if (receivedFinance && studyStartYear && graduationYear) {
      const months = Math.max((graduationYear - studyStartYear) * 12, 0);
      setValue('monthsWithFinance', months);
    }
  }, [receivedFinance, studyStartYear, graduationYear, setValue]);

  return (
    <div className="space-y-6">
      <div className="duo-card">
        <h2 className="text-xl font-bold mb-6">Bereken jouw compensatie</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <FormFields
            register={register}
            errors={errors}
            receivedFinance={receivedFinance}
          />
          <div className="flex justify-end">
            <button type="submit" className="duo-button">
              Bereken compensatie
            </button>
          </div>
        </form>
      </div>

      {results && (
        <div className="duo-card">
          <ResultsDisplay results={results} />
        </div>
      )}

      <div className="duo-card">
        <InfoSection />
      </div>

      <div className="duo-card">
        <DonationButton />
      </div>
    </div>
  );
}
