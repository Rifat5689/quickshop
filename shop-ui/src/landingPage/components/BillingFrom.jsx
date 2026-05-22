import { useShopCopy } from "../../context/ProductLanguageContext";

const BillingFrom = ({ register, errors }) => {
  const { t } = useShopCopy();

  return (
    <section className="mt-3 bg-white px-4 py-[18px] sm:px-[18px]">
      <div className="text-[13px] font-semibold uppercase tracking-[0.2em] text-[#6b6b6b]">
        {t("billingSection")}
      </div>

      <div className="mt-4 space-y-4">
        <div>
          <label className="text-sm font-semibold text-[#1f2937]">
            {t("fullName")} <span className="text-[#d24535]">*</span>
          </label>
          <input
            type="text"
            placeholder={t("fullNamePlaceholder")}
            className="mt-2 h-[46px] w-full rounded-[8px] border border-[#e8e3dc] px-4 text-[15px] outline-none transition focus:border-[#c8392b]"
            {...register("fullName", { required: t("fullNameRequired") })}
          />
          {errors?.fullName ? (
            <p className="mt-1 text-xs font-medium text-[#d24535]">{errors.fullName.message}</p>
          ) : null}
        </div>

        <div>
          <label className="text-sm font-semibold text-[#1f2937]">
            {t("phone")} <span className="text-[#d24535]">*</span>
          </label>
          <input
            type="tel"
            placeholder={t("phonePlaceholder")}
            className="mt-2 h-[46px] w-full rounded-[8px] border border-[#e8e3dc] px-4 text-[15px] outline-none transition focus:border-[#c8392b]"
            {...register("phone", {
              required: t("phoneRequired"),
              pattern: {
                value: /^01\d{9}$/,
                message: t("phoneInvalid"),
              },
            })}
          />
          {errors?.phone ? (
            <p className="mt-1 text-xs font-medium text-[#d24535]">{errors.phone.message}</p>
          ) : null}
        </div>

        <div>
          <label className="text-sm font-semibold text-[#1f2937]">
            {t("address")} <span className="text-[#d24535]">*</span>
          </label>
          <input
            type="text"
            placeholder={t("addressPlaceholder")}
            className="mt-2 h-[46px] w-full rounded-[8px] border border-[#e8e3dc] px-4 text-[15px] outline-none transition focus:border-[#c8392b]"
            {...register("address", { required: t("addressRequired") })}
          />
          {errors?.address ? (
            <p className="mt-1 text-xs font-medium text-[#d24535]">{errors.address.message}</p>
          ) : null}
        </div>

        
      </div>
    </section>
  );
};

export default BillingFrom;
