import { Request, Response } from "express";
import {
  createFolderService,
  getAllFolders,
  getSingleFolder,
  updateFolderService,
  deleteFolderService,
} from "./folders.service";
import { formatDate } from "../../helpers/formatDate";
import { getMimeType } from "../../helpers/getMimeType";

const createFolder = async (req: Request, res: Response) => {
  try {
    const { name } = req.body;
    const userId = req.user?.id;

    if (!name) {
      return res.status(400).json({ message: "Folder name is required." });
    }

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized." });
    }

    await createFolderService(name, userId);

    return res.redirect("/folders");
  } catch (error) {
    console.error("Folder creation error:", error);
    return res.status(500).json({ message: "Internal server error." });
  }
};

const updateFolder = async (req: Request, res: Response) => {
  try {
    const { name } = req.body;
    const folderId = Number(req.params.id);
    const userId = req.user?.id;

    if (!name) {
      return res.status(400).json({ message: "Folder name is required." });
    }

    if (!folderId) {
      return res.status(401).json({ message: "Folder ID is required." });
    }

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized." });
    }

    await updateFolderService(folderId, name, userId);

    return res.redirect("/folders");
  } catch (error) {
    console.error("Folder update error:", error);
    return res.status(500).json({ message: "Internal server error." });
  }
};

const deleteFolder = async (req: Request, res: Response) => {
  try {
    const folderId = Number(req.params.id);
    const userId = req.user?.id;

    if (!folderId) {
      return res.status(401).json({ message: "Folder ID is required." });
    }

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized." });
    }

    await deleteFolderService(folderId, userId);

    return res.redirect("/folders");
  } catch (error) {
    console.error("Folder deletion error:", error);
    return res.status(500).json({ message: "Internal server error." });
  }
};

const getAllFoldersController = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id;

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized." });
    }

    const folders = await getAllFolders(userId);

    return res.status(200).json({ folders });
  } catch (error) {
    console.error("Folder retrieval error:", error);
    return res.status(500).json({ message: "Internal server error." });
  }
};

const getUploadPage = async (req: Request, res: Response) => {
  try {
    const folderId = Number(req.params.id);
    return res.render("upload", { folderId });
  } catch (error) {
    console.error("Folder retrieval error:", error);
    return res.status(500).json({ message: "Internal server error." });
  }
};

const getAllFoldersPage = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id;

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized." });
    }

    const folders = await getAllFolders(userId);

    return res.render("folders", { folders });
  } catch (error) {
    console.error("Folder retrieval error:", error);
    return res.status(500).json({ message: "Internal server error." });
  }
};

const getSingleFolderPage = async (req: Request, res: Response) => {
  try {
    const folderId = Number(req.params.id);

    if (!folderId) {
      return res.status(401).json({ message: "Unauthorized." });
    }

    const folder = await getSingleFolder(folderId);

    return res.render("single-folder", { folder, formatDate, getMimeType });
  } catch (error) {
    console.error("Folder retrieval error:", error);
    return res.status(500).json({ message: "Internal server error." });
  }
};

export {
  createFolder,
  getAllFoldersController,
  getUploadPage,
  getAllFoldersPage,
  getSingleFolderPage,
  updateFolder,
  deleteFolder,
};
