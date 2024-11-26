import React from 'react';
import { UseFormRegister, FieldErrors } from 'react-hook-form';
import { StudentInfo } from '../../types/calculator';
import Tooltip from '../UI/Tooltip';

interface FormFieldsProps {
  register: UseFormRegister<StudentInfo>;
  errors: FieldErrors<StudentInfo>;
  receivedFinance: boolean;
}

export default function FormFields({ register, errors, receivedFinance }: FormFieldsProps) {
  return (
    <div className="space-y-6">
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label className="flex items-center gap-2 text-sm font-medium text-duo-gray mb-2">
            Startjaar studie
            <Tooltip content="Het jaar waarin je bent begonnen met studeren (2015-2023)" />
          </label>
          <input
            type="number"
            {...register('studyStartYear', {
              required: true,
              min: 2015,
              max: 2023,
            })}
            className="duo-input"
          />
          {errors.studyStartYear && (
            <p className="mt-1 text-sm text-red-600">
              Vul een geldig jaar in tussen 2015 en 2023
            </p>
          )}
        </div>

        <div>
          <label className="flex items-center gap-2 text-sm font-medium text-duo-gray mb-2">
            Afstudeerjaar
            <Tooltip content="Je werkelijke of verwachte afstudeerjaar" />
          </label>
          <input
            type="number"
            {...register('graduationYear', {
              required: true,
              min: 2015,
            })}
            className="duo-input"
          />
        </div>
      </div>

      <div>
        <label className="flex items-center gap-2 mb-4">
          <input
            type="checkbox"
            {...register('receivedStudentFinance')}
            className="rounded border-gray-300 text-duo-blue focus:ring-duo-blue"
          />
          <span className="text-sm font-medium text-duo-gray">
            Studiefinanciering ontvangen
          </span>
          <Tooltip content="Heb je studiefinanciering ontvangen?" />
        </label>
      </div>

      {receivedFinance && (
        <div>
          <label className="flex items-center gap-2 text-sm font-medium text-duo-gray mb-2">
            Aantal maanden financiering
            <Tooltip content="Aantal maanden dat je studiefinanciering hebt ontvangen" />
          </label>
          <input
            type="number"
            {...register('monthsWithFinance', {
              required: true,
              min: 0,
            })}
            className="duo-input"
          />
        </div>
      )}
    </div>
  );
}
