import { useMutation, useQueryClient } from '@tanstack/react-query'
import orderService from '../services/orderService'
import { queryKeys } from '../../../services/queryKeys'
import useToast from '../../../hooks/useToast'

const useOrderStatus = () => {
  const queryClient = useQueryClient()
  const { showToast } = useToast()

  const onSuccess = (message) => {
    showToast(message, 'success')
    queryClient.invalidateQueries({ queryKey: queryKeys.orders.all })
    queryClient.invalidateQueries({ queryKey: queryKeys.overview.stats })
  }

  const onError = (error, fallback) => {
    showToast(error?.message || fallback, 'error')
  }

  const confirm = useMutation({
    mutationFn: orderService.confirm,
    onSuccess: () => onSuccess('Order confirmed'),
    onError: (error) => onError(error, 'Failed to confirm order'),
  })

  const ship = useMutation({
    mutationFn: orderService.ship,
    onSuccess: () => onSuccess('Order marked as shipped'),
    onError: (error) => onError(error, 'Failed to ship order'),
  })

  const deliver = useMutation({
    mutationFn: orderService.deliver,
    onSuccess: () => onSuccess('Order marked as delivered'),
    onError: (error) => onError(error, 'Failed to deliver order'),
  })

  const cancel = useMutation({
    mutationFn: orderService.cancel,
    onSuccess: () => onSuccess('Order cancelled'),
    onError: (error) => onError(error, 'Failed to cancel order'),
  })

  const pay = useMutation({
    mutationFn: ({ id, paymentStatus }) =>
      orderService.updatePaymentStatus(id, paymentStatus),
    onSuccess: () => onSuccess('Payment updated'),
    onError: (error) => onError(error, 'Failed to update payment'),
  })

  return { confirm, ship, deliver, cancel, pay }
}

export default useOrderStatus
