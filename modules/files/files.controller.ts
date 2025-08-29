import { Request, Response } from "express";
import { uploadFileService } from "./files.service";
import { downloadFileService } from "./files.service";
import { uploadToCloudinary } from "../../helpers/upload";
import logger from "../../helpers/logger";
import { getMimeType } from "../../helpers/getMimeType";

const uploadFile = async (req: Request, res: Response) => {
  try {
    const file = req.file;
    const folderId = req.params?.id;
    const userId = req.user?.id;

    if (!file) {
      return res.status(400).json({ message: "File is required." });
    }
    if (!folderId || !userId) {
      return res.status(401).json({ message: "Unauthorized access." });
    }

    if (!file.buffer || file.buffer.length === 0) {
      return res.status(400).json({ message: "Uploaded file is empty." });
    }

    let cloudinaryResult;
    try {
      cloudinaryResult = await uploadToCloudinary(file.buffer);
      logger.info("Cloudinary upload successful");
    } catch (error) {
      const cloudError = error as Error;
      console.error("Cloudinary upload failed:", cloudError);
      logger.error("Cloudinary upload failed:", cloudError);
      return res.status(502).json({
        message: "Failed to upload file to Cloudinary.",
        error: cloudError.message,
      });
    }

    try {
      const newFile = await uploadFileService(
        file,
        Number(folderId),
        userId,
        cloudinaryResult.secure_url
      );
      return res.status(200).json({ message: "File uploaded successfully." });
    } catch (dbError) {
      console.error("Database error:", dbError);
      logger.error("Database error:", dbError);
      return res.status(500).json({ message: "Failed to save file metadata." });
    }
  } catch (error) {
    console.error("File upload error:", error);
    logger.error("File upload error:", error);
    return res
      .status(500)
      .json({ message: "Internal server error during upload." });
  }
};

const downloadFile = async (req: Request, res: Response) => {
  try {
    const fileId = req.params.id;

    if (!fileId) {
      return res.status(400).json({ message: "File ID is required." });
    }

    const file = await downloadFileService(Number(fileId));

    if (!file || !file.path) {
      return res.status(404).json({ message: "File not found." });
    }

    res.setHeader("Content-Disposition", `attachment; filename="${file.name}"`);
    res.setHeader("Content-Type", getMimeType(file.name));

    if (file.path.includes("cloudinary.com")) {
      const downloadUrl = file.path.includes("?")
        ? `${file.path}&fl_attachment`
        : `${file.path}?fl_attachment`;
      const response = await fetch(downloadUrl);
      if (!response.ok) {
        throw new Error(
          `Failed to fetch file from Cloudinary: ${response.statusText}`
        );
      }

      const contentType =
        response.headers.get("content-type") || "application/octet-stream";
      res.setHeader("Content-Type", contentType);
      const reader = response.body?.getReader();
      if (!reader) {
        throw new Error("Failed to get readable stream from Cloudinary");
      }

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        res.write(Buffer.from(value));
      }

      return res.end();
    } else {
      return res.download(file.path, file.name);
    }
  } catch (error) {
    console.error("File download error:", error);
    logger.error("File download error", {
      error: error instanceof Error ? error.message : String(error),
      url: req.url,
    });
    return res.status(500).json({
      message: "Internal server error during download.",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};

export { uploadFile, downloadFile };
