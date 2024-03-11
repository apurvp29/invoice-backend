import { Router } from "express";
import * as ClientController from "../controllers/client.controller";

const router = Router();

router.get("/:clientId", ClientController.getClient);
router.get("/", ClientController.getAllClients);
router.post("/", ClientController.createClient);
router.put("/:clientId", ClientController.updateClient);
router.delete("/:clientId", ClientController.deleteClient);

export default router;
