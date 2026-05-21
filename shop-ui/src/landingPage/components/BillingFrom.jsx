
const BillingFrom = ({ register, errors }) => {
  return (
    <section className="mt-3 bg-white px-4 py-[18px] sm:px-[18px]">
      <div className="text-[13px] font-semibold uppercase tracking-[0.2em] text-[#6b6b6b]">
        ঠিকানা ও তথ্য
      </div>

      <div className="mt-4 space-y-4">
        <div>
          <label className="text-sm font-semibold text-[#1f2937]">
            পূর্ণ নাম <span className="text-[#d24535]">*</span>
          </label>
          <input
            type="text"
            placeholder="আপনার পূর্ণ নাম"
            className="mt-2 h-[46px] w-full rounded-[8px] border border-[#e8e3dc] px-4 text-[15px] outline-none transition focus:border-[#c8392b]"
            {...register("fullName", { required: "পূর্ণ নাম দিন" })}
          />
          {errors?.fullName ? (
            <p className="mt-1 text-xs font-medium text-[#d24535]">{errors.fullName.message}</p>
          ) : null}
        </div>

        <div>
          <label className="text-sm font-semibold text-[#1f2937]">
            মোবাইল নম্বর <span className="text-[#d24535]">*</span>

          <div>
            <label className="text-sm font-semibold text-[#1f2937]">শহর</label>
            <input
              type="text"
              placeholder="শহরের নাম"
              className="mt-2 h-[46px] w-full rounded-[8px] border border-[#e8e3dc] px-4 text-[15px] outline-none transition focus:border-[#c8392b]"
              {...register("city")}
            />
          </div>

          <div>
            <label className="text-sm font-semibold text-[#1f2937]">পোস্টাল কোড</label>
            <input
              type="text"
              placeholder="পোস্টাল কোড"
              className="mt-2 h-[46px] w-full rounded-[8px] border border-[#e8e3dc] px-4 text-[15px] outline-none transition focus:border-[#c8392b]"
              {...register("postal")}
            />
          </div>
          </label>
          <input
            type="tel"
            placeholder="01XXXXXXXXX"
            className="mt-2 h-[46px] w-full rounded-[8px] border border-[#e8e3dc] px-4 text-[15px] outline-none transition focus:border-[#c8392b]"
            {...register("phone", {
              required: "মোবাইল নম্বর দিন",
              pattern: {
                value: /^01\d{9}$/,
                message: "সঠিক নম্বর লিখুন",
              },
            })}
          />
          {errors?.phone ? (
            <p className="mt-1 text-xs font-medium text-[#d24535]">{errors.phone.message}</p>
          ) : null}
        </div>

        <div>
          <label className="text-sm font-semibold text-[#1f2937]">
            সম্পূর্ণ ঠিকানা <span className="text-[#d24535]">*</span>
          </label>
          <input
            type="text"
            placeholder="বাসা/রোড/এলাকা"
            className="mt-2 h-[46px] w-full rounded-[8px] border border-[#e8e3dc] px-4 text-[15px] outline-none transition focus:border-[#c8392b]"
            {...register("address", { required: "ঠিকানা লিখুন" })}
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