import { Router } from "express";
import {
  getLoginPage,
  getRegisterPage,
  login,
  register,
  logout,
} from "./authentication.controller";

const router = Router();

router.get("/login", getLoginPage);
router.post("/login", login);
router.get("/register", getRegisterPage);
router.post("/register", register);
router.post("/logout", logout);

export default router;
