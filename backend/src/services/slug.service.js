import Product from "../modules/product/product.model.js";
import { createSlug } from "../utils/slug.util.js";

export const generateUniqueSlug = async (name) => {
  const baseSlug = createSlug(name);

  // fetch all similar slugs in ONE query
  const existingSlugs = await Product.find({
    slug: new RegExp(`^${baseSlug}`)
  }).select("slug");

  if (!existingSlugs.length) return baseSlug;

  const slugSet = new Set(existingSlugs.map((p) => p.slug));

  let slug = baseSlug;
  let counter = 1;

  while (slugSet.has(slug)) {
    slug = `${baseSlug}-${counter}`;
    counter++;
  }

  return slug;
};