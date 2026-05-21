import { useMemo, useState } from 'react'
import ConfirmModal from '../../../components/shared/ConfirmModal'
import OrderModal from '../components/OrderModal'
import OrderFilterRow from '../components/OrderFilterRow'
import OrdersTable from '../components/OrdersTable'
import useOrders from '../hooks/useOrders'
import useOrderStatus from '../hooks/useOrderStatus'

const AllOrdersPage = () => {
  const { data: orders = [], isLoading } = useOrders()
  const { confirm, cancel, ship, deliver, pay } = useOrderStatus()
  const [search, setSearch] = useState('')
  const [status, setStatus] = useState('all')
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
    ship: {
      title: 'Mark Shipped',
      message: 'Mark this order as shipped?',
      label: 'Mark Shipped',
    },
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

    if (action === 'confirm') confirm.mutate(id)
    if (action === 'cancel') cancel.mutate(id)
    if (action === 'ship') ship.mutate(id)
    if (action === 'deliver') deliver.mutate(id)
    if (action === 'pay') pay.mutate({ id, paymentStatus })

    setConfirmState(null)
  }

  const filteredOrders = useMemo(() => {
    return orders.filter((order) => {
      const matchesStatus = status === 'all' || order.orderStatus === status
      const query = search.toLowerCase()
      const matchesSearch =
        !query ||
        order.shippingDetails?.fullName?.toLowerCase().includes(query) ||
        order.orderItem?.name?.toLowerCase().includes(query)

      return matchesStatus && matchesSearch
    })
  }, [orders, search, status])

  return (
    <div className="space-y-6">
      <div className="page-header">
        <h2 className="page-title">All Orders</h2>
        <p className="page-sub">{orders.length} total orders across all products</p>
      </div>
      <OrderFilterRow
        search={search}
        setSearch={setSearch}
        status={status}
        setStatus={setStatus}
      />
      {isLoading ? (
        <div className="card p-6 text-[13px]" style={{ color: 'var(--text3)' }}>
          Loading orders...
        </div>
      ) : (
        <OrdersTable
          orders={filteredOrders}
          onConfirm={(id) => openConfirm('confirm', id)}
          onCancel={(id) => openConfirm('cancel', id)}
          onShip={(id) => openConfirm('ship', id)}
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

export default AllOrdersPage
