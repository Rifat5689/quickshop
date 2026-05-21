import { createContext, useContext, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { api } from "../shared/api/axios";
import { SHOP_COPY } from "../i18n/shopCopy";

const ShopSettingsContext = createContext({
  language: "bn",
  t: (key) => SHOP_COPY.bn[key] ?? key,
});

const fetchShopSettings = async () => {
  const { data } = await api.get("/api/v1/settings/public");
  return data?.data ?? { shopLanguage: "bn" };
};

export const ShopSettingsProvider = ({ children }) => {
  const { data } = useQuery({
    queryKey: ["shop-settings"],
    queryFn: fetchShopSettings,
    staleTime: 5 * 60 * 1000,
  });

  const language = data?.shopLanguage === "en" ? "en" : "bn";

  const value = useMemo(() => {
    const copy = SHOP_COPY[language] ?? SHOP_COPY.bn;
    return {
      language,
      t: (key) => copy[key] ?? SHOP_COPY.bn[key] ?? key,
    };
  }, [language]);

  return (
    <ShopSettingsContext.Provider value={value}>
      {children}
    </ShopSettingsContext.Provider>
  );
};

export const useShopCopy = () => useContext(ShopSettingsContext);
