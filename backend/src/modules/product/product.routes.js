import { Router } from "express";
import {
  createProduct,
  deleteProductById,
  getAllProductViews,
  getAllProducts,
  getPublicProductBySlug,
  getProductViewsBySlug,
  getViewsSummary,
  publishProduct,
  recordProductView,
  suggestProductSlug,
  unpublishProduct,
  updateProductById,
} from "./product.controller.js";
import upload from "../../middlewares/multer.middleware.js";
import verifyJwt from "../admin/admin.middleware.js";

const router = Router();

// Storefront (public)
router.get("/public/:slug", getPublicProductBySlug);
router.post("/:slug/view", recordProductView);

// Admin (protected)
router.use(verifyJwt);
router.get("/", getAllProducts);
router.get("/slug/suggest", suggestProductSlug);
router.post("/", upload.array("images", 10), createProduct);
router.get("/views/summary", getViewsSummary);
router.get("/views", getAllProductViews);
router.get("/:slug/views", getProductViewsBySlug);
router.patch("/:id", upload.array("images", 10), updateProductById);
router.delete("/:id", deleteProductById);
router.patch("/:id/publish", publishProduct);
router.patch("/:id/unpublish", unpublishProduct);

export default router;
