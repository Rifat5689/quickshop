import { api } from "../../shared/api/axios";

const getProduct = async (slug) => {
  const safeSlug = slug || "premium-smart-watch-3";
  const result = await api.get(`/api/v1/products/public/${safeSlug}`);

  try {
    await api.post(`/api/v1/products/${safeSlug}/view`);
  } catch {
    // Ignore view logging failures to avoid blocking the landing page.
  }

  return result.data;
};

export { getProduct };
