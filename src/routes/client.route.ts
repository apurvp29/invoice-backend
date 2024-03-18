import { Router } from "express";
import * as ClientController from "../controllers/client.controller";

const router = Router();

router.get("/:clientId", ClientController.getClient);
router.get("/", ClientController.getAllClients);
router.post("/", ClientController.createClient);
router.post("/address", ClientController.createClientAddress);
router.put("/:clientId", ClientController.updateClient);
router.delete("/:clientId", ClientController.deleteClient);
router.get("/address/:id", ClientController.getAddress);

export default router;
