
import { useEffect } from "react";

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
  const quantity = payload?.quantity ?? 1;
  const shippingPrice = payload?.shippingDetails?.shippingPrice ?? 0;

  useEffect(() => {
    if (open) return;
    const t = setTimeout(() => {
      onClosed?.();
    }, 340);
    return () => clearTimeout(t);
  }, [open, onClosed]);

  if (!payload || !product) return null;

  const subtotal = product.price * quantity;
  const discountRate = product.discount ?? 0;
  const discountAmount = Math.round((subtotal * discountRate) / 100);
  const hasDiscount = discountRate > 0 && discountAmount > 0;
  const animClass = open ? "animate-slide-up" : "animate-slide-down";

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-black/55 px-0 py-0 backdrop-blur-sm"
      onClick={onRequestClose}
    >
      <div
        className={`w-full max-w-[480px] rounded-t-[24px] bg-white px-4 pb-5 pt-4 shadow-xl ${animClass}`}
        onClick={(event) => event.stopPropagation()}
      >
        <div className="mx-auto mb-3 h-1 w-10 rounded-full bg-[#e8e3dc]" />
        <h3 className="text-center text-[18px] font-bold text-[#1f2937]">
          অর্ডার নিশ্চিত করুন
        </h3>
        <p className="mt-1 text-center text-[12px] text-[#6b6b6b]">
          নিচের মূল্য তালিকা যাচাই করুন
        </p>

        <div className="mt-4 space-y-1 rounded-[12px] bg-[#faf8f5] p-3 text-[14px]">
          <div className="flex items-start justify-between gap-3">
            <span className="text-[#6b6b6b]">পণ্যের মূল্য</span>
            <span className="text-right font-semibold text-[#1f2937]">
              ৳ {product.price.toLocaleString("bn-BD")}
            </span>
          </div>
          <div className="flex items-start justify-between gap-3">
            <span className="text-[#6b7280]">পরিমাণ</span>
            <span className="text-right font-semibold text-[#1f2937]">{quantity} টি</span>
          </div>
          {hasDiscount ? (
            <div className="flex items-start justify-between gap-3 text-[#1a7a45]">
              <span>ছাড়</span>
              <span className="text-right font-semibold">
                − ৳ {discountAmount.toLocaleString("bn-BD")}
              </span>
            </div>
          ) : null}
          <div className="flex items-start justify-between gap-3">
            <span className="text-[#6b7280]">ডেলিভারি চার্জ</span>
            <span className="text-right font-semibold text-[#1f2937]">
              ৳ {shippingPrice.toLocaleString("bn-BD")}
            </span>
          </div>
        </div>

        <div className="mt-3 rounded-[12px] bg-[#fdecea] px-3 py-2.5 text-[16px] font-bold text-[#c8392b]">
          <div className="flex items-center justify-between">
            <span>সর্বমোট পরিশোধ</span>
            <span>৳ {total.toLocaleString("bn-BD")}</span>
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
                অর্ডার করা হচ্ছে...
              </>
            ) : (
              "✓ অর্ডার নিশ্চিত করুন"
            )}
          </button>
          <button
            type="button"
            onClick={() => {
              // immediate cancel: call onCancel if provided, else request close
              if (onCancel) onCancel();
              else onRequestClose();
            }}
            className="w-full rounded-[12px] border border-[#e8e3dc] py-2.5 text-[15px] font-semibold text-[#6b6b6b] transition hover:bg-[#faf8f5]"
          >
            বাতিল করুন
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;
