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
      // service: "Gmail",
      host: "mail.dxvalley.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.SMTP_USERNAME_for_subscription,
        pass: process.env.SMTP_PASSWORD_for_subscription,
      },
    });

    const mailOptionsToUser = {
      from: "subscribe@dxvalley.com",
      to: email,
      subject: "Subscribed to DxValley",
      // html: `<p>Dear ${email},</p>
      //   <p>You are receiving this email because you subscribed to our newsletter.</p>
      //   <p>Best regards,<br/>Dx-VALLEY</p>`,
      html: `<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
    <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f8f8f8; border-radius: 5px;">
        <tr>
            <td style="padding: 20px;">
                <h1 style="color: #4a4a4a; text-align: center;">Thank You for Subscribing!</h1>
                <p style="text-align: center;">
                    <img src="/image/dxvalleylogo.png" alt="Dxvalley" style="width: 60px; height: 60px;">
                </p>
                <p>Dear ${email},</p>
                <p>We're thrilled to have you join our community! Your subscription has been successfully confirmed, and you're now part of our inner circle.</p>
                <p>Here's what you can expect:</p>
                <ul>
                    <li>Exclusive content delivered straight to your inbox</li>
                    <li>Early access to new features and products</li>
                    <li>Special offers and discounts for subscribers only</li>
                </ul>
                <p>If you have any questions or need assistance, please don't hesitate to reach out to our support team.</p>
                <p>Best regards,<br>The Dx Valley Team</p>
                <div style="text-align: center; margin-top: 20px;">
                    <a href="#" style="display: inline-block; padding: 10px 20px; background-color: #4CAF50; color: white; text-decoration: none; border-radius: 5px;">Visit Our Website</a>
                </div>
                <p style="font-size: 12px; color: #888; text-align: center; margin-top: 20px;">
                    You received this email because you subscribed to DxValley newsletter. If you believe this is an error, please <a href="#" style="color: #888;">unsubscribe here</a>.
                </p>
            </td>
        </tr>
    </table>
</body>
`,
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

export async function GET(): Promise<NextResponse> {
  try {
    const subscribers = await prisma.subscriber.findMany();
    return NextResponse.json({ subscribers }, { status: 200 });
  } catch (error: any) {
    console.error(
      "Error retrieving subscribers:",
      error.message,
      error.stack,
      error.code
    );
    return NextResponse.json(
      { message: "An error occurred while retrieving subscribers" },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
