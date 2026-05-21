import { api } from "../../shared/api/axios";

const getProduct = async (slug) => {
    const safeSlug = slug || "";
    const result = await api.get(`/api/v1/products/public/${safeSlug}`);
    return result.data;
};

export { getProduct };