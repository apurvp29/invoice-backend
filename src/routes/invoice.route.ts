import { Router } from "express";
import * as InvoiceController from "../controllers/invoice.controller";

const router = Router();

router.get("/:invoiceId", InvoiceController.getInvoice);
router.get("/number/:invoiceNumber", InvoiceController.getInvoiceId);
router.get("/detail/:invoiceId", InvoiceController.getInvoiceDetail);
router.get("/", InvoiceController.getAllInvoices);
router.post("/", InvoiceController.createInvoice);
router.put("/:invoiceId", InvoiceController.updateInvoice);
router.delete("/:invoiceId", InvoiceController.deleteInvoice);

export default router;
