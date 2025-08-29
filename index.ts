require("dotenv").config();
import path from "path";
import express from "express";
import passport from "passport";
import session from "express-session";
import { PrismaClient } from "@prisma/client";
import { Request, Response, NextFunction } from "express";
import { PrismaSessionStore } from "@quixo3/prisma-session-store";
import { IPrisma } from "@quixo3/prisma-session-store/dist/@types";

import { initializePassport } from "./config/passport-config";
import { initializeCloudinary } from "./config/cloudinary-config";

import authRoutes from "./modules/authentication/authentication.routes";
import foldersRoutes from "./modules/folders/folders.routes";
import filesRoutes from "./modules/files/files.routes";
import logger from "./helpers/logger";
import shareRoutes from "./modules/share/share.routes";

const app = express();
const PORT = process.env.PORT || 4000;

const prisma = new PrismaClient();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

initializePassport();
initializeCloudinary();

const sessionStore = new PrismaSessionStore(
  prisma as unknown as IPrisma<"Session">,
  {
    checkPeriod: 2 * 60 * 1000, // 2 minutes
    dbRecordIdIsSessionId: true,
    sessionModelName: "Session",
  }
);

app.use(
  session({
    secret: process.env.SESSION_SECRET_KEY!,
    resave: false,
    saveUninitialized: false,
    store: sessionStore,
    cookie: { maxAge: 1000 * 60 * 60 * 24 }, // 1 day
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next) => {
  res.locals.currentUser = req.user;
  next();
});

app.use((req, res, next) => {
  logger.info(`${req.method} ${req.url}`, {
    userId: req.user?.id,
    folderId: req.params?.id,
  });
  next();
});

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  logger.error("Unhandled error", { error: err, url: req.url });
  res.status(500).json({ message: "Internal server error" });
});

app.get("/", (req: Request, res: Response) => {
  res.render("index");
});

app.use("/auth", authRoutes);
app.use("/folders", foldersRoutes);
app.use("/files", filesRoutes);
app.use("/share", shareRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
