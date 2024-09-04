import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();
interface TeamMember {
  name: string;
  personalInfo: {
    firstName: string;
    lastName: string;
  };
  contactInfo: {
    email: string;
    phoneNumberOne: string;
  };
}

export async function POST(req: Request): Promise<NextResponse> {
  try {
    const {
      expo,
      companyName,
      jobTitle,
      participantType,
      eventId,
      setup,
      presentation,
      teamMembers,
      project,
      haveATeam,
    } = await req.json();

    let exposetupId = null;
    let expopresentationId = null;
    let expoprojectId = null;

    // Create ContactInfo
    const expoContactInfo = await prisma.contactInfo.create({
      data: {
        email: expo.contactInfo.email,
        phoneNumberOne: expo.contactInfo.phoneNumberOne,
      },
    });

    const expopersonalInfo = await prisma.personalInfo.create({
      data: {
        firstName: expo.personalInfo.firstName,
        lastName: expo.personalInfo.lastName,
      },
    });

    if (participantType === "Speaker") {
      const expopresentation = await prisma.presentation.create({
        data: {
          presentationTitle: presentation.presentationTitle,
          presentationAbstract: presentation.presentationAbstract,
        },
      });
      expopresentationId = expopresentation.id;
    }

    if (participantType === "Exhibitor") {
      const expoProject = await prisma.project.create({
        data: {
          projectTitle: project.productName,
          projectDescription: project.productDescription,
          websiteUrl: project.websiteUrl,
        },
      });
      const exposetup = await prisma.setupRequirements.create({
        data: {
          description: setup.setupRequirements,
        },
      });
      expoprojectId = expoProject.id;
      exposetupId = exposetup.id;
    }

    const newexpoParticipant = await prisma.expoParticipant.create({
      data: {
        companyName,
        jobTitle,
        participantType,
        eventId: parseInt(eventId, 10),
        contactInfo: {
          connect: { id: expoContactInfo.id },
        },
        personalInfoId: expopersonalInfo.id,
        setupId: exposetupId,
        presentationId: expopresentationId,
        projectId: expoprojectId,
        haveateam: haveATeam,
      },
      include: {
        contactInfo: true,
        personalInfo: true,
        project: true,
        setupRequirements: true,
        presentation: true,
      },
    });

    const memberPromises = teamMembers.map(async (member: TeamMember) => {
      const memberContactInfo = await prisma.contactInfo.create({
        data: {
          email: member.contactInfo.email,
          phoneNumberOne: member.contactInfo.phoneNumberOne,
        },
      });
      const memberPersonalInfo = await prisma.personalInfo.create({
        data: {
          firstName: member.personalInfo.firstName,
          lastName: member.personalInfo.lastName,
        },
      });

      return prisma.expoMembers.create({
        data: {
          teamId: newexpoParticipant.id,
          contactInfo: {
            connect: { id: memberContactInfo.id },
          },
          teammemberpersonalInfo: memberPersonalInfo.id,
        },
        include: {
          contactInfo: true,
          personalInfo: true,
        },
      });
    });

    await Promise.all(memberPromises);

    return NextResponse.json(
      { message: "Participant registered successfully", newexpoParticipant },
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
