import { useShopCopy } from "../../context/ShopSettingsContext";

const PriceBreakdown = ({ quantity, shippingPrice, total, product }) => {
  const { t } = useShopCopy();
  if (!product) return null;

  const subtotal = product.price * quantity;
  const discountRate = product.discount ?? 0;
  const discountAmount = Math.round((subtotal * discountRate) / 100);
  const hasDiscount = discountRate > 0 && discountAmount > 0;

  return (
    <section className="shop-section !pt-0">
      <div className="rounded-[var(--radius)] bg-[var(--bg)] p-3.5">
        <div className="flex justify-between py-1 text-[14px] text-[var(--muted)]">
          <span>{t("productPrice")}</span>
          <span>৳ {product.price.toLocaleString("bn-BD")}</span>
        </div>
        <div className="flex justify-between py-1 text-[14px] text-[var(--muted)]">
          <span>{t("qtyMultiplier")}</span>
          <span>× {quantity}</span>
        </div>
        {hasDiscount ? (
          <div className="flex justify-between py-1 text-[14px] text-[var(--success)]">
            <span>{t("discount")}</span>
            <span>− ৳ {discountAmount.toLocaleString("bn-BD")}</span>
          </div>
        ) : null}
        <div className="flex justify-between py-1 text-[14px] text-[var(--muted)]">
          <span>{t("deliveryCharge")}</span>
          <span>৳ {shippingPrice.toLocaleString("bn-BD")}</span>
        </div>
        <div className="mt-2 flex justify-between border-t-[1.5px] border-[var(--border)] pt-2.5 text-[17px] font-bold text-[var(--text)]">
          <span>{t("totalPayable")}</span>
          <span>৳ {total.toLocaleString("bn-BD")}</span>
        </div>
      </div>
    </section>
  );
};

export default PriceBreakdown;
