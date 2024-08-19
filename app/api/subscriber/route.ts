import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
export async function POST(req: Request): Promise<NextResponse> {
  try {
    const { email } = await req.json();
    const newSubscriber = await prisma.subscriber.create({
      data: {
        email,
      },
    });
    return NextResponse.json(
      { message: "subscribed!", event: newSubscriber },
      { status: 201 }
    );
  } catch (error: any) {
    console.error(
      "Error while subscribing:",
      error.message,
      error.stack,
      error.code
    );
    return NextResponse.json(
      { message: "An error occurred while subscribing" },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
