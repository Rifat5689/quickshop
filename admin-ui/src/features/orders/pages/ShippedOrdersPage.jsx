import { useState } from 'react'
import ConfirmModal from '../../../components/shared/ConfirmModal'
import OrderModal from '../components/OrderModal'
import useOrders from '../hooks/useOrders'
import useOrderStatus from '../hooks/useOrderStatus'
import OrdersTable from '../components/OrdersTable'

const ShippedOrdersPage = () => {
  const { data: orders = [], isLoading } = useOrders()
  const { deliver, pay } = useOrderStatus()
  const shippedOrders = orders.filter((order) => order.orderStatus === 'Shipped')
  const [selectedOrder, setSelectedOrder] = useState(null)
  const [confirmState, setConfirmState] = useState(null)

  const confirmMeta = {
    deliver: {
      title: 'Mark Delivered',
      message: 'Mark this order as delivered?',
      label: 'Mark Delivered',
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

    if (action === 'deliver') deliver.mutate(id)
    if (action === 'pay') pay.mutate({ id, paymentStatus })

    setConfirmState(null)
  }

  return (
    <div className="space-y-6">
      <div className="page-header">
        <h2 className="page-title">Shipped Orders</h2>
        <p className="page-sub">Orders currently in transit.</p>
      </div>
      {isLoading ? (
        <div className="card p-6 text-[13px]" style={{ color: 'var(--text3)' }}>
          Loading shipped orders...
        </div>
      ) : (
        <OrdersTable
          orders={shippedOrders}
          onConfirm={() => {}}
          onCancel={() => {}}
          onShip={() => {}}
          onDeliver={(id) => openConfirm('deliver', id)}
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

export default ShippedOrdersPage
