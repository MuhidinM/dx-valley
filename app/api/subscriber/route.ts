/** @format */

import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import nodemailer from "nodemailer";

const prisma = new PrismaClient();

export async function POST(req: Request): Promise<NextResponse> {
  try {
    const { email } = await req.json();

    // Check if the email is provided
    if (!email) {
      return NextResponse.json({
        message1: "Email is required",
        subscribed: false,
      });
    }

    // Check if the user is already subscribed
    const existingSubscriber = await prisma.subscriber.findUnique({
      where: { email },
    });

    if (existingSubscriber) {
      return NextResponse.json({
        message2: "User already subscribed",
        subscribed: true,
      });
    }

    // Create new subscriber if not already subscribed
    const newSubscriber = await prisma.subscriber.create({
      data: { email },
    });

    // Send confirmation email to the new subscriber
    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: process.env.SMTP_USERNAME,
        pass: process.env.SMTP_PASSWORD,
      },
    });

    const mailOptionsToUser = {
      from: "backend1221@gmail.com",
      to: email,
      subject: "Subscribed to DxValley",
      html: `<p>Dear ${email},</p>
        <p>You are receiving this email because you subscribed to our newsletter.</p>
        <p>Best regards,<br/>Dx-VALLEY</p>`,
    };

    await transporter.sendMail(mailOptionsToUser);

    return NextResponse.json({
      message3: "Subscribed successfully",
      subscribed: true,
      subscribedData: newSubscriber,
    });
  } catch (error: any) {
    console.error("Error handling subscription:", error.message, error.stack);
    return NextResponse.json({
      message4: "An error occurred during subscription",
      subscribed: false,
    });
  }
}
