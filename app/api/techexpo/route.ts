import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(req: Request): Promise<NextResponse> {
  try {
    const {
      fullName,
      email,
      phoneNumber,
      companyName,
      jobTitle,
      participantType,
      setupRequirements,
      presentationTitle,
      presentationAbstract,
      productName,
      productDescription,
      websiteUrl,
    } = await req.json();

    const newParticipant = await prisma.expoParticipant.create({
      data: {
        fullName,
        email,
        phoneNumber,
        companyName,
        jobTitle,
        participantType,
        setupRequirements,
        presentationTitle,
        presentationAbstract,
        productName,
        productDescription,
        websiteUrl,
      },
    });
    return NextResponse.json(
      { message: "Participant registered successfully", newParticipant },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error registering participant:", error);
    return NextResponse.json(
      { error: "Failed to register participant" },
      { status: 500 }
    );
  }
}
