// /** @format */

// import { NextRequest, NextResponse } from "next/server";
// import { PrismaClient } from "@prisma/client";
// import nodemailer from "nodemailer";
// import path from "path"; // Import path module

// const prisma = new PrismaClient();

// export async function POST(req: NextRequest) {

//     const host = req.headers.get("host") || ""; // Ensure we get the header properly

//     // Check if the host is '169.254.169.254' and return a 403 response
//     if (host === "169.254.169.254") {
//       return NextResponse.json({ error: "Forbidden" }, { status: 403 });
//     }

//   const { name, email, message } = await req.json();

//   // Save the contact form submission to the database
//   try {
//     await prisma.contactUs.create({
//       data: {
//         name,
//         email,
//         message,
//       },
//     });
//   } catch (dbError) {
//     console.error("Error saving contact form submission:", dbError);
//     return NextResponse.json(
//       { message: "Error saving form submission" },
//       { status: 500 }
//     );
//   } finally {
//     await prisma.$disconnect();
//   }

//   // Configure nodemailer transporter
//   const transporter = nodemailer.createTransport({
//     host: "mail.dxvalley.com",
//     port: 465,
//     secure: true,
//     auth: {
//       user: process.env.SMTP_USERNAME_for_info,
//       pass: process.env.SMTP_PASSWORD_for_info,
//     },
//   });

//   // Prepare the email to the user
//   const mailOptionsToUser = {
//     from: "info@dxvalley.com",
//     to: email,
//     subject: "Confirmation: We received your message",
//     html: `
//       <tr>
//         <td style="padding: 20px;">
//           <p style="text-align: center;">
//      <img src='cid:unique@dxvalleylogo1.png' alt="Dx Valley" style="max-width: 100%; height: auto;">
//     </p>
//           <table role="presentation" style="width: 100%; max-width:100%; border-collapse: collapse; background-color: #ffffff; border-radius: 8px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
//             <tr>
//               <td style="padding: 48px 24px; text-align: center;">
//                 <h1 style="margin: 0 0 24px; font-size: 24px; font-weight: bold; color: #333333;">We've Received Your Message</h1>
//                 <p style="margin: 0 0 24px; font-size: 16px; line-height: 24px; color: #666666;">Hello <strong>  ${name}</strong>,</p>
//                 <p style="margin: 0 0 24px; font-size: 16px; line-height: 24px; color: #666666;">Thank you for reaching out. We've received your message and will get back to you shortly.</p>
//                 <table role="presentation" style="width: 100%; border-collapse: collapse; margin-bottom: 24px;">
//                   <tr>
//                     <td style="padding: 24px; background-color: #f0f7ff; border-radius: 8px;">
//                     <h3> Your Message: </h3>
//                   <p style="margin: 0; font-size: 16px; line-height: 24px; color: #0066cc;">${message}</p>
//                     </td>
//                   </tr>
//                 </table>
//                 <p style="margin: 0 0 24px; font-size: 16px; line-height: 24px; color: #666666;">We'll respond to you at: ${email}</p>
//                 <a href="/" style="display: inline-block; padding: 12px 24px; background-color: #00adef; color: #ffffff; text-decoration: none; font-weight: bold; border-radius: 4px;">Visit Our Website</a>
//               </td>
//             </tr>
//             <tr>
//               <td style="padding: 24px; text-align: center; background-color: #f9f9f9; border-bottom-left-radius: 8px; border-bottom-right-radius: 8px;">
//                 <p style="margin: 0; font-size: 12px; line-height: 18px; color: #999999;">&copy; ${new Date().getFullYear()} Dx Valley. All rights reserved.</p>
//               </td>
//             </tr>
//           </table>
//         </td>
//       </tr>
//     `,
//     attachments: [
//       {
//         filename: "dxvalleylogo1.png",
//         path: path.join(process.cwd(), "public", "image", "dxvalleylogo1.png"),
//         cid: "unique@dxvalleylogo1.png",
//       },
//     ],
//   };

//   try {
//     // Send the email to the user
//     await transporter.sendMail(mailOptionsToUser);
//     return NextResponse.json(
//       { message: "Emails sent successfully" },
//       { status: 200 }
//     );
//   } catch (error) {
//     console.error("Error sending emails:", error);
//     return NextResponse.json(
//       { message: "Error sending emails" },
//       { status: 500 }
//     );
//   }
// }

// export async function GET(): Promise<NextResponse> {
//   try {
//     const contact = await prisma.contactUs.findMany();
//     return NextResponse.json({ contact }, { status: 200 });
//   } catch (error: any) {
//     console.error(
//       "Error retrieving contact:",
//       error.message,
//       error.stack,
//       error.code
//     );
//     return NextResponse.json(
//       { message: "An error occurred while retrieving contact" },
//       { status: 500 }
//     );
//   } finally {
//     await prisma.$disconnect();
//   }
// }

/** @format */

import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  const host = req.headers.get("host") || "";

  // Check if the host is '169.254.169.254' and return a 403 response
  if (host === "169.254.169.254") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const { name, email, message } = await req.json();

  // Save the contact form submission to the database
  try {
    await prisma.contactUs.create({
      data: {
        name,
        email,
        message,
      },
    });
    return NextResponse.json(
      { message: "Form submission saved successfully" },
      { status: 200 }
    );
  } catch (dbError) {
    console.error("Error saving contact form submission:", dbError);
    return NextResponse.json(
      { message: "Error saving form submission" },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}

export async function GET(): Promise<NextResponse> {
  try {
    const contact = await prisma.contactUs.findMany();
    return NextResponse.json({ contact }, { status: 200 });
  } catch (error: any) {
    console.error(
      "Error retrieving contact:",
      error.message,
      error.stack,
      error.code
    );
    return NextResponse.json(
      { message: "An error occurred while retrieving contact" },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
