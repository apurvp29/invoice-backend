import { Router } from "express";
import * as CountriesControlles from "../controllers/countries.controller";

const router = Router();

router.get("/", CountriesControlles.getCountries);

export default router;
