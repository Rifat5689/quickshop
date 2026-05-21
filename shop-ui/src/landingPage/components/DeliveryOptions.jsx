
import { FaCity, FaTruck } from "react-icons/fa";

const DeliveryOptions = ({ DeliveryPlace, handleDeliveryPlace }) => {
  const isDhaka = DeliveryPlace === "dhaka";

  return (
    <section className="bg-white px-4 pb-4 sm:px-[18px]">
      <p className="text-[14px] font-semibold text-[#1f2937]">ডেলিভারি অপশন</p>

      <div className="mt-3 flex gap-3">
        <button
          type="button"
          onClick={() => handleDeliveryPlace("dhaka")}
          className={`relative flex-1 rounded-[12px] border px-3 py-3 text-left transition ${
            isDhaka
              ? "border-[#c8392b] bg-[#fdecea]"
              : "border-[#e8e3dc] bg-white hover:border-[#c8392b]/40"
          }`}
        >
          <span className="mb-1 flex items-center gap-2 text-[13px] font-semibold text-[#1f2937]">
            <FaCity className="text-[#c8392b]" /> ঢাকার ভেতরে
          </span>
          <span className="text-[12px] text-[#6b7280]">৳ ৭০</span>
          {isDhaka ? (
            <span className="absolute right-2 top-2 inline-flex h-[18px] w-[18px] items-center justify-center rounded-full bg-[#c8392b] text-[10px] text-white">
              ✓
            </span>
          ) : null}
        </button>

        <button
          type="button"
          onClick={() => handleDeliveryPlace("outside")}
          className={`relative flex-1 rounded-[12px] border px-3 py-3 text-left transition ${
            !isDhaka
              ? "border-[#c8392b] bg-[#fdecea]"
              : "border-[#e8e3dc] bg-white hover:border-[#c8392b]/40"
          }`}
        >
          <span className="mb-1 flex items-center gap-2 text-[13px] font-semibold text-[#1f2937]">
            <FaTruck className="text-[#c8392b]" /> ঢাকার বাইরে
          </span>
          <span className="text-[12px] text-[#6b7280]">৳ ১২০</span>
          {!isDhaka ? (
            <span className="absolute right-2 top-2 inline-flex h-[18px] w-[18px] items-center justify-center rounded-full bg-[#c8392b] text-[10px] text-white">
              ✓
            </span>
          ) : null}
        </button>
      </div>
    </section>
  );
};

export default DeliveryOptions;