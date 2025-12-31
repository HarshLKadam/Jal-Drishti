import { Hono } from "hono";
import adminOperatorRoutes from "./routes/admin.operator.route";
import authRoutes from "./routes/auth.route";

const app = new Hono();

// root test
app.get("/", (c) => c.text("API running"));

// admin routes
app.route("/auth", authRoutes);
app.route("/admin", adminOperatorRoutes);

export default {
  port: 4000,
  fetch: app.fetch,
};


