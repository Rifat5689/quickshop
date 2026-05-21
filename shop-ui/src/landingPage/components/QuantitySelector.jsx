
import { FaMinus, FaPlus } from "react-icons/fa";

const QuantitySelector = ({ quantity, handleQuantity }) => {
  return (
    <section className="mt-3 bg-white px-4 py-4 sm:px-[18px]">
      <div className="text-[13px] font-semibold uppercase tracking-[0.2em] text-[#6b7280]">
        অর্ডার করুন
      </div>

      <div className="mt-3 flex items-center justify-between">
        <span className="text-[14px] font-medium text-[#1f2937]">পরিমাণ</span>
        <div className="flex items-center overflow-hidden rounded-[10px] border border-[#e8e3dc]">
          <button
            type="button"
            onClick={() => handleQuantity(false)}
            className="flex h-[38px] w-[38px] items-center justify-center text-[#c8392b] transition hover:bg-[#fdecea]"
            aria-label="Decrease quantity"
          >
            <FaMinus className="text-[12px]" />
          </button>
          <div className="min-w-[44px] border-x border-[#e8e3dc] text-center text-[17px] font-semibold text-[#1f2937]">
            {quantity}
          </div>
          <button
            type="button"
            onClick={() => handleQuantity(true)}
            className="flex h-[38px] w-[38px] items-center justify-center text-[#c8392b] transition hover:bg-[#fdecea]"
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