import Category from "./category.model.js";
import ApiError from "../../utils/ApiError.js";
import { ApiResponse } from "../../utils/ApiResponse.js";
import { asyncHandler } from "../../utils/asyncHandler.js";


const createCategory = asyncHandler(async (req, res) => {
  const { name, description } = req.body;

  if (!name) throw new ApiError(400, "Category name is required");

  const existing = await Category.findOne({ name: name.trim() });
  if (existing) throw new ApiError(409, "Category already exists");

  const category = await Category.create({ name, description });

  if (!category) throw new ApiError(500, "Failed to create category");

  res.status(201).json(
    new ApiResponse(201, category, "Category created successfully")
  );
});


const getAllCategories = asyncHandler(async (req, res) => {
  const categories = await Category.find({ isActive: true });

  res.status(200).json(
    new ApiResponse(200, categories, "Categories fetched successfully")
  );
});


const getCategoryById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const category = await Category.findById(id);
  if (!category) throw new ApiError(404, "Category not found");

  res.status(200).json(
    new ApiResponse(200, category, "Category fetched successfully")
  );
});


const updateCategory = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const category = await Category.findById(id);
  if (!category) throw new ApiError(404, "Category not found");

  const { name, description, isActive } = req.body;

  if (name !== undefined) category.name = name;
  if (description !== undefined) category.description = description;
  if (isActive !== undefined) category.isActive = isActive;

  const updated = await category.save();

  res.status(200).json(
    new ApiResponse(200, updated, "Category updated successfully")
  );
});


const deleteCategory = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const category = await Category.findByIdAndDelete(id);
  if (!category) throw new ApiError(404, "Category not found");

  res.status(200).json(
    new ApiResponse(200, null, "Category deleted successfully")
  );
});


export { createCategory, getAllCategories, getCategoryById, updateCategory, deleteCategory };
