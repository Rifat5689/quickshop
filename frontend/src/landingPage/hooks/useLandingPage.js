import useCheckout from "./useCheckout";
import useProduct from "./useProduct";
import useProductDetails from "./useProductDetails";

const useLandingPage = () => {
  const { isLoading: isProductLoading, data } = useProduct();
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