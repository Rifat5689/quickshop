import { uploadMultipleToCloudinary } from "../../services/cloudinary.service.js";
import { generateUniqueSlug } from "../../services/slug.service.js";
import ApiError from "../../utils/ApiError.js";
import { ApiResponse } from "../../utils/ApiResponse.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import Product from "./product.model.js";


const createProduct = asyncHandler(async (req, res) => {
  const { name, description, title, subtitle, price, category, stock = 0, discount = 0 } = req.body;

  if (!name || price === undefined) {
    throw new ApiError(400, "Mandatory fields are required");
  }

  const slug = await generateUniqueSlug(name);

  const files = req.files;
  if (!files || files.length === 0) throw new ApiError(400, "Images are required");

  const result = await uploadMultipleToCloudinary(files);
  if (!result) throw new ApiError(500, "Failed to upload images");

  const images = result.map((file) => ({
    url: file.secure_url,
    public_id: file.public_id,
  }));

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
    images,
  });

  if (!product) throw new ApiError(500, "Failed to create product");

  res.status(201).json(
    new ApiResponse(201, product, "Product created successfully")
  );
});


const getAllProducts = asyncHandler(async (req, res) => {
  const products = await Product.find().populate("category", "name");

  if (products.length === 0) throw new ApiError(404, "No products found");

  res.status(200).json(
    new ApiResponse(200, products, "All products sent successfully")
  );
});


const getProduct = asyncHandler(async (req, res) => {
  const { value } = req.params;

  let product;

  if (value.match(/^[0-9a-fA-F]{24}$/)) {
    product = await Product.findById(value).populate("category", "name");
  } else {
    product = await Product.findOne({ slug: value }).populate("category", "name");
  }

  if (!product) throw new ApiError(404, "Product not found");

  res.status(200).json(
    new ApiResponse(200, product, "Product fetched successfully")
  );
});


const updateProductById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const product = await Product.findById(id);
  if (!product) throw new ApiError(404, "Product not found");

  const allowedFields = ["name", "description", "title", "subtitle", "price", "stock", "discount", "category"];

  allowedFields.forEach((field) => {
    if (req.body[field] !== undefined) {
      product[field] = req.body[field];
    }
  });

  const files = req.files;
  if (files && files.length > 0) {
    const result = await uploadMultipleToCloudinary(files);
    if (!result) throw new ApiError(500, "Failed to upload images");
    product.images = result.map((file) => ({
      url: file.secure_url,
      public_id: file.public_id,
    }));
  }

  const updatedProduct = await product.save();

  if (!updatedProduct) throw new ApiError(500, "Failed to update product");

  res.status(200).json(
    new ApiResponse(200, updatedProduct, "Product updated successfully")
  );
});


const deleteProductById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const product = await Product.findByIdAndDelete(id);
  if (!product) throw new ApiError(404, "Product not found");

  res.status(200).json(
    new ApiResponse(200, null, "Product deleted successfully")
  );
});


export { createProduct, getAllProducts, updateProductById, deleteProductById, getProduct };