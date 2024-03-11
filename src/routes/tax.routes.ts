import { Router } from "express";
import * as TaxController from "../controllers/tax.controller";

const router = Router();

router.post("/:invoiceId", TaxController.createTax);

export default router;
