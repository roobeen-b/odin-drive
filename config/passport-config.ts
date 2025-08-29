import bcrypt from "bcryptjs";
import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const initializePassport = () => {
  passport.use(
    new LocalStrategy(
      { usernameField: "email" },
      async (email: string, password: string, done: any) => {
        try {
          const user = await prisma.user.findUnique({ where: { email } });
          if (!user) {
            return done(null, false, {
              message: "Incorrect email or password.",
            });
          }
          const comparePassword = await bcrypt.compare(password, user.password);
          if (!comparePassword) {
            return done(null, false, {
              message: "Incorrect email or password.",
            });
          }
          return done(null, user);
        } catch (err) {
          return done(err);
        }
      }
    )
  );

  passport.serializeUser((user: any, done: any) => {
    done(null, user.id);
  });

  passport.deserializeUser(async (id: number, done: any) => {
    try {
      const user = await prisma.user.findUnique({ where: { id } });
      done(null, user);
    } catch (err) {
      done(err);
    }
  });
};
