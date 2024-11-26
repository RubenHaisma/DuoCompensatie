export interface StudentInfo {
  studyStartYear: number;
  graduationYear: number;
  receivedStudentFinance: boolean;
  monthsWithFinance: number;
}

export interface CompensationResult {
  basicGrantAmount: number;
  voucherAmount: number;
  totalAmount: number;
  isEligibleForBasicGrant: boolean;
  isEligibleForVoucher: boolean;
}