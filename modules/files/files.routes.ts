import { Router } from "express";
import { uploadFile } from "./files.controller";
import { ensureAuthenticated } from "../../middleware/ensureAuthenticated";
import { upload } from "../../helpers/upload";
import { downloadFile } from "./files.controller";

const router = Router();

router.post(
  "/:id/upload-file",
  ensureAuthenticated,
  upload.single("file"),
  uploadFile
);
router.get("/:id/download-file", ensureAuthenticated, downloadFile);

export default router;
