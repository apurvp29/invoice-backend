import { Router } from "express";
import * as CitiesController from "../controllers/cities.controller";

const router = Router();

router.get("/:id", CitiesController.getCities);

export default router;
