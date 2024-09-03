import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(req: Request): Promise<NextResponse> {
  try {
    const {
      expo,
      companyName,
      jobTitle,
      participantType,
      setupRequirements,
      presentationTitle,
      presentationAbstract,
      productName,
      productDescription,
      websiteUrl,
      eventId,
    } = await req.json();

    // Create ContactInfo
    const expoContactInfo = await prisma.contactInfo.create({
      data: {
        email: expo.contactInfo.email,
        phoneNumberOne: expo.contactInfo.phoneNumberOne,
        phoneNumberTwo: "", // Assuming this field is optional
      },
    });

    const newParticipant = await prisma.expoParticipant.create({
      data: {
        // fullName:expo.contactInfo.name,
        companyName,
        jobTitle,
        participantType,
        setupRequirements,
        presentationTitle,
        presentationAbstract,
        productName,
        productDescription,
        websiteUrl,
        eventId: parseInt(eventId, 10),
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
