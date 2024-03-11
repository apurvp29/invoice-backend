import { Router } from "express";
import * as ItemsController from "../controllers/items.controller";

const router = Router();

router.get("/:invoiceItemsId", ItemsController.getItem);
router.get("/", ItemsController.getAllItems);
router.post("/:invoiceId", ItemsController.createItem);
router.put("/:invoiceItemsId", ItemsController.updateItem);
router.delete("/:invoiceItemsId", ItemsController.deleteItem);

export default router;
