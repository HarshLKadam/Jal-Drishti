import { Hono } from "hono";
import { adminLogin } from "../controllers/auth.controller";

const authRoutes = new Hono();

authRoutes.post("/admin/login", adminLogin);

export default authRoutes;
