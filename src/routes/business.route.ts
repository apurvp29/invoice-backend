import { Router } from "express";
import * as BusinessController from "../controllers/business.controller";

const router = Router();

router.get("/:businessId", BusinessController.getBusiness);
router.get("/", BusinessController.getAllBusiness);
router.post("/", BusinessController.createBusiness);
router.put("/:businessId", BusinessController.updateBusiness);
router.delete("/:businessId", BusinessController.deleteBusiness);

export default router;
