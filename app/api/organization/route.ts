import { PrismaClient } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();

    const {
      organizationName,
      industry,
      focusArea,
      interestedArea,
      organizationType,
      city,
      state,
      country,
      email,
      phoneNumberOne,
      addressType,
      tradeLicence,
    } = data;

    // Check for existing email
    const existingEmail = await prisma.contactInfo.findUnique({
      where: { email },
    });

    if (existingEmail) {
      return NextResponse.json(
        { message: 'Email is already registered' },
        { status: 400 }
      );
    }

    // Check for existing phone number
    const existingPhone = await prisma.contactInfo.findFirst({
      where: { phoneNumberOne },
    });

    if (existingPhone) {
      return NextResponse.json(
        { message: 'Phone number is already registered' },
        { status: 400 }
      );
    }

    // Create new organization, contact, and address info
    const organizationInfo = await prisma.organizationInfo.create({
      data: {
        organizationName,
        industry,
        organizationType,
        focusArea: focusArea.join(','), // Save as comma-separated string
        interestArea: interestedArea.join(','), // Save as comma-separated string
      },
    });

    await prisma.contactInfo.create({
      data: {
        email,
        phoneNumberOne,
        organizationInfo: { connect: { id: organizationInfo.id } },
      },
    });

    await prisma.addressInfo.create({
      data: {
        city,
        state,
        country,
        addressType,
        organizationInfo: { connect: { id: organizationInfo.id } },
      },
    });

    return NextResponse.json(
      { message: 'Organization registered successfully!' },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error saving data:', error);
    return NextResponse.json(
      { message: 'Failed to save organization data.' },
      { status: 500 }
    );
  }
}
