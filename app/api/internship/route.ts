import fs from "fs";
import path from "path";
import { IncomingForm, File, Fields, Files } from "formidable";
import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { Readable } from "stream";
import { IncomingMessage } from "http";

const prisma = new PrismaClient();

interface SavedFile {
  name: string;
  path: string;
}

class ReadableIncoming extends Readable {
  headers: IncomingMessage["headers"];
  method: IncomingMessage["method"];
  url: IncomingMessage["url"];
  constructor(req: Request) {
    super();
    this.headers = Object.fromEntries(req.headers.entries());
    this.method = req.method || "GET";
    this.url = req.url;
  }
  _read() {}
}

const parseForm = (
  req: IncomingMessage
): Promise<{ fields: Fields; files: Files }> => {
  const form = new IncomingForm({
    multiples: true,
    uploadDir: path.join(process.cwd(), "/public/docs"),
    keepExtensions: true,
  });

  return new Promise((resolve, reject) => {
    form.parse(req, (err, fields, files) => {
      if (err) return reject(err);
      resolve({ fields, files });
    });
  });
};

async function convertToNodeReadable(req: Request): Promise<IncomingMessage> {
  const stream = new ReadableIncoming(req);
  const reader = req.body?.getReader();
  if (!reader) return stream as any;

  (async function readStream() {
    while (true) {
      const { done, value } = await reader.read();
      if (done) {
        stream.push(null);
        break;
      }
      stream.push(value);
    }
  })();

  return stream as any;
}

// export async function POST(req: Request): Promise<NextResponse> {
//   try {
//     const nodeReadableStream = await convertToNodeReadable(req);
//     const { fields, files } = await parseForm(nodeReadableStream);

//     const getFirstValue = (
//       field: string[] | string | undefined
//     ): string | undefined => {
//       if (Array.isArray(field)) {
//         return field[0];
//       }
//       return field;
//     };

//     const firstName = getFirstValue(fields.firstName)?.toString() || "";
//     const lastName = getFirstValue(fields.lastName)?.toString() || "";
//     const email = getFirstValue(fields.email)?.toString() || "";
//     const phone = getFirstValue(fields.phone)?.toString() || "";
//     const gender = getFirstValue(fields.gender)?.toString() || "";
//     const aboutYourself = getFirstValue(fields.aboutYourself)?.toString() || "";
//     const university = getFirstValue(fields.university)?.toString() || "";
//     const department = getFirstValue(fields.department)?.toString() || "";
//     const year = parseInt(getFirstValue(fields.year) || "0", 10);
//     const internshipStart = new Date(
//       getFirstValue(fields.internshipStart) || Date.now()
//     );
//     const internshipEnd = new Date(
//       getFirstValue(fields.internshipEnd) || Date.now()
//     );
//     const interestAreas = getFirstValue(fields.interestAreas)?.toString() || "";
//     const otherInterests =
//       getFirstValue(fields.otherInterests)?.toString() || "";
//     const portfolio = getFirstValue(fields.portfolio)?.toString() || "";
//     const linkedin = getFirstValue(fields.linkedin)?.toString() || "";

//     if (!firstName || !lastName || !email || !phone) {
//       return NextResponse.json({
//         error: "Required fields are missing.",
//         status: 400,
//       });
//     }

//     const savedFiles: SavedFile[] = [];
//     const uploadDir = path.join(process.cwd(), "/public/docs");

//     if (!fs.existsSync(uploadDir)) {
//       fs.mkdirSync(uploadDir, { recursive: true });
//     }

//     if (
//       files &&
//       Object.keys(files).some((key) => key.startsWith("documents"))
//     ) {
//       const docKeys = Object.keys(files).filter((key) =>
//         key.startsWith("documents")
//       );

//       for (const key of docKeys) {
//         const fileOrFiles = files[key];
//         const docs = Array.isArray(fileOrFiles) ? fileOrFiles : [fileOrFiles];

//         for (const file of docs) {
//           const newFilePath = path.join(uploadDir, (file as File).newFilename!);
//           fs.renameSync((file as File).filepath, newFilePath);
//           savedFiles.push({
//             name: (file as File).originalFilename || "",
//             path: `/docs/${(file as File).newFilename}`,
//           });
//         }
//       }
//     }

//     const savedDocuments = await Promise.all(
//       savedFiles.map(async (file) => {
//         return await prisma.documentInfo.create({
//           data: {
//             name: file.name,
//             path: file.path,
//           },
//         });
//       })
//     );

//     const contactInfo = await prisma.contactInfo.create({
//       data: {
//         email: email,
//         phoneNumberOne: phone,
//       },
//     });

//     const personalInfo = await prisma.personalInfo.create({
//       data: {
//         firstName: firstName,
//         lastName: lastName,
//         gender: gender,
//       },
//     });

