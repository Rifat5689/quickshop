import { formatBDT } from '../../../utils/formatters/currencyFormatter'

const OrderStatusSummary = ({ orders }) => {
  const count = orders.length
  const totalAmount = orders.reduce((sum, order) => sum + (order.totalPrice || 0), 0)
  const avgAmount = count ? Math.round(totalAmount / count) : 0

  return (
    <div className="status-summary">
      <div className="sum-box">
        <div className="val" style={{ color: 'var(--accent)' }}>{count}</div>
        <div className="lbl">Orders</div>
      </div>
      <div className="sum-box">
        <div className="val money-val" style={{ color: 'var(--amber)' }}>
          {formatBDT(totalAmount)}
        </div>
        <div className="lbl">Total</div>
      </div>
      <div className="sum-box">
        <div className="val money-val" style={{ color: 'var(--green)' }}>
          {formatBDT(avgAmount)}
        </div>
        <div className="lbl">Average</div>
      </div>
    </div>
  )
}

export default OrderStatusSummary
