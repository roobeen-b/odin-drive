import bcrypt from "bcryptjs";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function registerUser(
  email: string,
  username: string,
  password: string
) {
  const existingUser = await prisma.user.findUnique({ where: { email } });
  if (existingUser) {
    const error: any = new Error("Email already in use.");
    error.code = "P2002";
    throw error;
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
    data: {
      email,
      username,
      password: hashedPassword,
    },
  });

  return { id: user.id, email: user.email, username: user.username };
}

export async function loginUser(email: string, password: string) {
  const user = await prisma.user.findUnique({ where: { email } });

  if (!user || !(await bcrypt.compare(password, user.password))) {
    throw new Error("Invalid credentials");
  }

  return { id: user.id, email: user.email, username: user.username };
}
