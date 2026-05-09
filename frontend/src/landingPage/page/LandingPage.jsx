import BillingFrom from "../components/BillingFrom";
import DeliveryOptions from "../components/DeliveryOptions";
import OrderSummary from "../components/OrderSummary";
import PaymentSystem from "../components/PaymentSystem";
import PlaceOrder from "../components/PlaceOrder";
import PriceBreakdown from "../components/PriceBreakdown";
import ProductDetails from "../components/ProductDetails";
import QuantitySelector from "../components/QuantitySelector";
import useLandingPage from "../hooks/useLandingPage";

const LandingPage = () => {
  const {
    isProductLoading,
    product,
    productDetails,
    handleSelectImage,
    handleToggleDescription,
    pauseAutoplay,
    resumeAutoplay,
    quantity,
    DeliveryPlace,
    payload,
    shippingPrice,
    total,
    handleQuantity,
    handleDeliveryPlace,
    handleOrderSummary,
    handleConfirmOrder,
    addressRef,
    nameRef,
    phoneRef,
    isLoading: isSubmitting,
  } = useLandingPage();

  if (isProductLoading || !product) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-gray-200 border-t-indigo-500" />
      </div>
    );
  }

  return (
    <div>
      <ProductDetails
        details={productDetails}
        onSelectImage={handleSelectImage}
        onToggleDescription={handleToggleDescription}
        onMouseEnter={pauseAutoplay}
        onMouseLeave={resumeAutoplay}
      />
      <QuantitySelector handleQuantity={handleQuantity} quantity={quantity} />
      <DeliveryOptions
        DeliveryPlace={DeliveryPlace}
        handleDeliveryPlace={handleDeliveryPlace}
      />
      <PriceBreakdown
        quantity={quantity}
        shippingPrice={shippingPrice}
        total={total}
        product={product}
      />
      <BillingFrom addressRef={addressRef} nameRef={nameRef} phoneRef={phoneRef} />
      <PaymentSystem />
      <PlaceOrder isSubmitting={isSubmitting} handleOrderSummary={handleOrderSummary} />
      {payload && <OrderSummary handleConfirmOrder={handleConfirmOrder} />}
    </div>
  );
};

export default LandingPage;