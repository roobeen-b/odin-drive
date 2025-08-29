import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const createFolderService = async (name: string, userId: number) => {
  try {
    const folder = await prisma.folder.create({
      data: {
        name,
        userId,
      },
    });
    return folder;
  } catch (error) {
    console.error("Folder creation error:", error);
    throw error;
  }
};

const updateFolderService = async (
  folderId: number,
  name: string,
  userId: number
) => {
  try {
    const folder = await prisma.folder.update({
      where: {
        id: folderId,
      },
      data: {
        name,
      },
    });
    return folder;
  } catch (error) {
    console.error("Folder update error:", error);
    throw error;
  }
};

const deleteFolderService = async (folderId: number, userId: number) => {
  try {
    const folder = await prisma.folder.delete({
      where: {
        id: folderId,
      },
    });
    return folder;
  } catch (error) {
    console.error("Folder deletion error:", error);
    throw error;
  }
};

const getAllFolders = async (userId: number) => {
  try {
    const folders = await prisma.folder.findMany({
      where: {
        userId,
      },
      include: {
        files: true,
      },
    });
    return folders;
  } catch (error) {
    console.error("Folder retrieval error:", error);
    throw error;
  }
};

const getSingleFolder = async (folderId: number) => {
  try {
    const folder = await prisma.folder.findUnique({
      where: {
        id: folderId,
      },
      include: {
        files: true,
      },
    });
    return folder;
  } catch (error) {
    console.error("Folder retrieval error:", error);
    throw error;
  }
};

export {
  createFolderService,
  getAllFolders,
  getSingleFolder,
  updateFolderService,
  deleteFolderService,
};
