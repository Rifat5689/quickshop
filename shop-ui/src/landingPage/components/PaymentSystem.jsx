import { FaCheckCircle, FaMoneyBillWave, FaShieldAlt } from "react-icons/fa";
import { useShopCopy } from "../../context/ShopSettingsContext";

const PaymentSystem = () => {
  const { t } = useShopCopy();

  return (
    <section className="shop-section">
      <div className="shop-section-title">{t("paymentSection")}</div>

      <div className="flex items-center gap-3 rounded-[var(--radius)] border-[1.5px] border-[var(--brand)] bg-[var(--brand-light)] p-3.5">
        <div className="flex h-10 w-10 items-center justify-center rounded-[10px] bg-[#f5f5f5] text-xl">
          <FaMoneyBillWave className="text-[var(--brand)]" />
        </div>
        <div>
          <div className="text-[14px] font-semibold text-[var(--text)]">{t("cod")}</div>
          <div className="text-[12px] text-[var(--muted)]">{t("codSub")}</div>
        </div>
        <div className="ml-auto flex h-5 w-5 items-center justify-center rounded-full border-2 border-[var(--brand)] bg-[var(--brand)]">
          <span className="h-2 w-2 rounded-full bg-white" />
        </div>
      </div>

      <div className="mt-4 flex flex-wrap items-center justify-center gap-3 text-[11px] text-[var(--muted)]">
        <span className="flex items-center gap-2">
          <FaShieldAlt className="text-[14px] text-[var(--success)]" /> {t("safe")}
        </span>
        <span className="flex items-center gap-2">
          <FaCheckCircle className="text-[14px] text-[var(--success)]" /> {t("original")}
        </span>
      </div>
    </section>
  );
};

export default PaymentSystem;
