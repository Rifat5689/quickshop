import { useState } from 'react'
import ConfirmModal from '../../../components/shared/ConfirmModal'
import OrderModal from '../components/OrderModal'
import useOrders from '../hooks/useOrders'
import useOrderStatus from '../hooks/useOrderStatus'
import OrdersTable from '../components/OrdersTable'
import OrderStatusSummary from '../components/OrderStatusSummary'

const PendingOrdersPage = () => {
  const { data: orders = [], isLoading } = useOrders()
  const { confirm, cancel, pay } = useOrderStatus()
  const pendingOrders = orders.filter((order) => order.orderStatus === 'Pending')
  const [selectedOrder, setSelectedOrder] = useState(null)
  const [confirmState, setConfirmState] = useState(null)

  const confirmMeta = {
    confirm: {
      title: 'Confirm Order',
      message: 'Confirm this order and move it to Processing?',
      label: 'Confirm',
    },
    cancel: {
      title: 'Cancel Order',
      message: 'Cancel this order? This action cannot be undone.',
      label: 'Cancel Order',
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

    if (action === 'confirm') confirm.mutate(id)
    if (action === 'cancel') cancel.mutate(id)
    if (action === 'pay') pay.mutate({ id, paymentStatus })

    setConfirmState(null)
  }

  return (
    <div className="space-y-6">
      <div className="page-header">
        <h2 className="page-title">Pending Orders</h2>
        <p className="page-sub">Awaiting confirmation and action.</p>
      </div>
      <OrderStatusSummary orders={pendingOrders} />
      {isLoading ? (
        <div className="card p-6 text-[13px]" style={{ color: 'var(--text3)' }}>
          Loading pending orders...
        </div>
      ) : (
        <OrdersTable
          orders={pendingOrders}
          onConfirm={(id) => openConfirm('confirm', id)}
          onCancel={(id) => openConfirm('cancel', id)}
          onShip={() => {}}
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

export default PendingOrdersPage
