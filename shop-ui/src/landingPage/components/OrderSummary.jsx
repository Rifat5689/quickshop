import { useEffect, useState } from "react";
import { useShopCopy } from "../../context/ProductLanguageContext";

const CLOSE_MS = 480;
const OPEN_MS = 520;

const OrderSummary = ({
  open,
  payload,
  product,
  total,
  onRequestClose,
  onClosed,
  onConfirm,
  onCancel,
  isSubmitting,
}) => {
  const { t, locale } = useShopCopy();
  const [mounted, setMounted] = useState(false);
  const [sheetOpen, setSheetOpen] = useState(false);

  const quantity = payload?.quantity ?? 1;
  const shippingPrice = payload?.shippingDetails?.shippingPrice ?? 0;

  useEffect(() => {
    if (open && payload && product) {
      setMounted(true);
      const timer = window.setTimeout(() => setSheetOpen(true), 16);
      return () => window.clearTimeout(timer);
    }
    setSheetOpen(false);
  }, [open, payload, product]);

  useEffect(() => {
    if (sheetOpen || !mounted) return;
    const timer = window.setTimeout(() => {
      setMounted(false);
      onClosed?.();
    }, CLOSE_MS);
    return () => window.clearTimeout(timer);
  }, [sheetOpen, mounted, onClosed]);

  if (!mounted || !payload || !product) return null;

  const subtotal = product.price * quantity;
  const discountRate = Number(product.discount) || 0;
  const discountAmount = Math.round((subtotal * discountRate) / 100);
  const hasDiscount = discountRate > 0 && discountAmount > 0;

  return (
    <div
      className={`fixed inset-0 z-50 flex items-end justify-center px-0 py-0 transition-opacity duration-500 ease-out ${
        sheetOpen ? "bg-black/55 backdrop-blur-sm" : "bg-black/0 backdrop-blur-none"
      }`}
      style={{ transitionDuration: `${OPEN_MS}ms` }}
      onClick={onRequestClose}
      aria-hidden={!sheetOpen}
    >
      <div
        className={`w-full max-w-[480px] rounded-t-[24px] bg-white px-4 pb-5 pt-4 shadow-xl transition-transform ease-[cubic-bezier(0.22,1,0.36,1)] will-change-transform ${
          sheetOpen ? "translate-y-0" : "translate-y-full"
        }`}
        style={{ transitionDuration: `${sheetOpen ? OPEN_MS : CLOSE_MS}ms` }}
        onClick={(event) => event.stopPropagation()}
        role="dialog"
        aria-modal="true"
      >
        <div className="mx-auto mb-3 h-1 w-10 rounded-full bg-[#e8e3dc]" />
        <h3 className="text-center text-[18px] font-bold text-[#1f2937]">
          {t("confirmOrderTitle")}
        </h3>
        <p className="mt-1 text-center text-[12px] text-[#6b6b6b]">{t("confirmOrderSub")}</p>

        <div className="mt-4 space-y-1 rounded-[12px] bg-[#faf8f5] p-3 text-[14px]">
          <div className="flex items-start justify-between gap-3">
            <span className="text-[#6b6b6b]">{t("productPrice")}</span>
            <span className="text-right font-semibold text-[#1f2937]">
              ৳ {product.price.toLocaleString(locale)}
            </span>
          </div>
          <div className="flex items-start justify-between gap-3">
            <span className="text-[#6b7280]">{t("qtyMultiplier")}</span>
            <span className="text-right font-semibold text-[#1f2937]">
              {quantity} {t("pcs")}
            </span>
          </div>
          {hasDiscount ? (
            <div className="flex items-start justify-between gap-3 text-[#1a7a45]">
              <span>{t("discount")}</span>
              <span className="text-right font-semibold">
                − ৳ {discountAmount.toLocaleString(locale)}
              </span>
            </div>
          ) : null}
          <div className="flex items-start justify-between gap-3">
            <span className="text-[#6b7280]">{t("deliveryCharge")}</span>
            <span className="text-right font-semibold text-[#1f2937]">
              ৳ {shippingPrice.toLocaleString(locale)}
            </span>
          </div>
        </div>

        <div className="mt-3 rounded-[12px] bg-[#fdecea] px-3 py-2.5 text-[16px] font-bold text-[#c8392b]">
          <div className="flex items-center justify-between">
            <span>{t("confirmTotal")}</span>
            <span>৳ {total.toLocaleString(locale)}</span>
          </div>
        </div>

        <div className="mt-4 space-y-2.5">
          <button
            type="button"
            onClick={onConfirm}
            disabled={isSubmitting}
            className="flex w-full items-center justify-center gap-2 rounded-[12px] bg-[#c8392b] py-[10px] text-[16px] font-bold text-white shadow-md transition hover:bg-[#9b2b1e] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSubmitting ? (
              <>
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
                {t("confirming")}
              </>
            ) : (
              t("confirmBtn")
            )}
          </button>
          <button
            type="button"
            onClick={() => {
              if (onCancel) onCancel();
              else onRequestClose();
            }}
            className="w-full rounded-[12px] border border-[#e8e3dc] py-2.5 text-[15px] font-semibold text-[#6b6b6b] transition hover:bg-[#faf8f5]"
          >
            {t("cancel")}
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;
