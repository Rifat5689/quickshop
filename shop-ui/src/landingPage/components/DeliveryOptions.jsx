import { FaCity, FaTruck } from "react-icons/fa";
import { useShopCopy } from "../../context/ShopSettingsContext";

const DeliveryOptions = ({ DeliveryPlace, handleDeliveryPlace }) => {
  const { t } = useShopCopy();
  const isDhaka = DeliveryPlace === "dhaka";

  return (
    <section className="shop-section !pt-0">
      <p className="mb-3.5 text-[14px] font-semibold text-[var(--text)]">
        {t("deliveryOptions")}
      </p>

      <div className="flex gap-2.5">
        <button
          type="button"
          onClick={() => handleDeliveryPlace("dhaka")}
          className={`relative flex-1 rounded-[var(--radius)] border-[1.5px] px-2.5 py-3 text-left transition ${
            isDhaka
              ? "border-[var(--brand)] bg-[var(--brand-light)]"
              : "border-[var(--border)] bg-[var(--white)]"
          }`}
        >
          <span className="flex items-center gap-2 text-[13px] font-semibold text-[var(--text)]">
            <FaCity className="text-[var(--brand)]" /> {t("dhakaInside")}
          </span>
          <span className="mt-0.5 block text-[12px] text-[var(--muted)]">৳ ৭০</span>
          {isDhaka ? (
            <span className="absolute right-2 top-2 flex h-[18px] w-[18px] items-center justify-center rounded-full bg-[var(--brand)] text-[10px] text-white">
              ✓
            </span>
          ) : null}
        </button>

        <button
          type="button"
          onClick={() => handleDeliveryPlace("outside")}
          className={`relative flex-1 rounded-[var(--radius)] border-[1.5px] px-2.5 py-3 text-left transition ${
            !isDhaka
              ? "border-[var(--brand)] bg-[var(--brand-light)]"
              : "border-[var(--border)] bg-[var(--white)]"
          }`}
        >
          <span className="flex items-center gap-2 text-[13px] font-semibold text-[var(--text)]">
            <FaTruck className="text-[var(--brand)]" /> {t("dhakaOutside")}
          </span>
          <span className="mt-0.5 block text-[12px] text-[var(--muted)]">৳ ১২০</span>
          {!isDhaka ? (
            <span className="absolute right-2 top-2 flex h-[18px] w-[18px] items-center justify-center rounded-full bg-[var(--brand)] text-[10px] text-white">
              ✓
            </span>
          ) : null}
        </button>
      </div>
    </section>
  );
};

export default DeliveryOptions;
