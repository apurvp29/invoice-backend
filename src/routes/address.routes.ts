import { Router } from "express";
import * as AddressController from "../controllers/address.controller";

const router = Router();

router.post("/", AddressController.createAddress);
router.put("/:addressId", AddressController.updateAddress);

export default router;
