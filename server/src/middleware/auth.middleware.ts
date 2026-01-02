import { Context, Next } from "hono";
import { verifyJwt } from "../lib/jwt";

export const adminAuth = async (c: Context, next: () => Promise<void>) => {
  const auth = c.req.header("authorization");
  if (!auth?.startsWith("Bearer ")) {
    return c.json({ success: false, message: "Unauthorized" }, 401);
  }

  const payload = verifyJwt(auth.split(" ")[1]);


  c.set("admin", payload);
  c.set("village_id", payload.village_id);

  await next();
};
