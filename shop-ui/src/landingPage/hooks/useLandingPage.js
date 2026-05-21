import useCheckout from "./useCheckout";
import useProduct from "./useProduct";
import useProductDetails from "./useProductDetails";

const useLandingPage = ({ slug }) => {
  const { isLoading: isProductLoading, data, error } = useProduct(slug);
  const product = data?.data;

  const {
    details: productDetails,
    handleSelectImage,
    handleToggleDescription,
    pauseAutoplay,
    resumeAutoplay,
    stopAutoplay,
  } = useProductDetails(product);

  const checkout = useCheckout({ product });

  return {
    isProductLoading,
    productError: error,
    product,
    productDetails,
    handleSelectImage,
    handleToggleDescription,
    pauseAutoplay,
    resumeAutoplay,
    stopAutoplay,
    ...checkout,
  };
};

export default useLandingPage;