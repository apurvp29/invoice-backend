import { Router } from "express";
import * as TaxController from "../controllers/tax.controller";

const router = Router();

router.post("/:invoiceId", TaxController.createTax);
router.put("/:invoiceTaxId", TaxController.updateTax);
router.delete("/:invoiceTaxId", TaxController.deleteTax);

export default router;
