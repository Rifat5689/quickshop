import { NavLink } from 'react-router-dom'
import { routeConfig } from '../../router/routeConfig'
import { APP_NAME } from '../../config/appConfig'
import useAuth from '../../hooks/useAuth'
import Avatar from '../ui/Avatar'
import useOrders from '../../features/orders/hooks/useOrders'
import { useViewsSummary } from '../../features/views/hooks/useViews'

const badgeToneByPath = {
  '/orders': 'violet',
  '/orders/pending': 'violet',
  '/orders/processing': 'amber',
  '/orders/shipped': 'purple',
  '/orders/delivered': 'teal',
  '/views': 'slate',
}

const LogoIcon = () => (
  <div className="sb-logo-icon">
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
      <rect x="1" y="1" width="6" height="6" rx="1.5" fill="white" />
      <rect x="9" y="1" width="6" height="6" rx="1.5" fill="rgba(255,255,255,.55)" />
      <rect x="1" y="9" width="6" height="6" rx="1.5" fill="rgba(255,255,255,.55)" />
      <rect x="9" y="9" width="6" height="6" rx="1.5" fill="rgba(255,255,255,.75)" />
    </svg>
  </div>
)

const Sidebar = ({ variant = 'desktop', onClose }) => {
  const { user } = useAuth()
  const { data: orders = [] } = useOrders()
  const { data: viewsSummary } = useViewsSummary()

  const counts = orders.reduce(
    (acc, order) => {
      acc.total += 1
      acc[order.orderStatus] = (acc[order.orderStatus] || 0) + 1
      return acc
    },
    { total: 0 }
  )

  const mainRoutes = routeConfig.filter((item) => item.group === 'main')
  const contentRoutes = routeConfig.filter((item) => item.group === 'content')

  const badgeMap = {
    '/orders': counts.total,
    '/orders/pending': counts.Pending,
    '/orders/processing': counts.Processing,
    '/orders/shipped': counts.Shipped,
    '/orders/delivered': counts.Delivered,
    '/views': viewsSummary?.viewsToday,
    '/pages': undefined,
  }

  const renderItem = (item) => {
    const Icon = item.icon
    const badge = badgeMap[item.path]
    const tone = badgeToneByPath[item.path] || 'slate'

    return (
      <NavLink
        key={item.path}
        to={item.path}
        onClick={onClose}
        className={({ isActive }) => `sb-item${isActive ? ' active' : ''}`}
      >
        <Icon className="h-[15px] w-[15px] shrink-0" />
        {item.label}
        {badge != null && <span className={`sb-badge ${tone}`}>{badge}</span>}
      </NavLink>
    )
  }

  const nav = (
    <div className="sb-nav">
      <div className="sb-section">Main</div>
      {mainRoutes.map(renderItem)}
      <div className="sb-section">Content</div>
      {contentRoutes.map(renderItem)}
    </div>
  )

  if (variant === 'mobile') {
    return (
      <div className="sidebar h-full">
        <div className="sb-logo">
          <LogoIcon />
          <div className="min-w-0 flex-1">
            <div className="sb-logo-text">{APP_NAME}</div>
            <div className="sb-logo-sub">Landing Hub</div>
          </div>
          <button type="button" onClick={onClose} className="modal-close" aria-label="Close menu">
            ✕
          </button>
        </div>
        {nav}
      </div>
    )
  }

  return (
    <aside className="sidebar-desktop">
      <div className="sb-logo">
        <LogoIcon />
        <div>
          <div className="sb-logo-text">{APP_NAME}</div>
          <div className="sb-logo-sub">Landing Hub</div>
        </div>
      </div>
      {nav}
      <div className="sb-footer">
        <div className="sb-user">
          <Avatar name={user?.username || user?.name || 'Admin'} />
          <div className="min-w-0 flex-1">
            <p className="text-[13px] font-medium" style={{ color: 'var(--text)' }}>
              {user?.username || user?.name || 'Admin'}
            </p>
            <p className="text-[11px]" style={{ color: 'var(--text3)' }}>
              Administrator
            </p>
          </div>
        </div>
      </div>
    </aside>
  )
}

export default Sidebar
