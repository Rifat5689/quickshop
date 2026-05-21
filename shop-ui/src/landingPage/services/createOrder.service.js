import { api } from "../../shared/api/axios"

export const createOrder =(payload) =>
{
   return  api.post("/api/v1/orders",payload) ; 

}