import { useQuery } from '@tanstack/react-query';
import { getProduct } from '../services/product.service';

const useProduct = (slug) => {
  return useQuery({
    queryKey: ["product", slug],
    queryFn: () => getProduct(slug),
    enabled: Boolean(slug),
    retry: false,
  });
};

export default useProduct;