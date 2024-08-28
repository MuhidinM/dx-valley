import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req: Request): Promise<NextResponse> {
  try {
    const { Fullname, email, Phonenumber, category, description, type} =
      await req.json();

    const newCollab = await prisma.collaborationOpportunity.create({
      data: {
        Fullname,
        email,
        Phonenumber,
        category,
        description,
        type,
      },
    });

    return NextResponse.json(
      { message: "collaborator registered", event: newCollab },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Error:", error.message, error.stack, error.code);
    return NextResponse.json(
      { message: "An error occurred while registering" },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
