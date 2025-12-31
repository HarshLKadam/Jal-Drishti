import { Hono } from "hono";
import { adminLogin } from "../controllers/auth.controller";
import { addPump } from "../controllers/pump.controller";
import { adminAuth } from "../middleware/auth.middleware";

const authRoutes = new Hono();

authRoutes.post("/admin/login", adminLogin);
authRoutes.post("/admin/pumps", adminAuth, addPump);
export default authRoutes;
