import { Router } from "express";
import {
	createCategory,
	getAllCategories,
	getCategoryById,
	updateCategory,
	deleteCategory,
} from "./category.controller.js";
import verifyJwt from "../admin/admin.middleware.js";

const router = Router();

// Public - anyone can read categories
router.route("/").get(getAllCategories);
router.route("/:id").get(getCategoryById);

// Admin protected
router.route("/").post(verifyJwt, createCategory);
router.route("/:id").patch(verifyJwt, updateCategory).delete(verifyJwt, deleteCategory);

export default router;