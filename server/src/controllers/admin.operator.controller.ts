import { Context } from "hono";
import { prisma } from "../lib/prisma";
import bcrypt from "bcryptjs";

export const registerOperator = async (c: Context) => {
  try {
    const { name, phone, username, password, village_id } =
      await c.req.json();

    // 1. Basic validation
    if (!name || !phone || !username || !password || !village_id) {
      return c.json(
        { error: true, message: "All fields are required" },
        400
      );
    }

    // 2. Check if username already exists
    const existing = await prisma.operator.findUnique({
      where: { username },
    });

    if (existing) {
      return c.json(
        { error: true, message: "Operator already exists" },
        409
      );
    }

    // 3. Hash password
    const password_hash = await bcrypt.hash(password, 10);

    // 4. Create operator
    const operator = await prisma.operator.create({
      data: {
        name,
        phone,
        username,
        password_hash,
        village_id,
      },
    });

    return c.json(
      {
        error: false,
        message: "Operator registered successfully",
        data: {
          operator_id: operator.operator_id,
          username: operator.username,
        },
      },
      201
    );
  } catch (err) {
    console.error("Register operator error:", err);
    return c.json(
      { error: true, message: "Internal server error" },
      500
    );
  }
};
