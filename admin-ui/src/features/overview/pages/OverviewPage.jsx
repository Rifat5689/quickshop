import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import useOverview from '../hooks/useOverview'
import useOrders from '../../orders/hooks/useOrders'
import { formatBDT } from '../../../utils/formatters/currencyFormatter'
import {
  RiEyeLine,
  RiMoneyDollarCircleLine,
  RiFileList3Line,
  RiTimeLine,
  RiLoopRightLine,
  RiCheckDoubleLine,
  RiDownloadLine,
} from 'react-icons/ri'
import OrderModal from '../../orders/components/OrderModal'
import CustomerCell from '../../../components/ui/CustomerCell'

const statusBadgeClass = {
  Delivered: 'badge-delivered',
  Processing: 'badge-processing',
  Pending: 'badge-pending',
  Cancelled: 'badge-cancelled',
  Shipped: 'badge-shipped',
}

const StatCard = ({ label, value, badge, badgeTone = 'neutral', iconBg, icon }) => (
  <div className="stat-card">
    <div className="stat-icon" style={{ background: iconBg }}>
      {icon}
    </div>
    <div className="stat-label">{label}</div>
    <div className="stat-val">{value}</div>
    {badge && <div className={`stat-badge ${badgeTone}`}>{badge}</div>}
  </div>
)

const OverviewPage = () => {
  const { data: stats, isLoading } = useOverview()
  const { data: orders = [] } = useOrders()
  const [selectedOrder, setSelectedOrder] = useState(null)

  const chartData = useMemo(() => stats?.dailyOrders || [], [stats])
  const maxRevenue = Math.max(1, ...chartData.map((item) => item.revenue || 0))

  return (
    <div className="space-y-6">
      <div className="page-header-row page-header">
        <div>
          <h2 className="page-title">Good morning, Admin 👋</h2>
          <p className="page-sub">
            Today · {stats?.activeViewers || 0} active on landing pages
          </p>
        </div>
        <div className="page-header-actions flex flex-wrap gap-2">
          <button type="button" className="btn btn-ghost">
            <RiDownloadLine />
            Export
          </button>
          <Link to="/orders" className="btn btn-accent">
            View all orders →
          </Link>
        </div>
      </div>

      {isLoading ? (
        <div className="card p-6 text-[13px]" style={{ color: 'var(--text3)' }}>
          Loading stats...
        </div>
      ) : (
        <div className="stat-grid">
          <StatCard
            label="Total Revenue"
            value={formatBDT(stats?.totalRevenue)}
            badge="▲ +12.4%"
            badgeTone="up"
            iconBg="rgba(99,102,241,0.12)"
            icon={<RiMoneyDollarCircleLine style={{ color: 'var(--accent2)' }} />}
          />
          <StatCard
            label="Total Orders"
            value={stats?.totalOrders || 0}
            badge="all time"
            iconBg="rgba(99,102,241,0.1)"
            icon={<RiFileList3Line style={{ color: 'var(--accent2)' }} />}
          />
          <StatCard
            label="Pending"
            value={stats?.pendingOrders || 0}
            badge="action needed"
            badgeTone="neutral"
            iconBg="rgba(244,63,94,0.1)"
            icon={<RiTimeLine style={{ color: 'var(--red)' }} />}
          />
          <StatCard
            label="Processing"
            value={stats?.processingOrders || 0}
            badge="in progress"
            iconBg="rgba(20,184,166,0.1)"
            icon={<RiLoopRightLine style={{ color: 'var(--teal)' }} />}
          />
          <StatCard
            label="Delivered"
            value={stats?.deliveredOrders || 0}
            badge="completed"
            badgeTone="up"
            iconBg="rgba(16,185,129,0.1)"
            icon={<RiCheckDoubleLine style={{ color: 'var(--green)' }} />}
          />
        </div>
      )}

      <div className="chart-grid">
        <div className="card">
          <div className="card-header">
            <div>
              <div className="card-title">Weekly Revenue</div>
              <div className="card-sub">Last 7 days</div>
            </div>
            <span className="money-val text-[13px]">
              {formatBDT(chartData.reduce((sum, item) => sum + (item.revenue || 0), 0))}
            </span>
          </div>
          <div className="chart-wrap">
            <div className="chart-bars">
              {chartData.map((item) => (
                <div
                  key={item._id?.date || item._id}
                  className="flex min-w-0 flex-1 flex-col items-center gap-1"
                >
                  <div className="text-[9px]" style={{ fontFamily: 'var(--mono)', color: 'var(--text3)' }}>
                    {item.revenue ? `৳${Math.round(item.revenue / 1000)}k` : '—'}
                  </div>
                  <div
                    className="chart-bar"
                    style={{ height: `${Math.max(6, (item.revenue / maxRevenue) * 100)}%` }}
                  />
                  <div className="chart-day">{item._id?.date?.slice(5) || 'Day'}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="card">
          <div className="card-header">
            <div className="card-title">Quick Stats</div>
          </div>
          <div className="px-3.5 py-3.5 text-[13px]" style={{ color: 'var(--text2)' }}>
            <div className="detail-row">
              <span className="detail-key">Avg order value</span>
              <span className="detail-val money-val">{formatBDT(stats?.avgOrderValue || 0)}</span>
            </div>
            <div className="detail-row">
              <span className="detail-key">Conversion rate</span>
              <span className="detail-val">{(stats?.conversionRate || 0).toFixed(1)}%</span>
            </div>
            <div className="detail-row">
              <span className="detail-key">Top product</span>
              <span className="detail-val">{stats?.topProduct || '—'}</span>
            </div>
            <div className="detail-row">
              <span className="detail-key">Top city</span>
              <span className="detail-val">{stats?.topCity || '—'}</span>
            </div>
            <div className="detail-row !border-0">
              <span className="detail-key">Delivered rate</span>
              <span className="detail-val" style={{ color: 'var(--green)' }}>
                {(stats?.deliveredRate || 0).toFixed(1)}%
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="card">
        <div className="card-header">
          <div>
            <div className="card-title">Recent Orders</div>
            <div className="card-sub">Last 6 transactions</div>
          </div>
          <Link to="/orders" className="btn btn-ghost btn-sm">
            View all →
          </Link>
        </div>
        <div className="tbl-wrap">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Customer</th>
                <th>Product</th>
                <th>Status</th>
                <th className="text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {orders.slice(0, 6).map((order, index) => (
                <tr key={order._id}>
                  <td>
                    <CustomerCell
                      name={order.shippingDetails?.fullName || 'Customer'}
                      phone={order.shippingDetails?.phone || ''}
                      index={index}
                    />
                  </td>
                  <td>{order.orderItem?.name}</td>
                  <td>
                    <span className={`badge ${statusBadgeClass[order.orderStatus] || 'badge-draft'}`}>
                      <span className="badge-dot" />
                      {order.orderStatus}
                    </span>
                  </td>
                  <td className="text-right">
                    <button
                      type="button"
                      className="act-btn act-view"
                      onClick={() => setSelectedOrder(order)}
                      aria-label="View order"
                    >
                      <RiEyeLine />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <OrderModal
        isOpen={Boolean(selectedOrder)}
        order={selectedOrder}
        onClose={() => setSelectedOrder(null)}
        onAction={() => {}}
      />
    </div>
  )
}

export default OverviewPage
