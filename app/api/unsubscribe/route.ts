import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(req: Request): Promise<NextResponse> {
  const { searchParams } = new URL(req.url);
  const email = searchParams.get("email");

  if (!email) {
    // Handle the case where email is not provided
    return NextResponse.json({
      message: "Email is required",
      unsubscribed: false,
    });
  }

  try {
    // Find the subscriber by email
    const subscriber = await prisma.subscriber.findUnique({
      where: { email },
    });

    if (!subscriber) {
      return NextResponse.json({
        message: "Subscriber not found",
        unsubscribed: false,
      });
    }

    // Update the subscriber's status to false (unsubscribe)
    await prisma.subscriber.update({
      where: { email },
      data: { status: false },
    });

    return NextResponse.json({
      message: "Unsubscribed successfully",
      unsubscribed: true,
    });
  } catch (error: any) {
    console.error("Error handling unsubscribe:", error.message, error.stack);
    return NextResponse.json({
      message: "An error occurred while unsubscribing",
      unsubscribed: false,
    });
  }
}
