import { Router } from "express";
import {
  recordView,
  getAllPageViews,
  getViewsSummary,
  getPageViewsBySlug,
  getPublicPageBySlug,
  getAllPages,
  createPage,
  updatePage,
  deletePage,
  publishPage,
  unpublishPage,
} from "./page.controller.js";
import verifyJwt from "../admin/admin.middleware.js";

const router = Router();

// Public
router.route("/:slug/view").post(recordView);
router.route("/public/:slug").get(getPublicPageBySlug);

// Admin protected
router.use(verifyJwt);
router.route("/").get(getAllPages).post(createPage);
router.route("/:id").put(updatePage).delete(deletePage);
router.route("/:id/publish").patch(publishPage);
router.route("/:id/unpublish").patch(unpublishPage);
router.route("/views/summary").get(getViewsSummary);
router.route("/views").get(getAllPageViews);
router.route("/:slug/views").get(getPageViewsBySlug);

export default router;
