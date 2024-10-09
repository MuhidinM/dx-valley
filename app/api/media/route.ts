import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(req: Request): Promise<NextResponse> {
  
    const host = req.headers.get("host") || ""; // Ensure we get the header properly

    // Check if the host is '169.254.169.254' and return a 403 response
    if (host === "169.254.169.254") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

  try {
    const {
      mediaName,
      description,
      platform, // Expecting an array of strings
      genre, // Expecting an array of strings
      city,
      state,
      country,
      email,
      phoneNumberOne,
    } = await req.json();

    // Convert arrays to comma-separated strings
    const platformString = platform.join(",");
    const genreString = genre.join(",");

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

    // Create or update records
    const mediaInfo = await prisma.mediaInfo.create({
      data: {
        mediaName,
        description,
        contentGenre: genreString, // Save as a comma-separated string
        platform: platformString, // Save as a comma-separated string
      },
    });

    const contactInfo = await prisma.contactInfo.create({
      data: {
        email,
        phoneNumberOne,
        MediaInfo: { connect: { id: mediaInfo.id } },
      },
    });

    const addressInfo = await prisma.addressInfo.create({
      data: {
        city,
        state,
        country,
        addressType: "residential", // Default value or handle as needed
        MediaInfo: { connect: { id: mediaInfo.id } },
      },
    });

    return NextResponse.json(
      { message: "Your media registration was successful" },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error saving data:", error);
    return NextResponse.json(
      { message: "Error registering media. Please try again.", error },
      { status: 500 }
    );
  }
}

export async function GET(): Promise<NextResponse> {
  try {
    const media = await prisma.mediaInfo.findMany();
    return NextResponse.json({ media }, { status: 200 });
  } catch (error: any) {
    console.error(
      "Error retrieving media:",
      error.message,
      error.stack,
      error.code
    );
    return NextResponse.json(
      { message: "An error occurred while retrieving media" },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
