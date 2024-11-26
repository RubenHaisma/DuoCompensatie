import { StudentInfo, CompensationResult } from '../types/calculator';

const MONTHLY_GRANT_AMOUNT = 34.17;
const MAX_BASIC_GRANT = 1640.16;
const VOUCHER_AMOUNT = 2097.08;

export function calculateCompensation(info: StudentInfo): CompensationResult {
  const isEligibleForBasicGrant = checkBasicGrantEligibility(info);
  const isEligibleForVoucher = checkVoucherEligibility(info);

  const basicGrantAmount = isEligibleForBasicGrant
    ? Math.min(info.monthsWithFinance * MONTHLY_GRANT_AMOUNT, MAX_BASIC_GRANT)
    : 0;

  const voucherAmount = isEligibleForVoucher ? VOUCHER_AMOUNT : 0;

  return {
    basicGrantAmount,
    voucherAmount,
    totalAmount: basicGrantAmount + voucherAmount,
    isEligibleForBasicGrant,
    isEligibleForVoucher,
  };
}

function checkBasicGrantEligibility(info: StudentInfo): boolean {
  const withinTimeframe = info.studyStartYear >= 2015 && info.studyStartYear <= 2023;
  const sufficientFinance = info.receivedStudentFinance && info.monthsWithFinance >= 12;
  const withinDiplomaTerm = info.graduationYear - info.studyStartYear <= 10;

  return withinTimeframe && sufficientFinance && withinDiplomaTerm;
}

function checkVoucherEligibility(info: StudentInfo): boolean {
  const startedBetween2015And2019 =
    info.studyStartYear >= 2015 && info.studyStartYear <= 2019;
  const withinDiplomaTerm = info.graduationYear - info.studyStartYear <= 10;

  return startedBetween2015And2019 && withinDiplomaTerm;
}