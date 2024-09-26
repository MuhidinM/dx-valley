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
      html: `
      <tr>
  <td style="padding: 20px;">
    <p style="text-align: center;">
      <img src='cid:unique@dxvalleylogo1.png' alt="Dxvalley" style="height: 100px;">
    </p>
    <h1 style="color: #4a4a4a; text-align: center;">Thank You for Subscribing! </h1>
    <p><strong>Dear ${email}</strong>,</p>
    <p>We're thrilled to have you join our community! Your subscription has been successfully confirmed, and you're now part of our inner circle.</p>
    <p>Here's what you can expect:</p>
    <ul>
      <li>Exclusive content delivered straight to your inbox</li>
      <li>Early access to new features and products</li>
    </ul>
    <p>If you have any questions or need assistance, please don't hesitate to reach out to our support team at info@dxvalley.com.</p>
    <p>Best regards,<br>The Dx Valley Team</p>
    <div style="text-align: center; margin-top: 20px;">
      <a href="dxvalley.com" style="display: inline-block; padding: 10px 20px; background-color: #00adef; color: white; text-decoration: none; border-radius: 5px;">Visit Our Website</a>
    </div>
  </td>
</tr>
<tr>
  <td style="padding: 24px; text-align: center; background-color: #f9f9f9; border-bottom-left-radius: 8px; border-bottom-right-radius: 8px;">
    <p style="margin: 0; font-size: 12px; line-height: 18px; color: #999999;">
      &copy; ${new Date().getFullYear()} Dx Valley. All rights reserved.
    </p>

    <p style="font-size: 12px; color: #888; text-align: center; margin-top: 20px;">
      You received this email because you subscribed to the DxValley newsletter. If you believe this is an error, please <a href="http://${
        process.env.SERVER_URL
      }/newapi/unsubscribe?email=${email}" style="color: #888; text-decoration: underline;">unsubscribe</a> here.
    </p>
  </td>
</tr>

 `,
      attachments: [
        {
          filename: "dxvalleylogo1.png",
          path: "./public/image/dxvalleylogo1.png",
          cid: "unique@dxvalleylogo1.png",
        },
      ],
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
