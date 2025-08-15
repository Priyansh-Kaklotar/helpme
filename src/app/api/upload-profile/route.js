import multer from "multer";
import path from "path";
import { NextResponse } from "next/server";

// Configure multer to store files in /public/uploads
const upload = multer({
  storage: multer.diskStorage({
    destination: "./public/uploads",
    filename: (req, file, cb) => {
      cb(null, Date.now() + path.extname(file.originalname)); // unique filename
    },
  }),
});

// Convert multer to work with Next.js API routes
function runMiddleware(req, res, fn) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result) => {
      if (result instanceof Error) {
        return reject(result);
      }
      return resolve(result);
    });
  });
}

export async function POST(req) {
  const formData = await req.formData();
  const file = formData.get("file");

  if (!file) {
    return NextResponse.json({ success: false, message: "No file uploaded" });
  }

  // Save file manually (Node APIs)
  const buffer = Buffer.from(await file.arrayBuffer());
  const filename = `${Date.now()}-${file.name}`;
  const filepath = `./public/uploads/${filename}`;

  const fs = require("fs");
  fs.writeFileSync(filepath, buffer);

  return NextResponse.json({
    success: true,
    url: `/uploads/${filename}`, // URL to access image
  });
}
