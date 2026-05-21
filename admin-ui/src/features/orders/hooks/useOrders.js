import { useQuery } from '@tanstack/react-query'
import orderService from '../services/orderService'
import { queryKeys } from '../../../services/queryKeys'

const useOrders = () => {
  return useQuery({
    queryKey: queryKeys.orders.all,
    queryFn: orderService.getAll,
  })
}

export default useOrders
