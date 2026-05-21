import { useState } from 'react'
import ConfirmModal from '../../../components/shared/ConfirmModal'
import OrderModal from '../components/OrderModal'
import useOrders from '../hooks/useOrders'
import useOrderStatus from '../hooks/useOrderStatus'
import OrdersTable from '../components/OrdersTable'
import OrderStatusSummary from '../components/OrderStatusSummary'

const ProcessingOrdersPage = () => {
  const { data: orders = [], isLoading } = useOrders()
  const { ship, pay } = useOrderStatus()
  const processingOrders = orders.filter((order) => order.orderStatus === 'Processing')
  const [selectedOrder, setSelectedOrder] = useState(null)
  const [confirmState, setConfirmState] = useState(null)

  const confirmMeta = {
    ship: {
      title: 'Mark Shipped',
      message: 'Mark this order as shipped?',
      label: 'Mark Shipped',
    },
    pay: {
      title: 'Update Payment',
      message: 'Update payment status for this order?',
      label: 'Update',
    },
  }

  const openConfirm = (action, id, paymentStatus) => {
    setConfirmState({ action, id, paymentStatus })
  }

  const handleConfirm = () => {
    if (!confirmState) return

    const { action, id, paymentStatus } = confirmState

    if (action === 'ship') ship.mutate(id)
    if (action === 'pay') pay.mutate({ id, paymentStatus })

    setConfirmState(null)
  }

  return (
    <div className="space-y-6">
      <div className="page-header">
        <h2 className="page-title">Processing Orders</h2>
        <p className="page-sub">Packed, quality-checked and in transit.</p>
      </div>
      <OrderStatusSummary orders={processingOrders} />
      {isLoading ? (
        <div className="card p-6 text-[13px]" style={{ color: 'var(--text3)' }}>
          Loading processing orders...
        </div>
      ) : (
        <OrdersTable
          orders={processingOrders}
          onConfirm={() => {}}
          onCancel={() => {}}
          onShip={(id) => openConfirm('ship', id)}
          onDeliver={() => {}}
          onPay={(id, paymentStatus) => openConfirm('pay', id, paymentStatus)}
          onView={(order) => setSelectedOrder(order)}
        />
      )}
      <OrderModal
        isOpen={Boolean(selectedOrder)}
        order={selectedOrder}
        onClose={() => setSelectedOrder(null)}
        onAction={(action, id) => openConfirm(action, id)}
      />
      <ConfirmModal
        isOpen={Boolean(confirmState)}
        title={confirmState ? confirmMeta[confirmState.action].title : ''}
        message={confirmState ? confirmMeta[confirmState.action].message : ''}
        confirmLabel={confirmState ? confirmMeta[confirmState.action].label : ''}
        onConfirm={handleConfirm}
        onClose={() => setConfirmState(null)}
      />
    </div>
  )
}

export default ProcessingOrdersPage
