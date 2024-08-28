import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req: Request): Promise<NextResponse> {
  try {
    const {
      teamLeaderName,
      email,
      phoneNumber,
      teamName,
      numberOfMembers,
      teamMembers,
      projectTitle,
      projectDescription,
      techStack,
      projectUrl,
    } = await req.json();

    const newParticipant = await prisma.contestParticipant.create({
      data: {
        teamLeaderName,
        email,
        phoneNumber,
        teamName,
        numberOfMembers,
        teamMembers: teamMembers.join(","), // Convert array to comma-separated string
        projectTitle,
        projectDescription,
        techStack,
        projectUrl,
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
