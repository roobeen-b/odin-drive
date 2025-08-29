import { Router } from "express";
import { ensureAuthenticated } from "../../middleware/ensureAuthenticated";
import {
  createShareLink,
  createShareLinkPage,
  viewSharedFolder,
} from "./share.controller";
import { downloadFile } from "../files/files.controller";

const router = Router();

router.get("/:folderId/share", ensureAuthenticated, createShareLinkPage);
router.post("/:folderId", ensureAuthenticated, createShareLink);
router.get("/:linkId", viewSharedFolder);
router.get("/:id/download-file", downloadFile);

export default router;
