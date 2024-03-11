import { Router } from "express";
import * as PdfController from "../controllers/pdf.controller";

const router = Router();

router.post("/", PdfController.createPdf);

export default router;
