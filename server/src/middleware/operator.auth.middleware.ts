import { Context, Next } from "hono";
import { verifyJwt } from "../lib/jwt";

export const operatorAuthMiddleware = async (c: Context, next: Next) => {
  const authHeader = c.req.header("authorization");

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return c.json(
      { success: false, message: "Unauthorized operator" },
      401
    );
  }

  try {
    const token = authHeader.split(" ")[1];

    const decoded = verifyJwt(token) as {
      operator_id: number;
      role: string;
    };

    if (decoded.role !== "OPERATOR") {
      return c.json(
        { success: false, message: "Forbidden" },
        403
      );
    }

    // ✅ THIS LINE FIXES EVERYTHING
    c.set("operatorId", decoded.operator_id);

    await next();
  } catch {
    return c.json(
      { success: false, message: "Invalid or expired token" },
      401
    );
  }
};
