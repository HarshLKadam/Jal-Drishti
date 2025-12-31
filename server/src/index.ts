import { Hono } from "hono";
import adminOperatorRoutes from "./routes/admin.operator.route";
import authRoutes from "./routes/auth.route";
import operatorRoutes from "./routes/operator.route";   
import dailyLogRoutes from "./routes/dailylog.route";

const app = new Hono();

// root test
app.get("/", (c) => c.text("API running"));

// admin routes

app.route("/auth", authRoutes);
app.route("/admin", adminOperatorRoutes);

//operator routes 
app.route("/operator", operatorRoutes);

//daily logs route 
app.route("/operator/daily-log", dailyLogRoutes);

export default {
  port: 4000,
  fetch: app.fetch,
};


