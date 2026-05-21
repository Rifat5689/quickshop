import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { calculateTotal } from "../services/calculateTotal.service";
import { useOrder } from "./userOrder";

const useCheckout = ({ product }) => {
  const [quantity, setQuantity] = useState(1);
  const [DeliveryPlace, setDeliveryPlace] = useState("dhaka");
  const [shippingPrice, setShippingPrice] = useState(70);
  const [payload, setPayload] = useState(null);
  const { submitOrder, isLoading, isLocked } = useOrder();

  const form = useForm({
    mode: "onBlur",
    defaultValues: {
      fullName: "",
      phone: "",
      address: "",
      city: "",
      postal: "",
    },
  });

  const { register, formState, getValues, trigger, setFocus } = form;
  const { errors } = formState;

  const handleDeliveryPlace = (value) => {
    setDeliveryPlace(value);
    if (value === "dhaka") setShippingPrice(70);
    else setShippingPrice(120);
  };

  const handleQuantity = (value) => {
    if (value) setQuantity((currentQuantity) => currentQuantity + 1);
    else setQuantity((currentQuantity) => Math.max(1, currentQuantity - 1));
  };

  const total = useMemo(() => {
    if (!product) return 0;
    return calculateTotal(product?.price, quantity, product?.discount, shippingPrice);
  }, [product, quantity, shippingPrice]);

  const handleOrderSummary = async () => {
    if (!product) return;
    const isValid = await trigger();
    if (!isValid) {
      const firstError = Object.keys(errors)[0];
      if (firstError) setFocus(firstError);
      return;
    }

    const values = getValues();
    const shippingDetails = {
      fullName: values.fullName.trim(),
      phone: values.phone.trim(),
      address: values.address.trim(),
      city: values.city.trim(),
      postal: values.postal?.trim() || "",
      shippingPrice,
    };

    setPayload({
      productId: product.productId || product._id,
      quantity,
      shippingDetails,
    });
  };

  const handleCloseSummary = () => {
    setPayload(null);
  };

  const handleConfirmOrder = async () => {
    if (!payload) return false;
    try {
      await submitOrder(payload);
      // Do not clear payload here so the parent can animate the modal out
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  };

  return {
    quantity,
    handleQuantity,
    DeliveryPlace,
    payload,
    shippingPrice,
    total,
    handleDeliveryPlace,
    handleOrderSummary,
    handleConfirmOrder,
    handleCloseSummary,
    isLoading,
    isLocked,
    register,
    errors,
  };
};

export default useCheckout;