import { FaMinus, FaPlus } from "react-icons/fa";
import { useShopCopy } from "../../context/ShopSettingsContext";

const QuantitySelector = ({ quantity, handleQuantity }) => {
  const { t } = useShopCopy();

  return (
    <section className="shop-section">
      <div className="shop-section-title">{t("orderSection")}</div>

      <div className="flex items-center gap-3">
        <span className="flex-1 text-[14px] font-medium text-[var(--text)]">
          {t("quantity")}
        </span>
        <div className="flex items-center overflow-hidden rounded-[10px] border-[1.5px] border-[var(--border)]">
          <button
            type="button"
            onClick={() => handleQuantity(false)}
            className="flex h-[38px] w-[38px] items-center justify-center text-[20px] font-bold text-[var(--brand)] transition active:bg-[var(--brand-light)]"
            aria-label="Decrease quantity"
          >
            <FaMinus className="text-[12px]" />
          </button>
          <div className="min-w-[44px] border-x border-[var(--border)] bg-[var(--white)] text-center text-[17px] font-bold text-[var(--text)]">
            {quantity}
          </div>
          <button
            type="button"
            onClick={() => handleQuantity(true)}
            className="flex h-[38px] w-[38px] items-center justify-center text-[20px] font-bold text-[var(--brand)] transition active:bg-[var(--brand-light)]"
            aria-label="Increase quantity"
          >
            <FaPlus className="text-[12px]" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default QuantitySelector;
