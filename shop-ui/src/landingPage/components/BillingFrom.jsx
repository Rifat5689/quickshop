import { useShopCopy } from "../../context/ShopSettingsContext";

const BillingFrom = ({ register, errors }) => {
  const { t } = useShopCopy();

  return (
    <section className="shop-section">
      <div className="shop-section-title">{t("billingSection")}</div>

      <div className="space-y-3.5">
        <div>
          <label className="mb-1.5 block text-[13px] font-semibold text-[var(--text)]">
            {t("fullName")} <span className="text-[var(--brand)]">*</span>
          </label>
          <input
            type="text"
            placeholder={t("fullNamePlaceholder")}
            className="h-[46px] w-full rounded-[var(--radius-sm)] border-[1.5px] border-[var(--border)] px-3.5 text-[15px] text-[var(--text)] outline-none transition focus:border-[var(--brand)]"
            {...register("fullName", { required: t("fullNameRequired") })}
          />
          {errors?.fullName ? (
            <p className="mt-1 text-xs font-medium text-[var(--brand)]">
              {errors.fullName.message}
            </p>
          ) : null}
        </div>

        <div>
          <label className="mb-1.5 block text-[13px] font-semibold text-[var(--text)]">
            {t("phone")} <span className="text-[var(--brand)]">*</span>
          </label>
          <input
            type="tel"
            placeholder={t("phonePlaceholder")}
            className="h-[46px] w-full rounded-[var(--radius-sm)] border-[1.5px] border-[var(--border)] px-3.5 text-[15px] text-[var(--text)] outline-none transition focus:border-[var(--brand)]"
            {...register("phone", {
              required: t("phoneRequired"),
              pattern: {
                value: /^01\d{9}$/,
                message: t("phoneInvalid"),
              },
            })}
          />
          {errors?.phone ? (
            <p className="mt-1 text-xs font-medium text-[var(--brand)]">
              {errors.phone.message}
            </p>
          ) : null}
        </div>

        <div>
          <label className="mb-1.5 block text-[13px] font-semibold text-[var(--text)]">
            {t("address")} <span className="text-[var(--brand)]">*</span>
          </label>
          <input
            type="text"
            placeholder={t("addressPlaceholder")}
            className="h-[46px] w-full rounded-[var(--radius-sm)] border-[1.5px] border-[var(--border)] px-3.5 text-[15px] text-[var(--text)] outline-none transition focus:border-[var(--brand)]"
            {...register("address", { required: t("addressRequired") })}
          />
          {errors?.address ? (
            <p className="mt-1 text-xs font-medium text-[var(--brand)]">
              {errors.address.message}
            </p>
          ) : null}
        </div>

        <div className="grid grid-cols-2 gap-2.5">
          <div>
            <label className="mb-1.5 block text-[13px] font-semibold text-[var(--text)]">
              {t("city")}
            </label>
            <input
              type="text"
              placeholder={t("cityPlaceholder")}
              className="h-[46px] w-full rounded-[var(--radius-sm)] border-[1.5px] border-[var(--border)] px-3.5 text-[15px] text-[var(--text)] outline-none transition focus:border-[var(--brand)]"
              {...register("city")}
            />
          </div>
          <div>
            <label className="mb-1.5 block text-[13px] font-semibold text-[var(--text)]">
              {t("postal")}
            </label>
            <input
              type="text"
              placeholder={t("postalPlaceholder")}
              className="h-[46px] w-full rounded-[var(--radius-sm)] border-[1.5px] border-[var(--border)] px-3.5 text-[15px] text-[var(--text)] outline-none transition focus:border-[var(--brand)]"
              {...register("postal")}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default BillingFrom;
