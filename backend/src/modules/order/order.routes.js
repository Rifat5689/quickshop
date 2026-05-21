import { Router } from "express";
import {
	getAllOrders,
	getOrderById,
	createOrder,
	confirmOrder,
	shipOrder,
	deliverOrder,
	cancelOrder,
	getDashboardStats,
	updatePaymentStatus,
} from "./order.controller.js";
import verifyJwt from "../admin/admin.middleware.js";

const router = Router();

// Public route - customers place orders
router.route("/").post(createOrder);

// Admin protected routes
router.use(verifyJwt);

router.route("/").get(getAllOrders);

router.route("/stats/dashboard").get(getDashboardStats);

router.route("/:id").get(getOrderById);

router.route("/:id/confirm").patch(confirmOrder);
router.route("/:id/ship").patch(shipOrder);
router.route("/:id/deliver").patch(deliverOrder);
router.route("/:id/cancel").patch(cancelOrder);
router.route("/:id/payment").patch(updatePaymentStatus);

export default router;
