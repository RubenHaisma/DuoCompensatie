-- CreateTable
CREATE TABLE "CalculatorEntry" (
    "id" SERIAL NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "CalculatorEntry_pkey" PRIMARY KEY ("id")
);
