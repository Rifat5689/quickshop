import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
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
  const { slug = "premium-smart-watch-3" } = useParams();
  const {
    isProductLoading,
    product,
    productError,
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
    handleConfirmOrder: submitOrder,
    isLoading: isSubmitting,
    isLocked,
    register,
    errors,
    handleCloseSummary,
  } = useLandingPage({ slug });

  const [isSummaryVisible, setIsSummaryVisible] = useState(false);

  useEffect(() => {
    if (payload) setIsSummaryVisible(true);
  }, [payload]);

  const handleConfirmOrder = async () => {
    // submit and then animate modal out; onClosed will clear payload
    const success = await submitOrder();
    if (success === null) return;
    setIsSummaryVisible(false);
    if (success) {
      toast.success("অর্ডার সফল হয়েছে! শীঘ্রই যোগাযোগ করা হবে।", {
        position: "top-right",
      });
    } else {
      toast.error("অর্ডার সফল হয়নি। আবার চেষ্টা করুন।", {
        position: "top-right",
      });
    }
  };

  if (isProductLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-gray-200 border-t-indigo-500" />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex min-h-screen items-center justify-center px-6 text-center">
        <div className="max-w-sm space-y-3 rounded-xl border border-[#e8e3dc] bg-white p-6">
          <div className="text-lg font-semibold text-[#1f2937]">Landing page not found</div>
          <div className="text-sm text-[#6b6b6b]">
            {productError?.message || "Please check the URL or publish the page from the admin panel."}
          </div>
          <button
            type="button"
            onClick={() => window.location.reload()}
            className="mt-2 inline-flex items-center justify-center rounded-md bg-[#c8392b] px-4 py-2 text-sm font-semibold text-white"
          >
            Try again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-[480px] px-0 text-[15px] font-normal leading-relaxed">
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
      <BillingFrom register={register} errors={errors} />
      <PaymentSystem />
      <PlaceOrder
        total={total}
        isSubmitting={isSubmitting || isLocked}
        handleOrderSummary={handleOrderSummary}
      />
      {(payload || isSummaryVisible) && (
        <OrderSummary
          open={isSummaryVisible}
          payload={payload}
          product={product}
          total={total}
          onRequestClose={() => setIsSummaryVisible(false)}
          onClosed={() => handleCloseSummary()}
          onCancel={() => {
            // immediate cancel: clear payload and hide
            handleCloseSummary();
            setIsSummaryVisible(false);
          }}
          onConfirm={handleConfirmOrder}
          isSubmitting={isSubmitting || isLocked}
        />
      )}
      <ToastContainer autoClose={3000} hideProgressBar newestOnTop />
    </div>
  );
};

export default LandingPage;