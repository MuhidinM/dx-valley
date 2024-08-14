import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req) {
  try {
    // Parse the incoming JSON data
    const { name, description, targetDate, category } = await req.json();

    // Insert the new event into the PostgreSQL database using Prisma
    const newEvent = await prisma.event.create({
      data: {
        name,
        description,
        targetDate: new Date(targetDate), // Ensure targetDate is a Date object
        category,
      },
    });

    // Return a success response with status 201 (Created)
    return NextResponse.json(
      { message: "Event registered", event: newEvent },
      { status: 201 }
    );
  } catch (error) {
    console.error(
      "Error creating event:",
      error.message,
      error.stack,
      error.code
    );

    // Return an error response with status 500 (Internal Server Error)
    return NextResponse.json(
      { message: "An error occurred while creating the event" },
      { status: 500 }
    );
  } finally {
    // Disconnect Prisma to free up resources
    await prisma.$disconnect();
  }
}

export async function GET() {
  try {
    const events = await prisma.event.findMany();

    return NextResponse.json(events, { status: 200 });
  } catch (error) {
    console.error("Error fetching events:", error);

    return NextResponse.json(
      { message: "Error fetching events", error: error.message },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
