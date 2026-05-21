import { formatBDT } from '../../../utils/formatters/currencyFormatter'

const OrderModal = ({ isOpen, order, onClose, onAction }) => {
  if (!isOpen || !order) return null

  const status = order.orderStatus
  const payment = order.paymentStatus

  const tlDot = (active, done, cancel) => {
    if (cancel) return 'tl-dot cancel'
    if (done) return 'tl-dot done'
    if (active) return 'tl-dot active'
    return 'tl-dot pending'
  }

  return (
    <div className="overlay" onClick={onClose}>
      <div className="modal max-w-lg" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div className="modal-title">Order Details</div>
          <button type="button" onClick={onClose} className="modal-close" aria-label="Close">
            ✕
          </button>
        </div>
        <div className="modal-body">
          <div className="section-label">Customer</div>
          <div className="detail-row">
            <span className="detail-key">Name</span>
            <span className="detail-val">{order.shippingDetails?.fullName}</span>
          </div>
          <div className="detail-row">
            <span className="detail-key">Phone</span>
            <span className="detail-val font-mono">{order.shippingDetails?.phone}</span>
          </div>
          <div className="detail-row">
            <span className="detail-key">Address</span>
            <span className="detail-val">{order.shippingDetails?.address}</span>
          </div>

          <div className="section-label">Order</div>
          <div className="detail-row">
            <span className="detail-key">Product</span>
            <span className="detail-val">{order.orderItem?.name}</span>
          </div>
          <div className="detail-row">
            <span className="detail-key">Quantity</span>
            <span className="detail-val">{order.orderItem?.quantity}</span>
          </div>
          <div className="detail-row">
            <span className="detail-key">Total</span>
            <span className="detail-val font-mono" style={{ color: 'var(--accent)' }}>
              {formatBDT(order.totalPrice)}
            </span>
          </div>

          <div className="section-label">Payment</div>
          <div className="detail-row">
            <span className="detail-key">Status</span>
            <span className="detail-val">{payment}</span>
          </div>

          <div className="section-label">Timeline</div>
          <div className="timeline mt-2">
            <div className="tl-item">
              <div className={tlDot(false, status !== 'Cancelled', status === 'Cancelled')}>✓</div>
              <div className="tl-label">Confirmed</div>
            </div>
            <div className="tl-item">
              <div className={tlDot(status === 'Processing', ['Processing', 'Shipped', 'Delivered'].includes(status), false)}>›</div>
              <div className="tl-label">Processing</div>
            </div>
            <div className="tl-item">
              <div className={tlDot(status === 'Shipped', ['Shipped', 'Delivered'].includes(status), false)}>›</div>
              <div className="tl-label">Shipped</div>
            </div>
            <div className="tl-item">
              <div className={tlDot(false, status === 'Delivered', false)}>✓</div>
              <div className="tl-label">Delivered</div>
            </div>
          </div>
        </div>
        <div className="modal-footer">
          <button type="button" onClick={onClose} className="btn btn-ghost flex-1">
            Close
          </button>
          {status === 'Pending' && (
            <button
              type="button"
              onClick={() => onAction('confirm', order._id)}
              className="btn act-confirm flex-1 border"
            >
              Confirm
            </button>
          )}
          {status === 'Processing' && (
            <button
              type="button"
              onClick={() => onAction('ship', order._id)}
              className="btn act-ship flex-1 border"
            >
              Mark Shipped
            </button>
          )}
          {status === 'Shipped' && (
            <button
              type="button"
              onClick={() => onAction('deliver', order._id)}
              className="btn act-deliver flex-1 border"
            >
              Mark Delivered
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

export default OrderModal
