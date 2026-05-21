import { formatBDT } from '../../../utils/formatters/currencyFormatter'
import { formatDate } from '../../../utils/formatters/dateFormatter'
import CustomerCell from '../../../components/ui/CustomerCell'
import {
  RiEyeLine,
  RiCheckLine,
  RiCloseLine,
  RiTruckLine,
  RiCheckDoubleLine,
  RiMoneyDollarCircleLine,
  RiRefund2Line,
} from 'react-icons/ri'

const statusBadgeClass = {
  Delivered: 'badge-delivered',
  Processing: 'badge-processing',
  Pending: 'badge-pending',
  Cancelled: 'badge-cancelled',
  Shipped: 'badge-shipped',
}

const paymentBadgeClass = {
  Paid: 'badge-paid',
  Pending: 'badge-unpaid',
  Failed: 'badge-unpaid',
  Refunded: 'badge-refunded',
}

const StatusBadge = ({ status }) => (
  <span className={`badge ${statusBadgeClass[status] || 'badge-draft'}`}>
    <span className="badge-dot" />
    {status}
  </span>
)

const PaymentBadge = ({ status }) => (
  <span className={`badge ${paymentBadgeClass[status] || 'badge-draft'}`}>
    <span className="badge-dot" />
    {status || 'Pending'}
  </span>
)

const OrdersTable = ({ orders, onConfirm, onCancel, onShip, onDeliver, onPay, onView }) => (
  <div className="card">
    <div className="tbl-wrap">
      <table className="admin-table">
        <thead>
          <tr>
            <th className="col-id">Order ID</th>
            <th>Customer</th>
            <th>Product</th>
            <th>Amount</th>
            <th className="col-status">Status</th>
            <th className="col-status hide-sm">Payment</th>
            <th className="text-right">Actions</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order, index) => {
            const customer = order.shippingDetails?.fullName || 'Customer'
            const phone = order.shippingDetails?.phone || ''
            const product = order.orderItem?.name || 'Product'
            const status = order.orderStatus
            const payment = order.paymentStatus

            return (
              <tr key={order._id}>
                <td className="col-id text-xs" style={{ fontFamily: 'var(--mono)', color: 'var(--text3)' }}>
                  {order._id.slice(-8)}
                </td>
                <td>
                  <CustomerCell name={customer} phone={phone} index={index} />
                </td>
                <td style={{ color: 'var(--text2)' }}>{product}</td>
                <td className="money-val">{formatBDT(order.totalPrice)}</td>
                <td className="col-status">
                  <StatusBadge status={status} />
                </td>
                <td className="col-status hide-sm">
                  <div className="flex flex-wrap items-center gap-2">
                    <PaymentBadge status={payment} />
                    {payment === 'Pending' && (
                      <button
                        type="button"
                        onClick={() => onPay(order._id, 'Paid')}
                        className="act-btn act-pay"
                        aria-label="Mark paid"
                      >
                        <RiMoneyDollarCircleLine />
                      </button>
                    )}
                    {payment === 'Paid' && status === 'Cancelled' && (
                      <button
                        type="button"
                        onClick={() => onPay(order._id, 'Refunded')}
                        className="act-btn act-refund"
                        aria-label="Refund"
                      >
                        <RiRefund2Line />
                      </button>
                    )}
                  </div>
                </td>
                <td className="text-right">
                  <div className="act-group">
                    <button
                      type="button"
                      onClick={() => onView?.(order)}
                      className="act-btn act-view"
                      aria-label="View order"
                    >
                      <RiEyeLine />
                      <span className="act-label">View</span>
                    </button>
                    {status === 'Pending' && (
                      <>
                        <button
                          type="button"
                          onClick={() => onConfirm(order._id)}
                          className="act-btn act-confirm"
                          aria-label="Confirm order"
                        >
                          <RiCheckLine />
                          <span className="act-label">Confirm</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => onCancel(order._id)}
                          className="act-btn act-cancel"
                          aria-label="Cancel order"
                        >
                          <RiCloseLine />
                          <span className="act-label">Cancel</span>
                        </button>
                      </>
                    )}
                    {status === 'Processing' && (
                      <button
                        type="button"
                        onClick={() => onShip(order._id)}
                        className="act-btn act-ship"
                        aria-label="Mark shipped"
                      >
                        <RiTruckLine />
                        <span className="act-label">Ship</span>
                      </button>
                    )}
                    {status === 'Shipped' && (
                      <button
                        type="button"
                        onClick={() => onDeliver(order._id)}
                        className="act-btn act-deliver"
                        aria-label="Mark delivered"
                      >
                        <RiCheckDoubleLine />
                        <span className="act-label">Deliver</span>
                      </button>
                    )}
                    <span className="block w-full text-[10px] md:hidden" style={{ color: 'var(--text3)' }}>
                      {formatDate(order.createdAt)}
                    </span>
                  </div>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  </div>
)

export default OrdersTable
