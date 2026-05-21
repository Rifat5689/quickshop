import { useCallback, useMemo, useState } from 'react'
import { NotificationContext } from '../context/NotificationContext'

const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([])

  const unreadCount = notifications.filter((item) => !item.read).length

  const markAllRead = useCallback(() => {
    setNotifications((prev) => prev.map((item) => ({ ...item, read: true })))
  }, [])

  const value = useMemo(
    () => ({ notifications, setNotifications, unreadCount, markAllRead }),
    [notifications, unreadCount, markAllRead]
  )

  return (
    <NotificationContext.Provider value={value}>
      {children}
    </NotificationContext.Provider>
  )
}

export default NotificationProvider
