import { RiMenu2Line, RiArrowLeftLine, RiBellLine, RiSearchLine } from 'react-icons/ri'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Breadcrumb from './Breadcrumb'
import useSearch from '../../hooks/useSearch'
import useOrderNotifications from '../../hooks/useOrderNotifications'

const Topbar = ({ onOpenMobile, showBack }) => {
  const { query, setQuery } = useSearch()
  const [notifOpen, setNotifOpen] = useState(false)
  const navigate = useNavigate()
  const { notifications, clearAllForever, hasNotifications } = useOrderNotifications()

  return (
    <header className="topbar relative">
      <button
        type="button"
        className="tb-btn tb-hamburger"
        onClick={onOpenMobile}
        aria-label="Open menu"
      >
        <RiMenu2Line />
      </button>
      <button
        type="button"
        onClick={() => navigate('/')}
        className={`tb-btn tb-back${showBack ? ' is-visible' : ''}`}
        aria-label="Back to overview"
      >
        <RiArrowLeftLine />
      </button>
      <Breadcrumb />
      <div className="tb-search">
        <RiSearchLine className="shrink-0 text-[13px]" style={{ color: 'var(--text3)' }} />
        <input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search orders…"
        />
      </div>
      <div className="tb-nav-right">
        <div className="tb-actions">
          <div className="relative">
            <button
              type="button"
              className="tb-btn"
              onClick={() => setNotifOpen((prev) => !prev)}
              aria-label="Notifications"
            >
              <RiBellLine />
              {hasNotifications && <span className="tb-notif-dot" />}
            </button>
            <div className={`notif-panel${notifOpen ? ' show' : ''}`}>
              <div className="notif-head">
                <span className="notif-title">Notifications</span>
                <button
                  type="button"
                  className="btn btn-ghost btn-sm"
                  onClick={() => {
                    clearAllForever()
                    setNotifOpen(false)
                  }}
                >
                  Clear
                </button>
              </div>
              <div className="notif-list max-h-80 overflow-y-auto">
                {hasNotifications ? (
                  notifications.map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      className="notif-item w-full text-left transition-colors hover:bg-[rgba(128,128,128,0.06)]"
                      onClick={() => {
                        navigate('/orders/pending')
                        setNotifOpen(false)
                      }}
                    >
                      <span className="notif-dot" />
                      <div className="min-w-0 flex-1">
                        <div className="notif-msg">{item.msg}</div>
                        <div className="notif-time">{item.time}</div>
                      </div>
                    </button>
                  ))
                ) : (
                  <div className="px-3.5 py-4 text-xs" style={{ color: 'var(--text3)' }}>
                    No new orders
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Topbar
