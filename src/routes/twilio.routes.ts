import { Router } from "express";
import * as WhatsappController from "../controllers/whatsapp.controller";
const router = Router();

router.post("/", WhatsappController.sendMessage);

export default router;
