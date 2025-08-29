import ms from "ms";
import { Request, Response } from "express";
import { getSingleFolder } from "../../modules/folders/folders.service";
import { createShareLinkService, getShareLinkService } from "./share.service";
import { formatDate } from "../../helpers/formatDate";
import { getMimeType } from "../../helpers/getMimeType";

const createShareLinkPage = async (req: Request, res: Response) => {
  try {
    const { folderId } = req.params;
    return res.render("share-link", { folderId, shareLinkUrl: "" });
  } catch (error) {
    console.error("Share link page error:", error);
    return res.status(500).json({ message: "Internal server error." });
  }
};

const createShareLink = async (req: Request, res: Response) => {
  try {
    const { folderId } = req.params;
    const duration = req.body.duration;

    const expiresAt = new Date(Date.now() + ms(duration));

    if (!folderId) {
      return res.status(401).json({ message: "Folder ID is required." });
    }

    const shareLink = await createShareLinkService(Number(folderId), expiresAt);
    const shareLinkUrl = `${req.protocol}://${req.get("host")}/share/${
      shareLink.id
    }`;
    return res.render("share-link", { folderId, shareLinkUrl });
  } catch (error) {
    console.error("Share link creation error:", error);
    return res.status(500).json({ message: "Internal server error." });
  }
};

const viewSharedFolder = async (req: Request, res: Response) => {
  try {
    const { linkId } = req.params;

    if (!linkId) {
      return res.status(401).json({ message: "Link ID is required." });
    }

    const shareLink = await getShareLinkService(linkId);
    if (!shareLink) {
      return res.status(404).json({ message: "Share link not found." });
    }
    const folder = await getSingleFolder(shareLink.folderId);
    if (!folder) {
      return res.status(404).json({ message: "Folder not found." });
    }

    return res.render("shared-folder", {
      shareLink,
      folder,
      formatDate,
      getMimeType,
    });
  } catch (error) {
    console.error("Share link retrieval error:", error);
    return res.status(500).json({ message: "Internal server error." });
  }
};

export { createShareLink, createShareLinkPage, viewSharedFolder };
