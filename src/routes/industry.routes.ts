import { Router } from "express";
import * as IndustryController from "../controllers/industry.controllers";

const router = Router();

router.post("/", IndustryController.createClientIndustry);
router.get("/", IndustryController.getClientIndustries);

export default router;
