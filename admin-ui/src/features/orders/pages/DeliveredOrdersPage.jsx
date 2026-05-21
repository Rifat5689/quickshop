import { useState } from 'react'
import OrderModal from '../components/OrderModal'
import useOrders from '../hooks/useOrders'
import OrdersTable from '../components/OrdersTable'
import OrderStatusSummary from '../components/OrderStatusSummary'

const DeliveredOrdersPage = () => {
  const { data: orders = [], isLoading } = useOrders()
  const deliveredOrders = orders.filter((order) => order.orderStatus === 'Delivered')
  const [selectedOrder, setSelectedOrder] = useState(null)

  return (
    <div className="space-y-6">
      <div className="page-header">
        <h2 className="page-title">Delivered Orders</h2>
        <p className="page-sub">Successfully completed deliveries.</p>
      </div>
      <OrderStatusSummary orders={deliveredOrders} />
      {isLoading ? (
        <div className="card p-6 text-[13px]" style={{ color: 'var(--text3)' }}>
          Loading delivered orders...
        </div>
      ) : (
        <OrdersTable
          orders={deliveredOrders}
          onConfirm={() => {}}
          onCancel={() => {}}
          onShip={() => {}}
          onDeliver={() => {}}
          onPay={() => {}}
          onView={(order) => setSelectedOrder(order)}
        />
      )}
      <OrderModal
        isOpen={Boolean(selectedOrder)}
        order={selectedOrder}
        onClose={() => setSelectedOrder(null)}
        onAction={() => {}}
      />
    </div>
  )
}

export default DeliveredOrdersPage
