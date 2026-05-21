import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useShopCopy } from "../../context/ShopSettingsContext";
import BillingFrom from "../components/BillingFrom";
import DeliveryOptions from "../components/DeliveryOptions";
import OrderSummary from "../components/OrderSummary";
import PaymentSystem from "../components/PaymentSystem";
import PlaceOrder from "../components/PlaceOrder";
import PriceBreakdown from "../components/PriceBreakdown";
import ProductDetails from "../components/ProductDetails";
import QuantitySelector from "../components/QuantitySelector";
import useLandingPage from "../hooks/useLandingPage";
import useDocumentTitle from "../hooks/useDocumentTitle";

const LandingPage = () => {
  const { slug } = useParams();
  const { t } = useShopCopy();
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

  useDocumentTitle(slug);

  const [isSummaryVisible, setIsSummaryVisible] = useState(false);

  useEffect(() => {
    if (payload) setIsSummaryVisible(true);
  }, [payload]);

  const handleConfirmOrder = async () => {
    const success = await submitOrder();
    if (success === null) return;
    setIsSummaryVisible(false);
    if (success) {
      toast.success(t("orderSuccess"), { position: "top-right" });
    } else {
      toast.error(t("orderFailed"), { position: "top-right" });
    }
  };

  if (!slug) {
    return (
      <div className="shop-page flex min-h-screen items-center justify-center px-6 text-center">
        <div className="max-w-sm space-y-3 rounded-[var(--radius)] border border-[var(--border)] bg-[var(--white)] p-6">
          <div className="text-lg font-semibold text-[var(--text)]">{t("openProduct")}</div>
          <div className="text-sm text-[var(--muted)]">{t("openProductHint")}</div>
        </div>
      </div>
    );
  }

  if (isProductLoading) {
    return (
      <div className="shop-page flex min-h-screen items-center justify-center">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-[var(--border)] border-t-[var(--brand)]" />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="shop-page flex min-h-screen items-center justify-center px-6 text-center">
        <div className="max-w-sm space-y-3 rounded-[var(--radius)] border border-[var(--border)] bg-[var(--white)] p-6">
          <div className="text-lg font-semibold text-[var(--text)]">{t("notFound")}</div>
          <div className="text-sm text-[var(--muted)]">
            {productError?.message || t("notFoundHint")}
          </div>
          <button
            type="button"
            onClick={() => window.location.reload()}
            className="mt-2 inline-flex items-center justify-center rounded-[var(--radius-sm)] bg-[var(--brand)] px-4 py-2 text-sm font-semibold text-white"
          >
            {t("tryAgain")}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="shop-page pb-24 text-[15px] leading-relaxed">
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
      <OrderSummary
        open={isSummaryVisible && Boolean(payload)}
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
      <ToastContainer autoClose={3000} hideProgressBar newestOnTop />
    </div>
  );
};

export default LandingPage;
