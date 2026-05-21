import { useShopCopy } from "../../context/ShopSettingsContext";

const PlaceOrder = ({ total, isSubmitting, handleOrderSummary }) => {
  const { t } = useShopCopy();

  return (
    <section className="sticky bottom-0 z-20 border-t border-[var(--border)] bg-[var(--white)] px-[18px] py-3.5">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="text-[12px] text-[var(--muted)]">{t("totalPayable")}</div>
          <div className="text-[22px] font-bold text-[var(--brand)]">
            ৳ {total.toLocaleString("bn-BD")}
          </div>
        </div>
        <button
          type="button"
          onClick={handleOrderSummary}
          disabled={isSubmitting}
          className="inline-flex h-[54px] items-center justify-center rounded-[var(--radius)] bg-[var(--brand)] px-6 text-[17px] font-bold tracking-wide text-white shadow-[0_4px_16px_rgba(200,57,43,0.35)] transition hover:bg-[var(--brand-dark)] active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isSubmitting ? t("pleaseWait") : t("orderNow")}
        </button>
      </div>
    </section>
  );
};

export default PlaceOrder;
