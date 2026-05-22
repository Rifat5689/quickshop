import { createContext, useContext, useEffect, useMemo } from "react";
import { SHOP_COPY } from "../i18n/shopCopy";

const ProductLanguageContext = createContext({
  language: "bn",
  t: (key) => SHOP_COPY.bn[key] ?? key,
});

export const ProductLanguageProvider = ({ language = "bn", children }) => {
  const lang = language === "en" ? "en" : "bn";

  const value = useMemo(() => {
    const copy = SHOP_COPY[lang] ?? SHOP_COPY.bn;
    return {
      language: lang,
      t: (key) => copy[key] ?? SHOP_COPY.bn[key] ?? key,
      locale: lang === "en" ? "en-US" : "bn-BD",
    };
  }, [lang]);

  useEffect(() => {
    document.documentElement.lang = lang === "en" ? "en" : "bn";
  }, [lang]);

  return (
    <ProductLanguageContext.Provider value={value}>
      {children}
    </ProductLanguageContext.Provider>
  );
};

export const useShopCopy = () => useContext(ProductLanguageContext);
