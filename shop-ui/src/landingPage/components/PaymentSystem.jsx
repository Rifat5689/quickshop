import { FaMoneyBillWave, FaShieldAlt, FaCheckCircle } from "react-icons/fa";
import { useShopCopy } from "../../context/ProductLanguageContext";

const PaymentSystem = () => {
  const { t } = useShopCopy();

  return (
    <section className="mt-3 bg-white px-4 py-[18px] sm:px-[18px]">
      <div className="text-[13px] font-semibold uppercase tracking-[0.2em] text-[#6b6b6b]">
        {t("paymentSection")}
      </div>

      <div className="mt-4 flex items-center gap-3 rounded-[12px] border border-[#e8e3dc] p-[14px] transition">
        <div className="flex h-10 w-10 items-center justify-center rounded-[10px] bg-[#f5f5f5] text-[#c8392b]">
          <FaMoneyBillWave className="text-[18px]" />
        </div>
        <div>
          <div className="text-[14px] font-semibold text-[#1f2937]">{t("cod")}</div>
          <div className="text-[12px] text-[#6b6b6b]">{t("codSub")}</div>
        </div>
        <div className="ml-auto flex h-5 w-5 items-center justify-center rounded-full border-2 border-[#c8392b] bg-[#c8392b]">
          <span className="h-2 w-2 rounded-full bg-white" />
        </div>
      </div>

      <div className="mt-4 flex flex-wrap items-center justify-center gap-3 text-[11px] text-[#6b6b6b]">
        <span className="flex items-center gap-2">
          <FaShieldAlt className="text-[14px] text-[#1a7a45]" /> {t("safe")}
        </span>
        <span className="flex items-center gap-2">
          <FaCheckCircle className="text-[14px] text-[#1a7a45]" /> {t("original")}
        </span>
      </div>
    </section>
  );
};

export default PaymentSystem;
