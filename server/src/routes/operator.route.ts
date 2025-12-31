import { Hono } from "hono";
import { operatorLogin } from "../controllers/operator.controller";

const operatorRoutes = new Hono();

operatorRoutes.post("/login", operatorLogin);

export default operatorRoutes;
