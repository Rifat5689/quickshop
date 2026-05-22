import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ProductLanguageProvider, useShopCopy } from "../../context/ProductLanguageContext";
import BillingFrom from "../components/BillingFrom";
import DeliveryOptions from "../components/DeliveryOptions";
import OrderSummary from "../components/OrderSummary";
import PaymentSystem from "../components/PaymentSystem";
import PlaceOrder from "../components/PlaceOrder";
import PriceBreakdown from "../components/PriceBreakdown";
import ProductDetails from "../components/ProductDetails";
import QuantitySelector from "../components/QuantitySelector";
import useLandingPage from "../hooks/useLandingPage";
import useProduct from "../hooks/useProduct";

const LandingPageNotFound = ({ productError }) => {
  const { t } = useShopCopy();

  return (
    <div className="flex min-h-screen items-center justify-center px-6 text-center">
      <div className="max-w-sm space-y-3 rounded-xl border border-[#e8e3dc] bg-white p-6">
        <div className="text-lg font-semibold text-[#1f2937]">{t("notFound")}</div>
        <div className="text-sm text-[#6b6b6b]">
          {productError?.response?.data?.message ||
            productError?.message ||
            t("notFoundHint")}
        </div>
        <button
          type="button"
          onClick={() => window.location.reload()}
          className="mt-2 inline-flex items-center justify-center rounded-md bg-[#c8392b] px-4 py-2 text-sm font-semibold text-white"
        >
          {t("tryAgain")}
        </button>
      </div>
    </div>
  );
};

const LandingPageContent = ({ product }) => {
  const { t } = useShopCopy();
  const {
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
  } = useLandingPage({ product });

  const [isSummaryVisible, setIsSummaryVisible] = useState(false);

  useEffect(() => {
    if (!payload) {
      setIsSummaryVisible(false);
      return;
    }
    setIsSummaryVisible(true);
  }, [payload]);

  const handleConfirmOrder = async () => {
    const success = await submitOrder();
    if (success === null) return;
    setIsSummaryVisible(false);
    if (success) {
      toast.success(t("orderSuccess"), { position: "top-right" });
      window.setTimeout(() => {
        window.location.reload();
      }, 900);
      return;
    }
    toast.error(t("orderFailed"), { position: "top-right" });
  };

  return (
    <div className="mx-auto  px-0 font-sans text-[15px] font-normal leading-relaxed">
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

const LandingPage = () => {
  const { slug = "premium-smart-watch-3" } = useParams();
  const { isLoading: isProductLoading, data, error } = useProduct(slug);
  const product = data?.data;

  if (isProductLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-gray-200 border-t-indigo-500" />
      </div>
    );
  }

  if (!product) {
    return (
      <ProductLanguageProvider language="bn">
        <LandingPageNotFound productError={error} />
      </ProductLanguageProvider>
    );
  }

  return (
    <ProductLanguageProvider language={product.language}>
      <LandingPageContent product={product} />
    </ProductLanguageProvider>
  );
};

export default LandingPage;
