
const PlaceOrder = ({ total, isSubmitting, handleOrderSummary }) => {
  return (
    <section className="sticky bottom-0 z-20 border-t border-[#e8e3dc] bg-white px-[18px] py-[14px]">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="text-[12px] text-[#6b6b6b]">মোট পরিশোধ</div>
          <div className="text-[22px] font-bold text-[#c8392b]">
            ৳ {total.toLocaleString("bn-BD")}
          </div>
        </div>
        <button
          type="button"
          onClick={handleOrderSummary}
          disabled={isSubmitting}
          className="inline-flex items-center justify-center rounded-[12px] bg-[#c8392b] px-6 py-[11px] text-[17px] font-bold text-white shadow-md transition hover:bg-[#9b2b1e] disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isSubmitting ? "অপেক্ষা করুন..." : "অর্ডার করুন →"}
        </button>
      </div>
    </section>
  );
};

export default PlaceOrder;