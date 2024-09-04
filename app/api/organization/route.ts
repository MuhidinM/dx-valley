// pages/api/organizationInfo/index.ts

import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function POST(req: Request): Promise<NextResponse> {

    try {
        const {
            name,
            industry,
            focusArea,
            interestArea,
            tradeLicense,
            organizationType,
            contactInfo,
            addressInfo,
            documentInfo,
          } = await req.json();

      
      // Create OrganizationInfo with related records
      const organizationInfo = await prisma.organizationInfo.create({
        data: {
          name,
          industry,
          focusArea,
          interestArea,
          tradeLicense,
          organizationType,
          contactInfo: {
            create: contactInfo, // Array of ContactInfo objects
          },
          addressInfo: {
            create: addressInfo, // Array of AddressInfo objects
          },
          documentInfo: {
            create: documentInfo, // Array of DocumentInfo objects
          },
        },
        include: {
          contactInfo: true,
          addressInfo: true,
          documentInfo: true,
        },
      });

      return NextResponse.json(
        { message: "Organization registered successfully" },
        { status: 201 }
      );    } catch (error) {
      console.error(error);
      return NextResponse.json(
        { message: "Organization registered successfully" },
        { status: 201 }
      );    }
  } 