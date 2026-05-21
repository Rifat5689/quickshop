const ToastContainer = ({ toasts }) => {
  return (
    <div className="toast-wrap">
      {toasts.map((toast) => (
        <div key={toast.id} className={`toast ${toast.type || 'success'}`}>
          <span className="toast-msg">{toast.message}</span>
        </div>
      ))}
    </div>
  )
}

export default ToastContainer
