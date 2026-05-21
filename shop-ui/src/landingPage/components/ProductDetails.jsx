import { useShopCopy } from "../../context/ShopSettingsContext";

const ProductDetails = ({
  details,
  onSelectImage,
  onToggleDescription,
  onMouseEnter,
  onMouseLeave,
}) => {
  const { t } = useShopCopy();
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
  const currentPrice = hasDiscount ? discountedPrice : price;

  return (
    <section className="w-full bg-[var(--white)]">
      <div className="bg-[var(--gallery-main)]">
        <div className="bg-[var(--brand)] px-4 py-[9px] text-center text-[12px] font-semibold text-white">
          {t("limitedOffer")}
        </div>

        <div className="relative" onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
          <div className="bg-[var(--gallery-main)]">
            {selectedImage ? (
              <img
                src={selectedImage}
                alt={name || title}
                className="aspect-square w-full object-cover transition-opacity duration-300"
              />
            ) : (
              <div className="flex aspect-square w-full items-center justify-center text-sm text-[var(--muted)]">
                Image not available
              </div>
            )}
          </div>

          <div className="absolute bottom-3.5 left-1/2 flex -translate-x-1/2 gap-[7px]">
            {Array.from({ length: Math.min(totalImages || 4, 4) }).map((_, index) => {
              const isActive = index === selectedImageIndex;
              return (
                <button
                  key={`dot-${index}`}
                  type="button"
                  onClick={() => onSelectImage?.(index)}
                  className={`h-[7px] w-[7px] rounded-full transition-all ${
                    isActive ? "scale-[1.3] bg-white" : "bg-white/50"
                  }`}
                  aria-label={`Select image ${index + 1}`}
                />
              );
            })}
          </div>

          <div className="flex gap-2 overflow-x-auto bg-[var(--gallery-strip)] px-3.5 py-2.5 [scrollbar-width:none]">
            {images.slice(0, 6).map((imageUrl, index) => {
              const isActive = index === selectedImageIndex;
              return (
                <button
                  key={imageUrl + index}
                  type="button"
                  onClick={() => onSelectImage?.(index)}
                  className={`shrink-0 rounded-[var(--radius-sm)] border-2 transition ${
                    isActive ? "border-[var(--brand)]" : "border-transparent"
                  }`}
                >
                  <img
                    src={imageUrl}
                    alt={name || title}
                    loading="lazy"
                    className="h-[60px] w-[60px] rounded-[6px] object-cover"
                  />
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <div className="border-b border-[var(--border)] px-[18px] py-[22px] pb-[18px]">
        <div className="flex flex-wrap items-center gap-2">
          <span
            className={`inline-flex items-center rounded-full px-2.5 py-1 text-[12px] font-semibold tracking-wide ${
              stock > 0
                ? "bg-[var(--success-light)] text-[var(--success)]"
                : "bg-[var(--brand-light)] text-[var(--brand)]"
            }`}
          >
            {stock > 0 ? t("inStock") : t("outOfStock")}
          </span>
          <span className="inline-flex items-center gap-1 text-[12px] font-semibold text-[var(--muted)]">
            <span className="text-[#f5a623]">★</span>
            {rating} ({reviewCount} {t("reviews")})
          </span>
        </div>

        {name ? (
          <h1 className="mt-2 font-display text-[26px] font-black leading-[1.2] text-[var(--text)]">
            {name}
          </h1>
        ) : null}

        {title ? (
          <p className="mt-2 text-[15px] text-[var(--muted)]">{title}</p>
        ) : null}

        <div className="mt-3.5 flex flex-wrap items-center gap-2.5">
          <span className="text-[30px] font-bold tracking-tight text-[var(--brand)]">
            ৳ {currentPrice.toLocaleString("bn-BD")}
          </span>
          {hasDiscount ? (
            <span className="text-[17px] text-[#aaa] line-through">
              ৳ {price.toLocaleString("bn-BD")}
            </span>
          ) : null}
          {hasDiscount ? (
            <span className="rounded-md bg-[var(--brand)] px-2 py-0.5 text-[12px] font-bold text-white">
              {discountRate}% {t("discountOff")}
            </span>
          ) : null}
        </div>

        {subtitle ? (
          <p className="mt-3 text-[14px] leading-[1.65] text-[var(--muted)]">{subtitle}</p>
        ) : null}

        {isDescriptionExpanded && description ? (
          <p className="mt-2.5 text-[14px] leading-[1.7] text-[var(--muted)]">{description}</p>
        ) : null}

        {description ? (
          <button
            type="button"
            onClick={() => onToggleDescription?.()}
            className="mt-2 inline-flex items-center gap-1 border-0 bg-transparent p-0 text-[13px] font-semibold text-[var(--brand)]"
          >
            {isDescriptionExpanded ? t("readLess") : t("readMore")}
          </button>
        ) : null}
      </div>
    </section>
  );
};

export default ProductDetails;
