import { useEffect, useMemo, useState } from "react";

const useProductDetails = (
  product,
  {
    autoplay = true,
    autoplayInterval = 3000,
    pauseOnHover = true,
    stopOnInteraction = true,
  } = {}
) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);
  const [isAutoplayActive, setIsAutoplayActive] = useState(autoplay);
  const [isAutoplayStopped, setIsAutoplayStopped] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => {
      setSelectedImageIndex(0);
      setIsDescriptionExpanded(false);
    }, 0);
    return () => clearTimeout(t);
  }, [product?._id]);

  const imagesProp = useMemo(() => product?.images ?? [], [product?.images]);

  const normalizedImages = useMemo(() => {
    if (!imagesProp || imagesProp.length === 0) return [];

    return imagesProp
      .map((image) => (typeof image === "string" ? image : image?.url))
      .filter(Boolean);
  }, [imagesProp]);

  useEffect(() => {
    if (!autoplay || isAutoplayStopped || !isAutoplayActive) return;
    if (normalizedImages.length < 2) return;

    const intervalId = setInterval(() => {
      setSelectedImageIndex((currentIndex) => (currentIndex + 1) % normalizedImages.length);
    }, autoplayInterval);

    return () => clearInterval(intervalId);
  }, [normalizedImages.length, autoplay, autoplayInterval, isAutoplayActive, isAutoplayStopped]);

  useEffect(() => {
    const t = setTimeout(() => {
      if (normalizedImages.length === 0) {
        setSelectedImageIndex(0);
        return;
      }
      setSelectedImageIndex((index) => Math.min(index, normalizedImages.length - 1));
    }, 0);
    return () => clearTimeout(t);
  }, [normalizedImages.length]);

  const details = useMemo(() => {
    if (!product) return null;

    const {
      name,
      title,
      subtitle,
      price = 0,
      discount = 0,
      description = "",
      stock = 0,
      rating = 4.8,
      reviewCount = 324,
    } = product;

    const normalizedList = normalizedImages.length ? normalizedImages : imagesProp;
    const selectedImage = normalizedList[selectedImageIndex] || normalizedList[0] || "";
    const discountedPrice = price - (price * discount) / 100;

    return {
      name: name || "",
      title: title || "",
      subtitle: subtitle || "",
      description: description || "",
      price,
      discount,
      discountedPrice,
      stock,
      rating,
      reviewCount,
      images: normalizedList,
      selectedImage,
      selectedImageIndex,
      isDescriptionExpanded,
    };
  }, [isDescriptionExpanded, product, selectedImageIndex, normalizedImages, imagesProp]);

  const handleSelectImage = (index) => {
    setSelectedImageIndex(index);
    if (stopOnInteraction) setIsAutoplayStopped(true);
  };
  const pauseAutoplay = () => {
    if (pauseOnHover) setIsAutoplayActive(false);
  };
  const resumeAutoplay = () => {
    if (pauseOnHover && !isAutoplayStopped) setIsAutoplayActive(true);
  };
  const stopAutoplay = () => setIsAutoplayStopped(true);
  const handleToggleDescription = () => setIsDescriptionExpanded((value) => !value);

  return {
    details,
    selectedImageIndex,
    handleSelectImage,
    isDescriptionExpanded,
    handleToggleDescription,
    pauseAutoplay,
    resumeAutoplay,
    stopAutoplay,
  };
};

export default useProductDetails;
