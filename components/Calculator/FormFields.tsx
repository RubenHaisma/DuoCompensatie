import React from 'react';
import { UseFormRegister, FieldErrors } from 'react-hook-form';
import { StudentInfo } from '../../types/calculator';
import Tooltip from '@/components/UI/Tooltip';

interface FormFieldsProps {
  register: UseFormRegister<StudentInfo>;
  errors: FieldErrors<StudentInfo>;
  receivedFinance: boolean;
  currentStep: number;
}

export default function FormFields({ register, errors, receivedFinance, currentStep }: FormFieldsProps) {
  const renderStep1 = () => (
    <div className="form-step">
      <div>
        <div className="relative">
          <input
            type="number"
            {...register('studyStartYear', {
              required: true,
              min: 2015,
              max: 2023,
            })}
            className="duo-input"
            placeholder="Bijvoorbeeld: 2015"
          />
          <div className="absolute right-3 top-3">
            <Tooltip content="Het jaar waarin je bent begonnen met studeren (2015-2023)" />
          </div>
        </div>
        {errors.studyStartYear && (
          <p className="mt-2 text-sm text-red-600">
            Vul een geldig jaar in tussen 2015 en 2023
          </p>
        )}
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="form-step">
      <div>
        <div className="relative">
          <input
            type="number"
            {...register('graduationYear', {
              required: true,
              min: 2015,
            })}
            className="duo-input"
            placeholder="Bijvoorbeeld: 2020"
          />
          <div className="absolute right-3 top-3">
            <Tooltip content="Je werkelijke of verwachte afstudeerjaar" />
          </div>
        </div>
        {errors.graduationYear && (
          <p className="mt-2 text-sm text-red-600">
            Vul een geldig afstudeerjaar in (vanaf 2015)
          </p>
        )}
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div className="form-step">
      <div>
        <label className="flex items-center gap-3 mb-6 cursor-pointer group">
          <input
            type="checkbox"
            {...register('receivedStudentFinance')}
            className="w-5 h-5 rounded border-gray-300 text-blue-600 
                     focus:ring-blue-500 focus:ring-2 focus:ring-offset-2"
          />
          <span className="text-gray-700 group-hover:text-gray-900 transition-colors">
            Ik heb studiefinanciering ontvangen
          </span>
          <Tooltip content="Heb je studiefinanciering ontvangen?" />
        </label>

        {receivedFinance && (
          <div className="mt-6">
            <div className="relative">
              <div className="text-sm text-gray-700">
                Aantal maanden:
              </div>
              <input
                type="number"
                {...register('monthsWithFinance', {
                  required: receivedFinance,
                  min: 0,
                })}
                className="duo-input mt-1"
                placeholder="Bijv. 48"
              />
              <div className="absolute right-3 top-10">
                <Tooltip content="Aantal maanden dat je studiefinanciering hebt ontvangen" />
              </div>
            </div>
            {errors.monthsWithFinance && (
              <p className="mt-2 text-sm text-red-600">
                Vul een geldig aantal maanden in
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );

  switch (currentStep) {
    case 1:
      return renderStep1();
    case 2:
      return renderStep2();
    case 3:
      return renderStep3();
    default:
      return null;
  }
}
