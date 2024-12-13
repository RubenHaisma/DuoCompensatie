/*
  Warnings:

  - You are about to drop the column `amount` on the `CalculatorEntry` table. All the data in the column will be lost.
  - Added the required column `basicGrantAmount` to the `CalculatorEntry` table without a default value. This is not possible if the table is not empty.
  - Added the required column `isEligibleForBasicGrant` to the `CalculatorEntry` table without a default value. This is not possible if the table is not empty.
  - Added the required column `isEligibleForVoucher` to the `CalculatorEntry` table without a default value. This is not possible if the table is not empty.
  - Added the required column `totalAmount` to the `CalculatorEntry` table without a default value. This is not possible if the table is not empty.
  - Added the required column `voucherAmount` to the `CalculatorEntry` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "CalculatorEntry" DROP COLUMN "amount",
ADD COLUMN     "basicGrantAmount" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "isEligibleForBasicGrant" BOOLEAN NOT NULL,
ADD COLUMN     "isEligibleForVoucher" BOOLEAN NOT NULL,
ADD COLUMN     "totalAmount" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "voucherAmount" DOUBLE PRECISION NOT NULL;
