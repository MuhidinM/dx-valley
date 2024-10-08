/** @format */

import fs from "fs";
import path from "path";
import { IncomingForm, File, Fields, Files } from "formidable";
import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { Readable } from "stream";
import { IncomingMessage } from "http";
import validator from "validator"; // For additional validation
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
  const allowedExtensions = [".pdf", ".doc", ".docx"];
  const uploadDir = path.join(process.cwd(), "/public/intern");

  const form = new IncomingForm({
    multiples: true,
    uploadDir: uploadDir,
    keepExtensions: true,
  });

  // Custom file validation before saving
  form.on("fileBegin", (name, file) => {
    const fileExtension = path
      .extname(file.originalFilename || "")
      .toLowerCase();

    // If file type is not allowed, emit an error and stop processing
    if (!allowedExtensions.includes(fileExtension)) {
      console.error(`Invalid file type for ${file.originalFilename}`);

      // Emit an error and stop file processing
      // form.emit("error", new Error(`Invalid file type: ${fileExtension}`));
    }
  });

  return new Promise((resolve, reject) => {
    form.parse(req, (err, fields, files) => {
      if (err) return reject(err);
      resolve({ fields, files });
    });
  });
};

// Function to remove the temporary file created by formidable
const removeTempFile = (file: File) => {
  if (fs.existsSync(file.filepath)) {
    fs.unlinkSync(file.filepath); // Deletes the file from the temp directory
  }
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

const checkIfEmailExists = async (email: string) => {
  const existingEmail = await prisma.contactInfo.findUnique({
    where: { email: email },
  });
  return existingEmail !== null;
};

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

    // Input field sanitization and validation
    const firstName = validator.trim(getFirstValue(fields.firstName) || "");
    const lastName = validator.trim(getFirstValue(fields.lastName) || "");
    const email = validator.trim(getFirstValue(fields.email) || "");
    const phone = validator.trim(getFirstValue(fields.phone) || "");
    const gender = validator.trim(getFirstValue(fields.gender) || "");
    const aboutYourself = validator.trim(
      getFirstValue(fields.aboutYourself) || ""
    );
    const university = validator.trim(getFirstValue(fields.university) || "");
    const department = validator.trim(getFirstValue(fields.department) || "");
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

    const otherInterests = validator.trim(
      getFirstValue(fields.otherInterests) || ""
    );
    const portfolio = validator.trim(getFirstValue(fields.portfolio) || "");
    const linkedin = validator.trim(getFirstValue(fields.linkedin) || "");

    // Input validation
    if (!firstName || firstName.length > 100) {
      return NextResponse.json(
        { error: "First name must be less than 100 characters" },
        { status: 400 }
      );
    }

    if (!lastName || lastName.length > 100) {
      return NextResponse.json(
        { error: "Last name must be less than 100 characters" },
        { status: 400 }
      );
    }

    if (!validator.isEmail(email)) {
      return NextResponse.json(
        { error: "Invalid email format" },
        { status: 400 }
      );
    }

    if (!validator.isMobilePhone(phone)) {
      return NextResponse.json(
        { error: "Invalid phone number" },
        { status: 400 }
      );
    }

    if (portfolio && !validator.isURL(portfolio)) {
      return NextResponse.json(
        { error: "Invalid portfolio URL" },
        { status: 400 }
      );
    }

    if (linkedin && !validator.isURL(linkedin)) {
      return NextResponse.json(
        { error: "Invalid LinkedIn URL" },
        { status: 400 }
      );
    }

    // Check if email is already registered
    const emailExists = await checkIfEmailExists(email);
    if (emailExists) {
      return NextResponse.json(
        { error: "Email is already registered." },
        { status: 409 } // Conflict status for existing resource
      );
    }

    // If validation passes, proceed with saving to the database
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
        const docs = Array.isArray(fileOrFiles) ? fileOrFiles : [fileOrFiles];

        for (const file of docs) {
          if (!file?.newFilename) {
            continue;
          }

          let sanitizedFileName = path.basename((file as File).newFilename!);
          sanitizedFileName = sanitizedFileName.replace(/[^a-zA-Z0-9._-]/g, "");

          if ((sanitizedFileName.match(/\./g) || []).length > 1) {
            return NextResponse.json(
              { error: "Invalid file name. Only one period is allowed." },
              { status: 400 }
            );
          }
          // Exclude directory separators
          sanitizedFileName = sanitizedFileName.replace(/[/\*%#\\]/g, "");
          const fileExtension = path.extname(sanitizedFileName).toLowerCase();
          const allowedExtensions = [".pdf", ".doc", ".docx"];

          if (!allowedExtensions.includes(fileExtension)) {
            removeTempFile(file as File); // Remove invalid file

            return NextResponse.json(
              {
                error: "Invalid file type. Only PDF and DOC files are allowed.",
              },
              { status: 400 }
            );
          }

          const newFilePath = path.join(uploadDir, (file as File).newFilename!);
          fs.renameSync((file as File).filepath, newFilePath); // Move file to upload dir

          savedFiles.push({
            name: (file as File).originalFilename || "",
            path: `/intern/${sanitizedFileName}`, // Save relative path
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
        interestAreas: fields.interestAreas,
        otherInterests: otherInterests,
        portfolioLink: portfolio,
        linkedinProfile: linkedin,
        documents: {
          connect: savedDocuments.map((doc) => ({ id: doc.id })), // Connect saved documents
        },
        contactInfo: {
          connect: { id: contactInfo.id }, // Connect contact info
        },
        personalInfo: {
          connect: { id: personalInfo.id }, // Connect personal info
        },
      },
    });

    return NextResponse.json({
      message: "Intern application submitted successfully",
      status: 200,
      internInfo,
    });
  } catch (error) {
    console.error("Error processing form:", error);
    return NextResponse.json(
      { error: "Error processing form data" },
      { status: 500 }
    );
  }
}
