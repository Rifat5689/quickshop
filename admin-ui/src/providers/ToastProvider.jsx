import { useCallback, useMemo, useState } from 'react'
import { createPortal } from 'react-dom'
import { ToastContext } from '../context/ToastContext'
import ToastContainer from '../components/ui/Toast'
import { TOAST_DURATION } from '../config/appConfig'

const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([])

  const showToast = useCallback((message, type = 'success') => {
    const id = crypto.randomUUID()
    setToasts((prev) => [...prev, { id, message, type }])
    setTimeout(() => {
      setToasts((prev) => prev.filter((toast) => toast.id !== id))
    }, TOAST_DURATION)
  }, [])

  const value = useMemo(() => ({ showToast }), [showToast])

  return (
    <ToastContext.Provider value={value}>
      {children}
      {createPortal(<ToastContainer toasts={toasts} />, document.body)}
    </ToastContext.Provider>
  )
}

export default ToastProvider
