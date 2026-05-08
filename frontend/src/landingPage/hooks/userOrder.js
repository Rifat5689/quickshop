import { useState } from "react";
import { createOrder } from "../services/createOrder.service";


export const useOrder =()=>{
  const [isLoading , setLoading] = useState(false) ; 
  const [error, setError] = useState(null) ; 
     const submitOrder = async (payload) =>{
         try {

            setLoading(true) ; 
         const res = await createOrder(payload) ; 
         return res.data  ; 
            
         } catch (error) {
            setError(error) ; 
             throw error
         }  
         finally{
            setLoading(false) ; 
         }
    }

    return {
         submitOrder,
         isLoading , 
         error 
    }
}