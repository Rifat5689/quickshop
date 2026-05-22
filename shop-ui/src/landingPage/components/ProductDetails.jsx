import { useShopCopy } from "../../context/ProductLanguageContext";

const ProductDetails = ({
  details,
  onSelectImage,
  onToggleDescription,
  onMouseEnter,
  onMouseLeave,
}) => {
  const { t, locale } = useShopCopy();

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
  const discountRate = Number(discount) || 0;
  const hasDiscount = discountRate > 0;
  const displayPrice = hasDiscount ? discountedPrice : price;

  return (
    <section className="w-full bg-white">
      <div className="bg-[#e6e2df]">
        <div className="bg-[#1a1a1a] px-4 py-[9px] text-center text-[12px] font-semibold text-white">
          {t("limitedOffer")}
        </div>

        <div className="relative" onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
          <div className="bg-[#dedad7]">
            <div className="mx-auto flex w-full items-center justify-center">
              {selectedImage ? (
                <img
                  src={selectedImage}
                  alt={name || title}
                  className="h-[420px] w-full object-cover sm:h-[520px]"
                />
              ) : (
                <div className="flex h-[420px] w-full items-center justify-center text-sm text-gray-500 sm:h-[520px]">
                  {t("imageUnavailable")}
                </div>
              )}
            </div>
          </div>

          <div className="flex items-center justify-center gap-2 bg-[#dedad7] py-[10px]">
            {Array.from({ length: Math.min(totalImages || 4, 4) }).map((_, index) => {
              const isActive = index === selectedImageIndex;

              return (
                <button
                  key={`dot-${index}`}
                  type="button"
                  onClick={() => onSelectImage?.(index)}
                  className={`h-[7px] w-[7px] rounded-full transition ${
                    isActive ? "bg-white" : "bg-white/70"
                  }`}
                  aria-label={`Select image ${index + 1}`}
                />
              );
            })}
          </div>

          <div className="bg-[#ede8e3] px-[14px] pb-[10px]">
            <div className="flex gap-2 overflow-x-auto pb-0">
              {images.slice(0, 6).map((imageUrl, index) => {
                const isActive = index === selectedImageIndex;

                return (
                  <button
                    key={imageUrl + index}
                    type="button"
                    onClick={() => onSelectImage?.(index)}
                    className={`shrink-0 rounded-[8px] border-2 bg-white transition ${
                      isActive ? "border-[#d94a36] shadow-sm" : "border-transparent"
                    }`}
                  >
                    <img
                      src={imageUrl}
                      alt={name || title}
                      loading="lazy"
                      className="h-[60px] w-[60px] rounded-[8px] object-cover"
                    />
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      <div className="px-[18px] py-[22px]">
        <div className="flex items-center gap-2">
          <span
            className={`inline-flex items-center rounded-full px-[10px] py-[4px] text-[12px] font-semibold ${
              stock > 0 ? "bg-[#e2f2e9] text-[#157a45]" : "bg-[#fde8e8] text-[#c23f2c]"
            }`}
          >
            {stock > 0 ? t("inStock") : t("outOfStock")}
          </span>
        
        </div>

        {name ? (
          <h1 className="mt-3 text-[26px] font-bold leading-[1.2] text-[#1a1a1a]">
            {name}
          </h1>
        ) : null}

        {title ? (
          <h2 className="mt-2 text-[15px] font-medium text-[#6b6b6b]">{title}</h2>
        ) : null}

        <div className="mt-4 flex flex-wrap items-center gap-[10px]">
          <span className="text-[30px] font-bold leading-none text-[#c8392b]">
            ৳ {displayPrice.toLocaleString(locale)}
          </span>
          {hasDiscount ? (
            <>
              <span className="text-[17px] font-medium text-[#aaaaaa] line-through">
                ৳ {price.toLocaleString(locale)}
              </span>
              <span className="rounded-md bg-[#c8392b] px-3 py-[3px] text-[12px] font-bold text-white">
                {discountRate}% {t("discountOff")}
              </span>
            </>
          ) : null}
        </div>

        {subtitle ? (
          <p className="mt-3 text-[14px] leading-[1.65] text-[#6b6b6b]">{subtitle}</p>
        ) : null}

        {isDescriptionExpanded && description ? (
          <p className="mt-3 text-[14px] leading-[1.7] text-[#6b6b6b]">{description}</p>
        ) : null}

        {description ? (
          <button
            type="button"
            onClick={() => onToggleDescription?.()}
            className="mt-2 text-[13px] font-semibold text-[#c8392b] transition hover:text-[#9b2b1e]"
          >
            {isDescriptionExpanded ? t("readLess") : t("readMore")}
          </button>
        ) : null}
      </div>
    </section>
  );
};

export default ProductDetails;
