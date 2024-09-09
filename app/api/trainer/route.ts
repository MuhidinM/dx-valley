import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(req: Request): Promise<NextResponse> {
  try {
    const {
      title,
      profession,
      expertise,
      schedule,
      motivation,
      country,
      city,
      state,
      firstName,
      lastName,
      email,
      phoneNumberOne,
    } = await req.json();

    // Validate required fields
    if (!firstName || !email || !phoneNumberOne) {
      return NextResponse.json(
        { message: "All required fields must be provided." },
        { status: 400 }
      );
    }

    // Check if the email is already registered
    const existingEmail = await prisma.contactInfo.findUnique({
      where: { email },
    });

    if (existingEmail) {
      return NextResponse.json(
        { message: "Email is already registered" },
        { status: 400 }
      );
    }

    // Check if the phone number is already registered
    const existingPhone = await prisma.contactInfo.findFirst({
      where: { phoneNumberOne },
    });

    if (existingPhone) {
      return NextResponse.json(
        { message: "Phone number is already registered" },
        { status: 400 }
      );
    }

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

    // Create the TrainerInfo with default values
    const trainerInfo = await prisma.trainerInfo.create({
      data: {
        title,
        profession,
        expertise,
        schedule,
        motivation,
        personalInfo: { connect: { id: personalInfo.id } },
      },
    });

    return NextResponse.json(
      { message: "Trainer registered successfully" },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error saving data:", error);
    return NextResponse.json(
      { message: "Error registering trainer", error },
      { status: 500 }
    );
  }
}

export async function GET(): Promise<NextResponse> {
  try {
    const Trainers = await prisma.trainerInfo.findMany();
    return NextResponse.json({ Trainers }, { status: 200 });
  } catch (error: any) {
    console.error(
      "Error retrieving Trainers:",
      error.message,
      error.stack,
      error.code
    );
    return NextResponse.json(
      { message: "An error occurred while retrieving Trainers" },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
