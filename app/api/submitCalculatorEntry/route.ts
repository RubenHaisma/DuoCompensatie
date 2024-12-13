// app/api/submitCalculatorEntry/route.ts

import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(request: Request) {
    const {
      basicGrantAmount,
      voucherAmount,
      totalAmount,
      isEligibleForBasicGrant,
      isEligibleForVoucher,
      studyStartYear,
      graduationYear,
      monthsWithFinance,
    } = await request.json();
  
    try {
      // Validate numeric fields
      if (
        typeof studyStartYear !== 'number' ||
        typeof graduationYear !== 'number' ||
        typeof monthsWithFinance !== 'number'
      ) {
        throw new Error('Invalid data: studyStartYear, graduationYear, and monthsWithFinance must be numbers.');
      }
  
      const amount = basicGrantAmount + voucherAmount;
  
      const entry = await prisma.calculatorEntry.create({
        data: {
          basicGrantAmount,
          voucherAmount,
          totalAmount,
          isEligibleForBasicGrant,
          isEligibleForVoucher,
          studyStartYear,
          graduationYear,
          monthsWithFinance,
          amount,
        },
      });
  
      return NextResponse.json(entry, { status: 200 });
    } catch (error) {
      console.error('Error creating entry:', error instanceof Error ? error.message : error);
      return NextResponse.json({ error: 'Failed to create entry' }, { status: 500 });
    }
  }
  
  
  