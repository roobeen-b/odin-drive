import { ensureAuthenticated } from "../../middleware/ensureAuthenticated";
import {
  createFolder,
  getAllFoldersPage,
  getSingleFolderPage,
  getUploadPage,
  updateFolder,
  deleteFolder,
} from "./folders.controller";
import { Router } from "express";

const router = Router();

router.post("/", ensureAuthenticated, createFolder);
router.get("/:id", ensureAuthenticated, getSingleFolderPage);
router.get("/", ensureAuthenticated, getAllFoldersPage);
router.get("/:id/upload-file", ensureAuthenticated, getUploadPage);
router.post("/:id/edit", ensureAuthenticated, updateFolder);
router.post("/:id/delete", ensureAuthenticated, deleteFolder);

export default router;
