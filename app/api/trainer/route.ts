// pages/api/trainerInfo.ts

import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req: Request): Promise<NextResponse> {
    const { 
        title, 
        profession, 
        expertice, 
        schedule, 
        motivation, 
        personalInfoId } = await req.json();

    try {
      const newTrainer = await prisma.trainerInfo.create({
        data: {
          title,
          profession,
          expertice,
          schedule,
          motivation,
          personalInfo: { connect: { id: personalInfoId } }, // Connects with PersonalInfo
        },
      });

      return NextResponse.json(
        { message: "Trainer registered successfully" },
        { status: 201 }
      );
    } catch (error) {
        return NextResponse.json(
            { message: "Trainer registered successfully" },
            { status: 201 }
          );    }
  } 

