import { Hono } from "hono";
import { dailyUsageSummary } from "../controllers/admin.dashboard.controller";

import { adminAuth } from "../middleware/auth.middleware";

const adminDashboardRoutes = new Hono();


adminDashboardRoutes.get(
  "/daily-usage",
  adminAuth,
  dailyUsageSummary
);



export default adminDashboardRoutes;
