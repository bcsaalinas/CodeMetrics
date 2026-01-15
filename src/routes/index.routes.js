import { Router } from "express";
import { showHome } from "../controllers/dashboard.controllers.js";
const router = Router();

router.get("/", showHome);

export default router;
