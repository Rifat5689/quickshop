import { uploadMultipleToCloudinary } from "../../services/cloudinary.service.js";
import { generateUniqueSlug, suggestUniqueSlug } from "../../services/slug.service.js";
import ApiError from "../../utils/ApiError.js";
import { ApiResponse } from "../../utils/ApiResponse.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import Product from "./product.model.js";

const pickBody = (body, fields) =>
  fields.reduce((acc, field) => {
    if (body[field] !== undefined) acc[field] = body[field];
    return acc;
  }, {});

const uploadImages = async (files) => {
  if (!files?.length) return null;
  const result = await uploadMultipleToCloudinary(files);
  if (!result) throw new ApiError(500, "Failed to upload images");
  return result.map((file) => ({
    url: file.secure_url,
    public_id: file.public_id,
  }));
};

// ——— Storefront (public) ———

const getPublicProductBySlug = asyncHandler(async (req, res) => {
  const product = await Product.findOne({
    slug: req.params.slug,
    status: "Live",
  }).lean();

  if (!product) throw new ApiError(404, "Product not found");

  res
    .status(200)
    .json(new ApiResponse(200, product, "Product fetched successfully"));
});

const recordProductView = asyncHandler(async (req, res) => {
  const product = await Product.findOne({ slug: req.params.slug });
  if (!product) throw new ApiError(404, "Product not found");
  if (product.status !== "Live") throw new ApiError(403, "Product is not live");

  const today = new Date().toISOString().slice(0, 10);
  const thisMonth = new Date().toISOString().slice(0, 7);

  if (product.lastViewedDate !== today) {
    product.viewsToday = 0;
    product.lastViewedDate = today;
  }

  if (product.lastViewedMonth !== thisMonth) {
    product.viewsMonth = 0;
    product.lastViewedMonth = thisMonth;
  }

  product.viewsTotal += 1;
  product.viewsToday += 1;
  product.viewsMonth += 1;
  await product.save();

  res.status(200).json(new ApiResponse(200, null, "View recorded"));
});

// ——— Admin (protected) ———

const getAllProducts = asyncHandler(async (req, res) => {
  const products = await Product.find().sort({ createdAt: -1 });

  res
    .status(200)
    .json(new ApiResponse(200, products, "Products fetched successfully"));
});

const suggestProductSlug = asyncHandler(async (req, res) => {
  const { name = "", slug = "", excludeId = null } = req.query;
  const suggestedSlug = await suggestUniqueSlug({ name, slug, excludeId });

  res
    .status(200)
    .json(new ApiResponse(200, { slug: suggestedSlug }, "Slug suggested"));
});

const createProduct = asyncHandler(async (req, res) => {
  const {
    name,
    description = "",
    title = "",
    subtitle = "",
    price,
    category,
    stock = 0,
    discount = 0,
    status = "Draft",
    url = "",
    language = "bn",
  } = req.body;

  if (!name || price === undefined) {
    throw new ApiError(400, "Name and price are required");
  }

  const images = await uploadImages(req.files);
  if (!images) throw new ApiError(400, "Images are required");

  const slug = await generateUniqueSlug(name, req.body.slug);

  const pageLanguage = language === "en" ? "en" : "bn";

  const product = await Product.create({
    name,
    title,
    subtitle,
    slug,
    description,
    price,
    category: category || undefined,
    stock,
    discount,
    status,
    url,
    language: pageLanguage,
    images,
  });

  res
    .status(201)
    .json(new ApiResponse(201, product, "Product created successfully"));
});

const updateProductById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const product = await Product.findById(id);
  if (!product) throw new ApiError(404, "Product not found");

  const updates = pickBody(req.body, [
    "name",
    "description",
    "title",
    "subtitle",
    "price",
    "stock",
    "discount",
    "category",
    "status",
    "url",
    "language",
  ]);

  if (updates.language !== undefined) {
    updates.language = updates.language === "en" ? "en" : "bn";
  }

  Object.assign(product, updates);

  if (req.body.slug !== undefined || req.body.name !== undefined) {
    const slugSource =
      req.body.slug !== undefined ? req.body.slug : req.body.name;
    product.slug = await generateUniqueSlug(
      slugSource,
      req.body.slug,
      id
    );
  }

  const newImages = await uploadImages(req.files);
  if (newImages) product.images = newImages;

  const updated = await product.save();

  res
    .status(200)
    .json(new ApiResponse(200, updated, "Product updated successfully"));
});

const deleteProductById = asyncHandler(async (req, res) => {
  const product = await Product.findByIdAndDelete(req.params.id);
  if (!product) throw new ApiError(404, "Product not found");

  res
    .status(200)
    .json(new ApiResponse(200, null, "Product deleted successfully"));
});

const publishProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) throw new ApiError(404, "Product not found");

  product.status = "Live";
  const updated = await product.save();

  res
    .status(200)
    .json(new ApiResponse(200, updated, "Product published"));
});

const unpublishProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) throw new ApiError(404, "Product not found");

  product.status = "Draft";
  const updated = await product.save();

  res
    .status(200)
    .json(new ApiResponse(200, updated, "Product unpublished"));
});

const getAllProductViews = asyncHandler(async (req, res) => {
  const products = await Product.find()
    .select("name slug status viewsTotal viewsToday viewsMonth")
    .sort({ viewsTotal: -1 });

  res
    .status(200)
    .json(new ApiResponse(200, products, "Product views fetched successfully"));
});

const getViewsSummary = asyncHandler(async (req, res) => {
  const result = await Product.aggregate([
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

const getProductViewsBySlug = asyncHandler(async (req, res) => {
  const product = await Product.findOne({ slug: req.params.slug }).select(
    "name slug status viewsTotal viewsToday viewsMonth"
  );

  if (!product) throw new ApiError(404, "Product not found");

  res
    .status(200)
    .json(new ApiResponse(200, product, "Product views fetched successfully"));
});

export {
  getPublicProductBySlug,
  recordProductView,
  getAllProducts,
  suggestProductSlug,
  createProduct,
  updateProductById,
  deleteProductById,
  publishProduct,
  unpublishProduct,
  getAllProductViews,
  getViewsSummary,
  getProductViewsBySlug,
};
