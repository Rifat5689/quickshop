import useCheckout from "./useCheckout";
import useProductDetails from "./useProductDetails";

const useLandingPage = ({ product }) => {
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
