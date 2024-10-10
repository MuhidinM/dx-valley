import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(req: Request): Promise<NextResponse> {

    const host = req.headers.get("host") || ""; // Ensure we get the header properly

    // Check if the host is '169.254.169.254' and return a 403 response
    if (host === "169.254.169.254") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

  const { searchParams } = new URL(req.url);
  const email = searchParams.get("email");

  if (!email) {
    return NextResponse.json({
      message: "Email is required",
      unsubscribed: false,
    });
  }

  try {
    const subscriber = await prisma.subscriber.findUnique({
      where: { email },
    });

    if (!subscriber) {
      return NextResponse.json({
        message: "Subscriber not found",
        unsubscribed: false,
      });
    }

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
