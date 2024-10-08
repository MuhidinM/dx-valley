import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { error } from "console";

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
    // Parse the JSON body
    const data = await req.json();
    // console.log(
    //   "Received data:",
    //   data,
    //   "teamMembers:",
    //   data?.teamMembers[0]?.personalInfo,
    //   "teamMembers:",
    //   data?.teamMembers[0]?.contactInfo
    // );

    const {
      teamLeader,
      teamName,
      numberOfMembers,
      teamMembers,
      project,
      eventId,
    } = data;

    if (!teamLeader || !teamName || !project || !eventId) {
      throw new Error("Missing required fields");
    }
    // Check for duplicate ContactInfo for the team leader
    const existingContactInfo = await prisma.contactInfo.findFirst({
      where: {
        OR: [
          { email: teamLeader.contactInfo.email },
          { phoneNumberOne: teamLeader.contactInfo.phoneNumberOne },
        ],
      },
    });

    if (existingContactInfo) {
      return NextResponse.json(
        {
          // error: `Team member with email ${teamLeader.contactInfo.email} already exists`,
          error: "Team member contact info already exists",
        },
        { status: 409 }
      );
    }

    // Create ContactInfo for the team leader
    const leaderContactInfo = await prisma.contactInfo.create({
      data: {
        email: teamLeader.contactInfo.email,
        phoneNumberOne: teamLeader.contactInfo.phoneNumberOne,
      },
    });
    const leaderpersonalInfo = await prisma.personalInfo.create({
      data: {
        firstName: teamLeader.personalInfo.firstName,
        lastName: teamLeader.personalInfo.lastName,
      },
    });

    const contestProject = await prisma.project.create({
      data: {
        projectTitle: project.projectTitle,
        projectDescription: project.projectDescription,
        techStack: project.techStack,
        projectUrl: project.projectUrl,
      },
    });

    const newTeam = await prisma.contestParticipant.create({
      data: {
        teamName,
        numberOfMembers,
        eventId: parseInt(eventId, 10),
        contactInfo: {
          connect: { id: leaderContactInfo.id },
        },
        leadrepersonalInfoId: leaderpersonalInfo.id,
        projectId: contestProject.id,
      },
      include: {
        contactInfo: true,
        personalInfo: true,
        project: true,
      },
    });

      const memberPromises = teamMembers.map(async (member: TeamMember) => {
        const existingMemberContactInfo = await prisma.contactInfo.findFirst({
          where: {
            OR: [
              { email: member.contactInfo?.email },
              { phoneNumberOne: member.contactInfo?.phoneNumberOne },
            ],
          },
        });

      if (existingMemberContactInfo) {
        return NextResponse.json(
          {
            error: `Team member with email ${member.contactInfo.email} already exists`,
          },
          { status: 409 }
        );
      }

      const memberContactInfo = await prisma.contactInfo.create({
        data: {
          email: member.contactInfo.email,
          phoneNumberOne: member.contactInfo.phoneNumberOne,
        },
      });
      const memberPersonalInfo = await prisma.personalInfo.create({
        data: {
          firstName: member.personalInfo?.firstName,
          lastName: member.personalInfo?.lastName,
        },
      });

      return prisma.teamMember.create({
        data: {
          teamId: newTeam.id,
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
      { message: "Participant registered successfully", newTeam },
      { status: 201 }
    );
  } catch (error) {
    console.error("Failed to register the contest:", error);
    return NextResponse.json(
      { message: "Failed to register the contest", error },
      { status: 500 }
    );
  }
}
