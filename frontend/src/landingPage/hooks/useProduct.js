import { useQuery } from '@tanstack/react-query';
import { getProduct } from '../services/product.service';

const useProduct = () => {
   
      return useQuery(
        
        { queryKey: ["product"], 

        queryFn: getProduct ,
    }
    
    );


 

};

export default useProduct;