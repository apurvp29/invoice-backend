import { Router } from "express";
import * as BankingController from "../controllers/banking.controller";

const router = Router();

router.post("/", BankingController.createBanking);

export default router;
