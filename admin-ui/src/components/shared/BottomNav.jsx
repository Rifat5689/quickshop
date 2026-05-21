import { NavLink } from 'react-router-dom'
import {
  RiDashboardLine,
  RiShoppingBag3Line,
  RiTimeLine,
  RiFileListLine,
} from 'react-icons/ri'

const items = [
  { path: '/', label: 'Overview', icon: RiDashboardLine },
  { path: '/orders', label: 'Orders', icon: RiShoppingBag3Line },
  { path: '/orders/pending', label: 'Pending', icon: RiTimeLine },
  { path: '/pages', label: 'Pages', icon: RiFileListLine },
]

const BottomNav = () => (
  <nav className="bottom-nav">
    {items.map((item) => {
      const Icon = item.icon
      return (
        <NavLink
          key={item.path}
          to={item.path}
          end={item.path === '/'}
          className={({ isActive }) => `bni${isActive ? ' active' : ''}`}
        >
          <Icon className="text-xl" />
          <span>{item.label}</span>
        </NavLink>
      )
    })}
  </nav>
)

export default BottomNav
