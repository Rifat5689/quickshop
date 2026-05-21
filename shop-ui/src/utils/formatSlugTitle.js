const formatSlugTitle = (slug) => {
  if (!slug) return "Origins of Beauty";

  return slug
    .split("-")
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

export default formatSlugTitle;