//     const internInfo = await prisma.internsInfo.create({
//       data: {
//         aboutYourself: aboutYourself,
//         university: university,
//         department: department,
//         year: year,
//         internshipStart: internshipStart,
//         internshipEnd: internshipEnd,
//         interestAreas: interestAreas,
//         otherInterests: otherInterests,
//         portfolioLink: portfolio,
//         linkedinProfile: linkedin,
//         documents: {
//           connect: savedDocuments.map((doc) => ({ id: doc.id })),
//         },
//         contactInfo: {
//           connect: { id: contactInfo.id },
//         },
//         personalInfo: {
//           connect: { id: personalInfo.id },
//         },
//       },
//     });

//     return NextResponse.json({
//       message: "Intern application submitted successfully",
//       status: 200,
//       internInfo,
//     });
//   } catch (error) {
//     console.error("Error processing form:", error);
//     return NextResponse.json({
//       error: "Error processing form data",
//       status: 500,
//     });
//   }
// }

export async function POST(req: Request): Promise<NextResponse> {
  try {
    const nodeReadableStream = await convertToNodeReadable(req);
    const { fields, files } = await parseForm(nodeReadableStream);

    const getFirstValue = (
      field: string[] | string | undefined
    ): string | undefined => {
      if (Array.isArray(field)) {
        return field[0];
      }
      return field;
    };

    const firstName = getFirstValue(fields.firstName)?.toString() || "";
    const lastName = getFirstValue(fields.lastName)?.toString() || "";
    const email = getFirstValue(fields.email)?.toString() || "";
    const phone = getFirstValue(fields.phone)?.toString() || "";
    const gender = getFirstValue(fields.gender)?.toString() || "";
    const aboutYourself = getFirstValue(fields.aboutYourself)?.toString() || "";
    const university = getFirstValue(fields.university)?.toString() || "";
    const department = getFirstValue(fields.department)?.toString() || "";
    const year = parseInt(getFirstValue(fields.year) || "0", 10);
    const internshipStart = new Date(
      getFirstValue(fields.internshipStart) || Date.now()
    );
    const internshipEnd = new Date(
      getFirstValue(fields.internshipEnd) || Date.now()
    );
    const interestAreas = Array.isArray(fields.interestAreas)
      ? fields.interestAreas
      : [getFirstValue(fields.interestAreas)?.toString()];

    const otherInterests =
      getFirstValue(fields.otherInterests)?.toString() || "";
    const portfolio = getFirstValue(fields.portfolio)?.toString() || "";
    const linkedin = getFirstValue(fields.linkedin)?.toString() || "";

    if (!firstName || !lastName || !email || !phone) {
      return NextResponse.json({
        error: "Required fields are missing.",
        status: 400,
      });
    }

    const savedFiles: SavedFile[] = [];
    const uploadDir = path.join(process.cwd(), "/public/intern");

    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    if (
      files &&
      Object.keys(files).some((key) => key.startsWith("documents"))
    ) {
      const docKeys = Object.keys(files).filter((key) =>
        key.startsWith("documents")
      );

      for (const key of docKeys) {
        const fileOrFiles = files[key];
        const docs = Array.isArray(fileOrFiles) ? fileOrFiles : [fileOrFiles]; // Wrap single file as array

        for (const file of docs) {
          const newFilePath = path.join(uploadDir, (file as File).newFilename!);
          fs.renameSync((file as File).filepath, newFilePath); // Move file to upload dir
          savedFiles.push({
            name: (file as File).originalFilename || "",
            path: `/intern/${(file as File).newFilename}`, // Save relative path
          });
        }
      }
    }

    // Ensure the database save happens as a transaction
    const savedDocuments = await prisma.$transaction(
      savedFiles.map((file) =>
        prisma.documentInfo.create({
          data: {
            name: file.name,
            path: file.path, // Save file path
          },
        })
      )
    );

    const contactInfo = await prisma.contactInfo.create({
      data: {
        email: email,
        phoneNumberOne: phone,
      },
    });

    const personalInfo = await prisma.personalInfo.create({
      data: {
        firstName: firstName,
        lastName: lastName,
        gender: gender,
      },
    });

    const internInfo = await prisma.internsInfo.create({
      data: {
        aboutYourself: aboutYourself,
        university: university,
        department: department,
        year: year,
        internshipStart: internshipStart,
        internshipEnd: internshipEnd,
        // interestAreas: interestAreas,
        interestAreas: fields.interestAreas,
        otherInterests: otherInterests,
        portfolioLink: portfolio,
        linkedinProfile: linkedin,
        documents: {
          connect: savedDocuments.map((doc) => ({ id: doc.id })),
        },
        contactInfo: {
          connect: { id: contactInfo.id },
        },
        personalInfo: {
          connect: { id: personalInfo.id },
        },
      },
    });
    console.log("Saved intern info:", internInfo);
    console.log(interestAreas);

    return NextResponse.json({
      message: "Intern application submitted successfully",
      status: 200,
      internInfo,
    });
  } catch (error) {
    console.error("Error processing form:", error);
    return NextResponse.json({
      error: "Error processing form data",
      status: 500,
    });
  }
}
