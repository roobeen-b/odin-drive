import { Request, Response, NextFunction } from "express";
import passport from "passport";
import { registerUser } from "./authentication.service";
import { TUser } from "../../types";

export const getRegisterPage = (req: Request, res: Response) => {
  res.render("register", { messages: { error: "" } });
};

export const register = async (req: Request, res: Response) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({ message: "All fields are required." });
    }

    if (!/^\S+@\S+\.\S+$/.test(email)) {
      return res.status(400).json({ message: "Invalid email format." });
    }

    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: "Password must be at least 6 characters." });
    }

    const user = await registerUser(email, username, password);

    return res.status(201).json({ message: "User created successfully", user });
  } catch (error: any) {
    console.error("Registration error:", error);
    const status = error.code === "P2002" ? 409 : 500;
    const message =
      error.code === "P2002"
        ? "Email already in use."
        : "Internal server error.";
    return res.status(status).json({ message });
  }
};

export const getLoginPage = (req: Request, res: Response) => {
  res.render("login", { messages: { error: "" } });
};

export const login = (req: Request, res: Response, next: NextFunction) => {
  passport.authenticate("local", (err: any, user: TUser, info: any) => {
    if (err) {
      console.error("Login error:", err);
      return res.status(500).json({ message: "Internal server error." });
    }
    if (!user) {
      return res
        .status(401)
        .json({ message: info?.message || "Authentication failed." });
    }

    req.logIn(user, (err) => {
      if (err) {
        console.error("Session error:", err);
        return res.status(500).json({ message: "Login failed." });
      }
      return res.redirect("/");
    });
  })(req, res, next);
};

export const logout = (req: Request, res: Response) => {
  req.logout((err) => {
    if (err) {
      console.error("Logout error:", err);
      return res.status(500).json({ message: "Logout failed." });
    }

    req.session.destroy((err) => {
      if (err) {
        console.error("Session destroy error:", err);
        return res.status(500).json({ message: "Session cleanup failed." });
      }

      res.clearCookie("connect.sid");
      return res.redirect("/");
    });
  });
};
