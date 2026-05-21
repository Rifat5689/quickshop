
const PriceBreakdown = ({ quantity, shippingPrice, total, product }) => {
  if (!product) return null;

  const subtotal = product.price * quantity;
  const discountRate = product.discount ?? 0;
  const discountAmount = Math.round((subtotal * discountRate) / 100);
  const hasDiscount = discountRate > 0 && discountAmount > 0;

  return (
    <section className="mt-2 bg-white px-4 py-4 sm:px-[18px]">
      <div className="rounded-[12px] bg-[#faf8f5] p-[14px]">
        <div className="flex items-center justify-between text-[14px] text-[#6b6b6b]">
          <span>পণ্যের মূল্য</span>
          <span>৳ {product.price.toLocaleString("bn-BD")}</span>
        </div>
        <div className="mt-1 flex items-center justify-between text-[14px] text-[#6b6b6b]">
          <span>পরিমাণ</span>
          <span>× {quantity}</span>
        </div>
        {hasDiscount ? (
          <div className="mt-1 flex items-center justify-between text-[14px] text-[#1a7a45]">
            <span>ছাড়</span>
            <span>− ৳ {discountAmount.toLocaleString("bn-BD")}</span>
          </div>
        ) : null}
        <div className="mt-1 flex items-center justify-between text-[14px] text-[#6b6b6b]">
          <span>ডেলিভারি চার্জ</span>
          <span>৳ {shippingPrice.toLocaleString("bn-BD")}</span>
        </div>
        <div className="mt-3 border-t border-[#e8e3dc] pt-3 text-[17px] font-semibold text-[#1f2937]">
          <div className="flex items-center justify-between">
            <span>মোট পরিশোধ</span>
            <span>৳ {total.toLocaleString("bn-BD")}</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PriceBreakdown;