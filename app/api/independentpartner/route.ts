// pages/api/independentPartnerInfo.ts

import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function POST(req: Request): Promise<NextResponse> {

    try {

        const { focusArea, interestArea, personalInfoId, documentInfoIds } = await req.json();

      const newIndependentPartner = await prisma.independentPartnerInfo.create({
        data: {
          focusArea,
          interestArea,
          personalInfo: { connect: { id: personalInfoId } }, // Connect with PersonalInfo
          documentInfo: {
            connect: documentInfoIds?.map((id: number) => ({ id })) || [],
          },
        },
      });

      return NextResponse.json(
        { message: "Partner registered successfully" },
        { status: 201 }
      );    } catch (error) {
        return NextResponse.json(
            { message: "partner registered successfully" },
            { status: 201 }
          );    }
   
}
