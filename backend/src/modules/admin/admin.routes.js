import { Router } from "express";
import { register, logIn, logOut, getMe, refreshAccessToken } from "./admin.controller.js";
import verifyJwt from "./admin.middleware.js";

const router = Router();

// Public auth routes
router.route("/auth/register").post(register);
router.route("/auth/login").post(logIn);
router.route("/auth/refresh").post(refreshAccessToken);

// Logout should be protected
router.route("/auth/logout").post(verifyJwt, logOut);
router.route("/auth/me").get(verifyJwt, getMe);

export default router;