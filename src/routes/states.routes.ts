import { Router } from "express";
import * as StatesController from "../controllers/states.controller";

const router = Router();

router.get("/:id", StatesController.getStates);

export default router;
