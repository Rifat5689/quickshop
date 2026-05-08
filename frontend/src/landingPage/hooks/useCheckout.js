import { useMemo, useRef, useState } from "react";
import { calculateTotal } from "../services/calculateTotal.service";
import { useOrder } from "./userOrder";

const useCheckout = ({product}) => {

  const [quantity,setQuantity] = useState(1); 
  const [DeliveryPlace,setDeliveryPlace] = useState("dhaka") ; 
  const [shippingPrice, setShippingPrice] = useState(70) ; 
  const [payload, setPayload] = useState(null) ; 
  const {submitOrder, isLoading ,error} = useOrder() ; 

  const nameRef = useRef() ;
    const phoneRef = useRef() ;
     const addressRef = useRef() ;
     
  

  const handleDeliveryPlace = (value) =>{
      setDeliveryPlace(value) ; 
      if(value==="dhaka") setShippingPrice(70); 
      else setShippingPrice(120) ; 
  }
  const handleQuantity = (value) =>
  {
     if(value) setQuantity(quantity +1 ) ; 
     else setQuantity((quantity ) => Math.max(1, quantity - 1)) ; 
  }

  const total = useMemo(()=>{
      if (!product) return 0; 
    
     return calculateTotal(product?.price ,quantity , product?.discount , shippingPrice);
  },[product?.price,quantity,product?.discount,shippingPrice]) ; 
  const handleOrderSummary =()=>{
     if(!product ) return ; 
    const shippigDetails = {
       fullName : nameRef.current.value ,
       phone : phoneRef.current.value ,
       address : addressRef.current.value ,
       shippingPrice 

    }


    setPayload(
      {
          productId : product._id , 
          quantity , 
         shippigDetails 
      }
    )
    
  

  }
  const handleConfirmOrder = async()=>{
      
    try {

       await   submitOrder(payload) ; 

      
      
    } catch (error) {
      console.log(error) ; 
      
    }

  }


  return {
    quantity,
    handleQuantity,
    DeliveryPlace,
    payload,
    shippingPrice,
    total ,
    handleDeliveryPlace,
    handleOrderSummary,
    handleConfirmOrder,
    isLoading,
    nameRef,
    phoneRef,
    addressRef



  }
};

export default useCheckout;