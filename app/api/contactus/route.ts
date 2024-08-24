import { NextRequest, NextResponse } from "next/server";

import nodemailer from "nodemailer";

export async function POST(req: NextRequest) {
  const { name, email, message } = await req.json();

  const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: process.env.SMTP_USERNAME,
      pass: process.env.SMTP_PASSWORD,
    },
  });

  const mailOptionsToAdmin = {
    from: email,
    to: "backend1221@gmail.com",
    subject: `Contact form submission from ${name}`,
    text: message,
    html: `<p><strong>Name:</strong> ${name}</p>
           <p><strong>Email:</strong> ${email}</p>
           <p><strong>Message:</strong> ${message}</p>`,
  };

  const mailOptionsToUser = {
    from: "backend1221@gmail.com",
    to: email,
    subject: "Confirmation: We received your message",
    text: `Dear ${name},\n\nThank you for contacting us. We have received your message and will get back to you shortly.\n\nBest regards,\nDx-VALLEY`,
    html: `<p>Dear ${name},</p>
           <p>Thank you for contacting us. We have received your message and will get back to you shortly.</p>
           <p>Best regards,<br/>Dx-VALLEY</p>`,
  };

  try {
    await transporter.sendMail(mailOptionsToAdmin);
    await transporter.sendMail(mailOptionsToUser);
    return NextResponse.json(
      { message: "Emails sent successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error sending emails:", error);
    return NextResponse.json(
      { message: "Error sending emails" },
      { status: 500 }
    );
  }
}
