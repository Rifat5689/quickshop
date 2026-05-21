import Product from "../modules/product/product.model.js";
import ApiError from "../utils/ApiError.js";
import { createSlug } from "../utils/slug.util.js";

export const generateUniqueSlug = async (name, preferredSlug, excludeId = null) => {
  const baseSlug = preferredSlug ? createSlug(preferredSlug) : createSlug(name);

  if (!baseSlug) {
    throw new ApiError(400, "Valid name or slug is required");
  }

  let candidate = baseSlug;
  let suffix = 2;

  while (true) {
    const query = { slug: candidate };
    if (excludeId) {
      query._id = { $ne: excludeId };
    }

    const exists = await Product.exists(query);
    if (!exists) return candidate;

    candidate = `${baseSlug}-${suffix}`;
    suffix += 1;
  }
};

export const suggestUniqueSlug = async ({ name = "", slug = "", excludeId = null } = {}) => {
  const source = slug || name;
  return generateUniqueSlug(source, slug || undefined, excludeId);
};
