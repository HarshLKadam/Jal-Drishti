import { Context } from "hono";
import { prisma } from "../lib/prisma";
import bcrypt from "bcryptjs";
import { sign } from "hono/jwt";

export const adminLogin = async (c: Context) => {
  try {
    const { username, password } = await c.req.json();

    if (!username || !password) {
      return c.json({ message: "Username and password required" }, 400);
    }

    const admin = await prisma.admin.findUnique({
      where: { username },
    });

    if (!admin) {
      return c.json({ message: "Invalid credentials" }, 401);
    }

    const isValid = await bcrypt.compare(password, admin.password_hash);
    if (!isValid) {
      return c.json({ message: "Invalid credentials" }, 401);
    }

    const token = await sign(
      {
        admin_id: admin.admin_id,
        role: "ADMIN",
      },
      process.env.JWT_SECRET!
    );

    return c.json({
      token,
      admin: {
        id: admin.admin_id,
        username: admin.username,
      },
    });
  } catch (err) {
    console.error(err);
    return c.json({ message: "Login failed" }, 500);
  }
};

