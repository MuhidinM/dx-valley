import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function POST(req: Request): Promise<NextResponse> {
  try {
    const {
      firstName,
      lastName,
      email,
      phoneNumberOne,
      city,
      state,
      country,
      addressType,
      focusArea = [], // Provide default empty array if undefined
      interestArea = [], // Provide default empty array if undefined
    } = await req.json();

    // Create the PersonalInfo
    const personalInfo = await prisma.personalInfo.create({
      data: {
        firstName,
        lastName,
      },
    });

    // Create the ContactInfo and link to PersonalInfo
    const contactInfo = await prisma.contactInfo.create({
      data: {
        email,
        phoneNumberOne,
        personalInfo: { connect: { id: personalInfo.id } },
      },
    });

    // Create the AddressInfo and link to PersonalInfo
    const addressInfo = await prisma.addressInfo.create({
      data: {
        city,
        state,
        country,
        addressType: "residental",
        personalInfo: { connect: { id: personalInfo.id } },
      },
    });

    // Finally, create the IndependentPartnerInfo
    const independentPartner = await prisma.independentPartnerInfo.create({
      data: {
        focusArea: focusArea.join(', '), // Ensure it's an array before calling join
        interestArea: interestArea.join(', '), // Ensure it's an array before calling join
        personalInfo: { connect: { id: personalInfo.id } },
      },
    });

    return NextResponse.json(
      { message: 'Partner registered successfully' },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error saving data:', error);
    return NextResponse.json(
      { message: 'Error registering partner', error },
      { status: 500 }
    );
  }
}


