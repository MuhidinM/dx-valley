import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req: Request): Promise<NextResponse> {
    const host = req.headers.get("host") || ""; // Ensure we get the header properly

    // Check if the host is '169.254.169.254' and return a 403 response
    if (host === "169.254.169.254") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

  try {
    const { name, description, targetDate, category } = await req.json();

    const newEvent = await prisma.event.create({
      data: {
        name,
        description,
        targetDate: new Date(targetDate),
        category,
      },
    });

    return NextResponse.json(
      { message: "Event registered", event: newEvent },
      { status: 201 }
    );
  } catch (error: any) {
    console.error(
      "Error creating event:",
      error.message,
      error.stack,
      error.code
    );
    return NextResponse.json(
      { message: "An error occurred while creating the event" },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}

export async function GET(): Promise<NextResponse> {
  
  try {
    const events = await prisma.event.findMany();

    return NextResponse.json(events, { status: 200 });
  } catch (error: any) {
    console.error("Error fetching events:", error);

    return NextResponse.json(
      { message: "Error fetching events", error: error.message },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
