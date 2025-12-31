import { Context, Next } from "hono";
import { verify } from "hono/jwt";

export const adminAuth = async (c: Context, next: Next) => {
  try {
    const token = c.req.header("authorization")?.replace("Bearer ", "");

    if (!token) {
      return c.json({ message: "Unauthorized" }, 401);
    }

    const payload = await verify(token, Bun.env.JWT_SECRET!);

    if (payload.role !== "ADMIN") {
      return c.json({ message: "Forbidden" }, 403);
    }

    c.set("admin", payload);
    await next();
  } catch {
    return c.json({ message: "Invalid token" }, 401);
  }
};
