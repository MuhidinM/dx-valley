/** @format */

import fs from "fs";
import path from "path";
import { IncomingForm, File, Fields, Files } from "formidable";
import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { Readable } from "stream";
import { IncomingMessage } from "http";

interface SavedFile {
  name: string;
  path: string;
}

const prisma = new PrismaClient();

// Helper class to convert Web Streams API request to Node.js-readable stream
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
  _read() {
    // Override with custom logic to read data, or defer to super()
  }
}

// Helper function to parse form data
const parseForm = (
  req: IncomingMessage
): Promise<{ fields: Fields; files: Files }> => {
  const form = new IncomingForm({
    multiples: true, // Allow multiple files
    uploadDir: path.join(process.cwd(), "/public/docs"), // Directory to upload files
    keepExtensions: true, // Keep file extensions
  });

  return new Promise((resolve, reject) => {
    form.parse(req, (err, fields, files) => {
      if (err) return reject(err);
      resolve({ fields, files });
    });
  });
};

// Convert Web Stream to Node.js Readable and extend it with IncomingMessage properties
async function convertToNodeReadable(req: Request): Promise<IncomingMessage> {
  const stream = new ReadableIncoming(req);
  const reader = req.body?.getReader();
  if (!reader) return stream as any;

  // Push data from the Web Stream API to the Node.js Readable stream
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

export async function POST(req: Request): Promise<NextResponse> {
  try {
    const nodeReadableStream = await convertToNodeReadable(req);

    // Parse the incoming form data
    const { fields, files } = await parseForm(nodeReadableStream);

    const startupName = fields.startupName?.toString();
    const stage = fields.stage?.toString();
    const email = fields.email?.toString();
    const phone = fields.phone?.toString();
    const idea = fields.idea?.toString();

    if (!startupName || !stage || !email || !phone || !idea) {
      return NextResponse.json({
        error: "Required fields are missing.",
        status: 400,
      });
    }

    const savedFiles: SavedFile[] = [];
    const uploadDir = path.join(process.cwd(), "/public/docs");

    // Ensure the upload directory exists
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    if (Object.keys(files).some((key) => key.startsWith("documents"))) {
      const docKeys = Object.keys(files).filter((key) =>
        key.startsWith("documents")
      );

      for (const key of docKeys) {
        const fileOrFiles = files[key];

        // Check if it's an array of files or a single file
        const docs = Array.isArray(fileOrFiles) ? fileOrFiles : [fileOrFiles];

        for (const file of docs) {
          const newFilePath = path.join(uploadDir, (file as File).newFilename!);
          fs.renameSync((file as File).filepath, newFilePath);
          savedFiles.push({
            name: (file as File).originalFilename || "",
            path: `/docs/${(file as File).newFilename}`,
          });
        }
      }
    }

    // Handle uploaded video
    let videoFile: SavedFile | null = null;
    if (files.video) {
      const video = Array.isArray(files.video) ? files.video[0] : files.video;
      const videoFilePath = path.join(uploadDir, (video as File).newFilename!);
      fs.renameSync((video as File).filepath, videoFilePath);
      videoFile = {
        name: (video as File).originalFilename || "",
        path: `/docs/${(video as File).newFilename}`,
      };
    }

    const docPromises = savedFiles.map(async (file) => {
      return await prisma.documentInfo.create({
        data: {
          name: file.name,
          path: file.path,
        },
      });
    });

    const savedDocuments = await Promise.all(docPromises);

    let savedFounders: any[] = [];

    const founderNames: any[] = [];

    Object.keys(fields).forEach((key) => {
      const match = key.match(/founderNames\[(\d+)\]\[(firstName|lastName)\]/);
      if (match) {
        const index = parseInt(match[1], 10);
        const fieldName = match[2];

        // Ensure founderNames[index] is initialized
        founderNames[index] = founderNames[index] || {};

        if (Array.isArray(fields[key]) && fields[key][0]) {
          founderNames[index][fieldName] = fields[key][0];
        }
      }
    });

    if (Array.isArray(founderNames) && founderNames.length > 0) {
      const founderInfoPromises = founderNames.map(async (member: any) => {
        const savedFounder = await prisma.personalInfo.create({
          data: {
            firstName: member.firstName,
            lastName: member.lastName,
          },
        });

        return savedFounder;
      });

      savedFounders = await Promise.all(founderInfoPromises);
    }

    const startupContactinfo = await prisma.contactInfo.create({
      data: {
        email: email,
        phoneNumberOne: phone,
      },
    });

    let applicationData: {
      startupName: string;
      stage: string;
      ideaDescription: string;
      documents: { connect: { id: number }[] };
      contactInfo: { connect: { id: number } };
      personalInfo?: { connect: { id: number }[] };
      videoId?: number;
    } = {
      startupName: startupName,
      stage: stage,
      ideaDescription: idea,
      documents: {
        connect: savedDocuments.map((doc) => ({ id: doc.id })),
      },
      contactInfo: {
        connect: { id: startupContactinfo.id },
      },
    };

    if (savedFounders.length > 0) {
      applicationData = {
        ...applicationData,
        personalInfo: {
          connect: savedFounders.map((founder) => ({ id: founder.id })),
        },
      };
    }

    if (videoFile) {
      const savedVideo = await prisma.videoInfo.create({
        data: {
          name: videoFile.name,
          path: videoFile.path,
        },
      });
      applicationData = {
        ...applicationData,
        videoId: savedVideo.id,
      };
    }

    const application = await prisma.startupInfo.create({
      data: applicationData,
    });

    return NextResponse.json({
      message: "Application submitted successfully",
      status: 200,
      application,
    });
  } catch (error) {
    console.error("Error processing form:", error);
    return NextResponse.json({
      error: "Error processing form data",
      status: 500,
    });
  }
}
