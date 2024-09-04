// pages/api/mediaInfo.ts

import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function POST(req: Request): Promise<NextResponse> {
    

    try {

        const { name, 
            description, 
            platform, 
            contentGenre, 
            contactInfoIds, 
            addressInfoIds, 
            documentInfoIds } = await req.json();
      const newMediaInfo = await prisma.mediaInfo.create({
        data: {
          name,
          description,
          platform,
          contentGenre,
          contactInfo: {
            connect: contactInfoIds?.map((id: number) => ({ id })) || [],
          },
          addressInfo: {
            connect: addressInfoIds?.map((id: number) => ({ id })) || [],
          },
          documentInfo: {
            connect: documentInfoIds?.map((id: number) => ({ id })) || [],
          },
        },
      });

      return NextResponse.json(
        { message: "media registered successfully" },
        { status: 201 }
      );
    } catch (error) {
        return NextResponse.json(
            { message: "media registered successfully" },
            { status: 201 }
          );    }
  }  
