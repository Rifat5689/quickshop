import { Router } from "express";
import {
	createProduct,
	deleteProductById,
	getAllProducts,
	getProduct,
	updateProductById,
} from "./product.controller.js";
import upload from "../../middlewares/multer.middleware.js";
import verifyJwt from "../admin/admin.middleware.js";

const router = Router();

// Public routes
router.route("/").get(getAllProducts);
router.route("/:value").get(getProduct);

// Admin protected routes
router.route("/").post(verifyJwt, upload.array("images", 10), createProduct);
router.route("/:value").patch(verifyJwt, upload.array("images", 10), updateProductById).delete(verifyJwt, deleteProductById);

export default router;
