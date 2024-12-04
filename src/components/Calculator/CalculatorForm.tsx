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
    trigger,
    formState: { errors },
  } = useForm<StudentInfo>({
    mode: 'onChange'
  });

  const [results, setResults] = React.useState<null | ReturnType<typeof calculateCompensation>>(null);
  const [currentStep, setCurrentStep] = React.useState(1);
  const totalSteps = 3;

  const onSubmit = (data: StudentInfo) => {
    setResults(calculateCompensation(data));
  };

  // Watch fields
  const receivedFinance = watch('receivedStudentFinance');
  const studyStartYear = watch('studyStartYear');
  const graduationYear = watch('graduationYear');

  // Update graduation year when start year changes
  React.useEffect(() => {
    if (studyStartYear) {
      const expectedGraduationYear = Number(studyStartYear) + 4;
      setValue('graduationYear', expectedGraduationYear);
      trigger('graduationYear'); // Validate the new value
    }
  }, [studyStartYear, setValue, trigger]);

  // Calculate Aantal Maanden Financiering dynamically
  React.useEffect(() => {
    if (receivedFinance && studyStartYear && graduationYear) {
      const months = Math.max((graduationYear - studyStartYear) * 12, 0);
      setValue('monthsWithFinance', months);
    }
  }, [receivedFinance, studyStartYear, graduationYear, setValue]);

  const nextStep = async () => {
    const isStepValid = await trigger();
    if (isStepValid) {
      setCurrentStep((prev) => Math.min(prev + 1, totalSteps));
    }
  };

  const prevStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  const handleStepSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (currentStep < totalSteps) {
      await nextStep();
    } else {
      handleSubmit(onSubmit)(e);
    }
  };

  return (
    <div className="space-y-8">
      <div className="duo-card">
        <div className="progress-container">
          <div className="progress-bar">
            <div
              className="progress-fill"
              style={{ width: `${(currentStep / totalSteps) * 100}%` }}
            />
          </div>
          <div className="step-indicator">
            {[1, 2, 3].map((step) => (
              <div
                key={step}
                className={`step-dot ${
                  step === currentStep
                    ? 'active'
                    : step < currentStep
                    ? 'completed'
                    : ''
                }`}
              />
            ))}
          </div>
        </div>

        <div className="text-center mb-8">
          <h2 className="form-title">
            {currentStep === 1
              ? 'Start van je studie'
              : currentStep === 2
              ? 'Afstuderen'
              : 'Studiefinanciering'}
          </h2>
          <p className="form-subtitle">
            {currentStep === 1
              ? 'Wanneer ben je begonnen met studeren?'
              : currentStep === 2
              ? 'Wanneer ben je afgestudeerd of verwacht je af te studeren?'
              : 'Heb je studiefinanciering ontvangen?'}
          </p>
        </div>

        <form onSubmit={handleStepSubmit}>
          <FormFields
            register={register}
            errors={errors}
            receivedFinance={receivedFinance}
            currentStep={currentStep}
          />
          
          <div className="form-navigation">
            {currentStep > 1 && (
              <button
                type="button"
                onClick={prevStep}
                className="duo-button-secondary"
              >
                Vorige
              </button>
            )}
            <div className={currentStep > 1 ? 'ml-auto' : ''}>
              <button
                type="submit"
                className="duo-button"
              >
                {currentStep === totalSteps ? 'Bereken compensatie' : 'Volgende'}
              </button>
            </div>
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
