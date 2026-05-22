import { useCallback, useEffect, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import orderService from '../features/orders/services/orderService'
import { queryKeys } from '../services/queryKeys'

const STORAGE_KEY = 'qs_admin_notif_v1'

const loadStorage = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return { acknowledgedIds: [], initialized: false }
    return JSON.parse(raw)
  } catch {
    return { acknowledgedIds: [], initialized: false }
  }
}

const saveStorage = (data) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
}

const formatTimeAgo = (isoDate) => {
  if (!isoDate) return 'Just now'
  const diff = Date.now() - new Date(isoDate).getTime()
  const mins = Math.floor(diff / 60000)
  if (mins < 1) return 'Just now'
  if (mins < 60) return `${mins}m ago`
  const hrs = Math.floor(mins / 60)
  if (hrs < 24) return `${hrs}h ago`
  return `${Math.floor(hrs / 24)}d ago`
}

const useOrderNotifications = () => {
  const [notifications, setNotifications] = useState([])

  const { data: orders = [] } = useQuery({
    queryKey: queryKeys.orders.all,
    queryFn: orderService.getAll,
    refetchInterval: 20_000,
  })

  useEffect(() => {
    const allIds = orders.map((o) => o._id).filter(Boolean)
    const storage = loadStorage()

    if (!storage.initialized) {
      saveStorage({ acknowledgedIds: allIds, initialized: true })
      setNotifications([])
      return
    }

    const pending = orders.filter((o) => o.orderStatus === 'Pending')
    const fresh = pending.filter((o) => !storage.acknowledgedIds.includes(o._id))

    setNotifications(
      fresh.map((o) => ({
        id: o._id,
        msg: `New order — ${o.shippingDetails?.fullName || 'Customer'} · ${o.orderItem?.name || 'Product'}`,
        time: formatTimeAgo(o.createdAt),
      }))
    )
  }, [orders])

  const clearAllForever = useCallback(() => {
    const allIds = orders.map((o) => o._id).filter(Boolean)
    saveStorage({ acknowledgedIds: allIds, initialized: true })
    setNotifications([])
  }, [orders])

  return {
    notifications,
    clearAllForever,
    hasNotifications: notifications.length > 0,
  }
}

export default useOrderNotifications
