import { useState } from "react";
import { createOrder } from "../services/createOrder.service";

const ORDER_LOCK_KEY = "order_key";

export const useOrder = () => {
   const [isLoading, setLoading] = useState(false);
   const [error, setError] = useState(null);
   const [orderKey, setOrderKey] = useState(() => {
      return localStorage.getItem(ORDER_LOCK_KEY) || "";
   });

   const setLock = () => {
      const key = `order_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
      localStorage.setItem(ORDER_LOCK_KEY, key);
      setOrderKey(key);
      return key;
   };

   const clearLock = () => {
      localStorage.setItem(ORDER_LOCK_KEY, "");
      setOrderKey("");
   };

   const submitOrder = async (payload) => {
      if (orderKey) return null;

      try {
         setLock();
         setLoading(true);
         const res = await createOrder(payload);
         return res.data;
      } catch (err) {
         setError(err);
         throw err;
      } finally {
         setLoading(false);
         clearLock();
      }
   };

   return {
      submitOrder,
      isLoading,
      isLocked: Boolean(orderKey),
      error,
   };
};