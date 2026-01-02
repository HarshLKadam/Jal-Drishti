import { Hono } from "hono";
import { registerResident, residentLogin } from "../controllers/resident.controller"
import { residentAuth } from "../middleware/resident.auth.middleware";
import { raiseComplaint } from "../controllers/resident.controller"

const residentRoutes = new Hono();

residentRoutes.post("/register", registerResident);
residentRoutes.post("/login",residentLogin)
residentRoutes.post("/complaint", residentAuth, raiseComplaint);

export default residentRoutes;
