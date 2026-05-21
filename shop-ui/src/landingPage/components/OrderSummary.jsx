import { useEffect, useState } from "react";
import { useShopCopy } from "../../context/ShopSettingsContext";

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
  const { t } = useShopCopy();
  const [mounted, setMounted] = useState(false);
  const [visible, setVisible] = useState(false);

  const quantity = payload?.quantity ?? 1;
  const shippingPrice = payload?.shippingDetails?.shippingPrice ?? 0;

  useEffect(() => {
    if (open) {
      setMounted(true);
      const frame = requestAnimationFrame(() => {
        requestAnimationFrame(() => setVisible(true));
      });
      return () => cancelAnimationFrame(frame);
    }

    setVisible(false);
    const timer = setTimeout(() => {
      setMounted(false);
      onClosed?.();
    }, 420);
    return () => clearTimeout(timer);
  }, [open]);

  if (!mounted || !payload || !product) return null;

  const subtotal = product.price * quantity;
  const discountRate = product.discount ?? 0;
  const discountAmount = Math.round((subtotal * discountRate) / 100);
  const hasDiscount = discountRate > 0 && discountAmount > 0;

  return (
    <div
      className={`order-overlay fixed inset-0 z-50 flex items-end justify-center bg-black/60 px-0 backdrop-blur-[3px] ${
        visible ? "order-overlay--open" : ""
      }`}
      onClick={onRequestClose}
      role="presentation"
    >
      <div
        className={`order-sheet w-full max-w-[480px] rounded-t-[24px] bg-white px-5 pb-9 pt-5 shadow-[0_12px_40px_rgba(0,0,0,0.15)] ${
          visible ? "order-sheet--open" : ""
        }`}
        onClick={(event) => event.stopPropagation()}
        role="dialog"
        aria-modal="true"
      >
        <div className="mx-auto mb-5 h-1 w-10 rounded bg-[var(--border)]" />

        <h3 className="font-display text-center text-[20px] font-bold text-[var(--text)]">
          {t("confirmOrderTitle")}
        </h3>
        <p className="mt-1.5 text-center text-[13px] text-[var(--muted)]">
          {t("confirmOrderSub")}
        </p>

        <div className="order-detail-card mt-5 rounded-[var(--radius)] bg-[var(--bg)] p-4">
          <div className="flex items-start justify-between gap-3 border-b border-[var(--border)] py-2 text-[14px]">
            <span className="max-w-[45%] text-[var(--muted)]">{t("productPrice")}</span>
            <span className="max-w-[55%] text-right font-semibold text-[var(--text)]">
              ৳ {product.price.toLocaleString("bn-BD")}
            </span>
          </div>
          <div className="flex items-start justify-between gap-3 border-b border-[var(--border)] py-2 text-[14px]">
            <span className="max-w-[45%] text-[var(--muted)]">{t("qtyMultiplier")}</span>
            <span className="max-w-[55%] text-right font-semibold text-[var(--text)]">
              {quantity} {t("pcs")}
            </span>
          </div>
          {hasDiscount ? (
            <div className="flex items-start justify-between gap-3 border-b border-[var(--border)] py-2 text-[14px] text-[var(--success)]">
              <span className="max-w-[45%]">{t("discount")}</span>
              <span className="max-w-[55%] text-right font-semibold">
                − ৳ {discountAmount.toLocaleString("bn-BD")}
              </span>
            </div>
          ) : null}
          <div className="flex items-start justify-between gap-3 py-2 text-[14px]">
            <span className="max-w-[45%] text-[var(--muted)]">{t("deliveryCharge")}</span>
            <span className="max-w-[55%] text-right font-semibold text-[var(--text)]">
              ৳ {shippingPrice.toLocaleString("bn-BD")}
            </span>
          </div>
        </div>

        <div className="od-total-row mt-4 flex items-center justify-between rounded-[var(--radius-sm)] bg-[var(--brand-light)] px-4 py-3.5">
          <span className="text-[15px] font-bold text-[var(--brand)]">{t("confirmTotal")}</span>
          <span className="text-[22px] font-bold text-[var(--brand)]">
            ৳ {total.toLocaleString("bn-BD")}
          </span>
        </div>

        <div className="mt-5 space-y-2.5">
          <button
            type="button"
            onClick={onConfirm}
            disabled={isSubmitting}
            className="flex h-[54px] w-full items-center justify-center gap-2 rounded-[var(--radius)] bg-[var(--brand)] text-[17px] font-bold text-white shadow-[0_4px_16px_rgba(200,57,43,0.35)] transition hover:bg-[var(--brand-dark)] active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60"
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
            className="h-[46px] w-full rounded-[var(--radius)] border-[1.5px] border-[var(--border)] text-[15px] font-semibold text-[var(--muted)] transition hover:bg-[var(--bg)]"
          >
            {t("cancel")}
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;
