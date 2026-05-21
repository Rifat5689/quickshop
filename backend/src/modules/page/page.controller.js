import slugify from "slugify";
import { asyncHandler } from "../../utils/asyncHandler.js";
import ApiError from "../../utils/ApiError.js";
import { ApiResponse } from "../../utils/ApiResponse.js";
import Page from "./page.model.js";
import Product from "../product/product.model.js";

const recordView = asyncHandler(async (req, res) => {
  const { slug } = req.params;

  const page = await Page.findOne({ slug });
  if (!page) throw new ApiError(404, "Page not found");
  if (page.status !== "Live") throw new ApiError(403, "Page is not live");

  const today = new Date().toISOString().slice(0, 10);
  const thisMonth = new Date().toISOString().slice(0, 7);

  if (page.lastViewedDate !== today) {
    page.viewsToday = 0;
    page.lastViewedDate = today;
  }

  if (page.lastViewedMonth !== thisMonth) {
    page.viewsMonth = 0;
    page.lastViewedMonth = thisMonth;
  }

  page.viewsTotal += 1;
  page.viewsToday += 1;
  page.viewsMonth += 1;

  await page.save();

  res.status(200).json(new ApiResponse(200, null, "View recorded"));
});

const getAllPageViews = asyncHandler(async (req, res) => {
  const pages = await Page.find()
    .select("name slug status viewsTotal viewsToday viewsMonth")
    .sort({ viewsTotal: -1 });

  res
    .status(200)
    .json(new ApiResponse(200, pages, "Page views fetched successfully"));
});

const getViewsSummary = asyncHandler(async (req, res) => {
  const result = await Page.aggregate([
    {
      $group: {
        _id: null,
        viewsTotal: { $sum: "$viewsTotal" },
        viewsToday: { $sum: "$viewsToday" },
        viewsMonth: { $sum: "$viewsMonth" },
      },
    },
  ]);

  const summary =
    result.length > 0
      ? result[0]
      : { viewsTotal: 0, viewsToday: 0, viewsMonth: 0 };

  res
    .status(200)
    .json(new ApiResponse(200, summary, "Views summary fetched successfully"));
});

const getPageViewsBySlug = asyncHandler(async (req, res) => {
  const { slug } = req.params;

  const page = await Page.findOne({ slug }).select(
    "name slug status viewsTotal viewsToday viewsMonth"
  );

  if (!page) throw new ApiError(404, "Page not found");

  res
    .status(200)
    .json(new ApiResponse(200, page, "Page views fetched successfully"));
});

const getPublicPageBySlug = asyncHandler(async (req, res) => {
  const { slug } = req.params;

  const page = await Page.findOne({ slug, status: "Live" }).lean();

  if (!page) throw new ApiError(404, "Page not found");

  let product = null;
  if (page.productId) {
    product = await Product.findById(page.productId).lean();
  }

  const payload = {
    ...page,
    productId: product?._id || page.productId,
    name: product?.name ?? page.name,
    title: product?.title ?? page.title,
    subtitle: product?.subtitle ?? page.subtitle,
    description: product?.description ?? page.description,
    price: product?.price ?? page.price,
    discount: product?.discount ?? page.discount,
    stock: product?.stock ?? page.stock,
    images: product?.images ?? page.images,
  };

  res
    .status(200)
    .json(new ApiResponse(200, payload, "Page fetched successfully"));
});

const getAllPages = asyncHandler(async (req, res) => {
  const pages = await Page.find().sort({ createdAt: -1 });

  res
    .status(200)
    .json(new ApiResponse(200, pages, "Pages fetched successfully"));
});

const createPage = asyncHandler(async (req, res) => {
  const {
    name,
    title,
    subtitle,
    slug,
    productId,
    price,
    discount = 0,
    stock = 0,
    description = "",
    status,
    images = [],
  } = req.body;

  if (!name || price === undefined) {
    throw new ApiError(400, "Name and price are required");
  }

  const safeSlug = slug
    ? slug
    : slugify(name, { lower: true, strict: true, trim: true });

  const exists = await Page.findOne({ slug: safeSlug });
  if (exists) throw new ApiError(409, "Slug already exists");

  const page = await Page.create({
    name,
    title,
    subtitle,
    slug: safeSlug,
    productId,
    price,
    discount,
    stock,
    description,
    status: status || "Draft",
    images,
  });

  res.status(201).json(new ApiResponse(201, page, "Page created"));
});

const updatePage = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const {
    name,
    title,
    subtitle,
    productId,
    price,
    discount,
    stock,
    description,
    status,
    images,
  } = req.body;

  const page = await Page.findById(id);
  if (!page) throw new ApiError(404, "Page not found");

  if (name !== undefined) page.name = name;
  if (title !== undefined) page.title = title;
  if (subtitle !== undefined) page.subtitle = subtitle;
  if (productId !== undefined) page.productId = productId;
  if (price !== undefined) page.price = price;
  if (discount !== undefined) page.discount = discount;
  if (stock !== undefined) page.stock = stock;
  if (description !== undefined) page.description = description;
  if (status !== undefined) page.status = status;
  if (images !== undefined) page.images = images;

  const updated = await page.save();

  res.status(200).json(new ApiResponse(200, updated, "Page updated"));
});

const deletePage = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const page = await Page.findByIdAndDelete(id);
  if (!page) throw new ApiError(404, "Page not found");

  res.status(200).json(new ApiResponse(200, null, "Page deleted"));
});

const publishPage = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const page = await Page.findById(id);
  if (!page) throw new ApiError(404, "Page not found");

  page.status = "Live";
  const updated = await page.save();

  res.status(200).json(new ApiResponse(200, updated, "Page published"));
});

const unpublishPage = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const page = await Page.findById(id);
  if (!page) throw new ApiError(404, "Page not found");

  page.status = "Draft";
  const updated = await page.save();

  res.status(200).json(new ApiResponse(200, updated, "Page unpublished"));
});

export {
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
};
