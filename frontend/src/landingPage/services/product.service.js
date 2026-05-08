import { api } from "../../shared/api/axios"


const getProduct = async()=>{
      
    const result = await api.get('/api/v1/products/cream') ; 
    return result.data ; 
}

export {getProduct} ; 