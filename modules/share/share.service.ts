import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const createShareLinkService = async (folderId: number, expiresAt: Date) => {
  try {
    const shareLink = await prisma.shareLink.create({
      data: {
        folderId,
        expiresAt,
      },
    });
    return shareLink;
  } catch (error) {
    console.error("Share link creation error:", error);
    throw error;
  }
};

const getShareLinkService = async (linkId: string) => {
  try {
    const shareLink = await prisma.shareLink.findUnique({
      where: {
        id: linkId,
      },
    });
    return shareLink;
  } catch (error) {
    console.error("Share link retrieval error:", error);
    throw error;
  }
};

export { createShareLinkService, getShareLinkService };
