import { Router } from "express";
import verifyJwt from "../admin/admin.middleware.js";
import {
  getAdminShopSettings,
  getPublicShopSettings,
  updateShopSettings,
} from "./settings.controller.js";

const router = Router();

router.get("/public", getPublicShopSettings);

router.use(verifyJwt);
router.get("/", getAdminShopSettings);
router.patch("/", updateShopSettings);

export default router;
