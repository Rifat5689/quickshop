
const ProductDetails = ({
  details,
  onSelectImage,
  onToggleDescription,
  onMouseEnter,
  onMouseLeave,
}) => {
  if (!details) return null;

  const {
    name,
    title,
    subtitle,
    description,
    price,
    discount,
    discountedPrice,
    stock,
    rating,
    reviewCount,
    images,
    selectedImage,
    selectedImageIndex,
    isDescriptionExpanded,
  } = details;

  const totalImages = images.length;

  return (
    <section className="w-full bg-white">
      <div className="bg-[#e6e2df]">
        <div className="bg-[#1d1d1d] px-4 py-2 text-center text-sm font-semibold text-white sm:text-base">
          🎉 সীমিত সময়ের অফার - আজই অর্ডার করুন
        </div>

        <div className="relative" onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
          <div className="bg-[#dedad7]">
            <div className="mx-auto flex w-full items-center justify-center">
              {selectedImage ? (
                <img
                  src={selectedImage}
                  alt={name || title}
                  className="h-[460px] w-full object-cover sm:h-[520px]"
                />
              ) : (
                <div className="flex h-[460px] w-full items-center justify-center text-sm text-gray-500 sm:h-[520px]">
                  Image not available
                </div>
              )}
            </div>
          </div>

          <div className="flex items-center justify-center gap-2 bg-[#dedad7] py-2">
            {Array.from({ length: Math.min(totalImages || 4, 4) }).map((_, index) => {
              const isActive = index === selectedImageIndex;

              return (
                <button
                  key={`dot-${index}`}
                  type="button"
                  onClick={() => onSelectImage?.(index)}
                  className={`h-2.5 w-2.5 rounded-full transition ${
                    isActive ? "bg-white" : "bg-white/70"
                  }`}
                  aria-label={`Select image ${index + 1}`}
                />
              );
            })}
          </div>

          <div className="bg-[#ede8e3] px-4 pb-2 sm:px-6">
            <div className="flex gap-2 overflow-x-auto pb-0">
              {images.slice(0, 6).map((imageUrl, index) => {
                const isActive = index === selectedImageIndex;

                return (
                  <button
                    key={imageUrl + index}
                    type="button"
                    onClick={() => onSelectImage?.(index)}
                    className={`shrink-0 rounded-lg border-2 bg-white transition ${
                      isActive ? "border-[#d94a36] shadow-sm" : "border-transparent"
                    }`}
                  >
                    <img
                      src={imageUrl}
                      alt={name || title}
                      loading="lazy"
                      className="h-[60px] w-[60px] rounded-[0.55rem] object-cover sm:h-[68px] sm:w-[68px]"
                    />
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      <div className="px-4 py-6 sm:px-6">
        <div className="flex items-center gap-4">
          <span
            className={`inline-flex items-center rounded-full px-4 py-2 text-[0.98rem] font-bold ${
              stock > 0 ? "bg-[#e2f2e9] text-[#157a45]" : "bg-[#fde8e8] text-[#c23f2c]"
            }`}
          >
            {stock > 0 ? "✓ স্টকে আছে" : "স্টক নেই"}
          </span>
          <span className="inline-flex items-center gap-2 font-sans text-[1.05rem] font-medium text-[#5f6875] sm:text-[1.15rem]">
            <span className="text-[1.05rem] text-[#f2b700]">★</span>
            {rating} <span>({reviewCount} রিভিউ)</span>
          </span>
        </div>

        {name ? (
          <h1 className="mt-4 font-display text-[2.2rem] font-bold leading-[1.1] tracking-tight text-[#1f2937] sm:text-[2.85rem]">
            {name}
          </h1>
        ) : null}

        {title ? (
          <h2 className="mt-2 font-sans text-[1.45rem] font-semibold leading-tight text-[#3b3f45]/80 sm:text-[1.7rem]">
            {title}
          </h2>
        ) : null}

        <div className="mt-6 flex flex-wrap items-center gap-5">
          <span className="font-sans text-[2.6rem] font-extrabold leading-none text-[#c93d2e] sm:text-[3.1rem]">
            ৳ {discountedPrice.toLocaleString("bn-BD")}
          </span>
          <span className="pt-1 font-sans text-[1.05rem] font-medium text-[#a5a5a5] line-through sm:text-[1.15rem]">
            ৳ {price.toLocaleString("bn-BD")}
          </span>
          <span className="rounded-xl bg-[#d24535] px-5 py-2 font-sans text-[1rem] font-bold text-white">
            {discount}% ছাড়
          </span>
        </div>

        {subtitle ? (
          <p className="mt-4 max-w-2xl font-sans text-[1.15rem] leading-snug text-[#5f6570] sm:text-[1.35rem]">
            {subtitle}
          </p>
        ) : null}

        {isDescriptionExpanded && description ? (
          <p className="mt-6 max-w-3xl font-sans text-[1.03rem] leading-[1.85] text-[#6b7280] sm:text-[1.12rem]">
            {description}
          </p>
        ) : null}

        {description ? (
          <button
            type="button"
            onClick={() => onToggleDescription?.()}
            className="mt-5 text-[1.05rem] font-bold text-[#d24535] transition hover:text-[#c23f2c]"
          >
            {isDescriptionExpanded ? "আরো কম দেখুন ▲" : "আরো পড়ুন ▼"}
          </button>
        ) : null}
      </div>
    </section>
  );
};

export default ProductDetails;