import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const uploadFileService = async (
  file: Express.Multer.File,
  folderId: number,
  userId: number,
  cloudinaryUrl: string
) => {
  try {
    const newFile = await prisma.file.create({
      data: {
        name: file.originalname,
        path: cloudinaryUrl,
        size: file.size,
        folderId: folderId ? folderId : null,
        userId,
      },
    });
    return newFile;
  } catch (error) {
    console.error("File upload error:", error);
    throw error;
  }
};

const downloadFileService = async (fileId: number) => {
  try {
    const file = await prisma.file.findUnique({
      where: {
        id: fileId,
      },
    });
    return file;
  } catch (error) {
    console.error("File download error:", error);
    throw error;
  }
};

export { uploadFileService, downloadFileService };
