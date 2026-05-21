import { Outlet, useLocation } from 'react-router-dom'
import { Suspense, useState } from 'react'
import Sidebar from '../components/shared/Sidebar'
import Topbar from '../components/shared/Topbar'
import BottomNav from '../components/shared/BottomNav'

const AdminLayout = () => {
  const [mobileOpen, setMobileOpen] = useState(false)
  const location = useLocation()

  return (
    <div className="admin-shell">
      <Sidebar variant="desktop" />

      <div className="admin-main">
        <Topbar
          onOpenMobile={() => setMobileOpen(true)}
          showBack={location.pathname !== '/'}
        />
        <main className="admin-content">
          <Suspense
            fallback={
              <div className="card p-6 text-[13px]" style={{ color: 'var(--text3)' }}>
                Loading...
              </div>
            }
          >
            <div className="screen-fade">
              <Outlet />
            </div>
          </Suspense>
        </main>
      </div>

      <BottomNav />

      <div
        className={`mobile-sidebar-overlay${mobileOpen ? ' show' : ''}`}
        onClick={() => setMobileOpen(false)}
        aria-hidden={!mobileOpen}
      />
      <div className={`mobile-sidebar mobile-sidebar-right${mobileOpen ? ' open' : ''}`}>
        <Sidebar variant="mobile" onClose={() => setMobileOpen(false)} />
      </div>
    </div>
  )
}

export default AdminLayout
