import { RiExternalLinkLine } from 'react-icons/ri'
import { buildPageUrl } from '../../../config/env'
import CopyButton from '../../../components/shared/CopyButton'

const LandingGrid = ({ pages = [], onOpen, onEdit, onPublish, onDelete, onOrders }) => {

  return (
    <div className="page-grid">
      {pages.map((p) => {
        const sold = p.stock ? Math.min(100, Math.round((p.orders / p.stock) * 100)) : 0
        const progressColor = sold > 70 ? 'var(--green)' : sold > 40 ? 'var(--amber)' : 'var(--accent)'
        const pageUrl = p.url && p.url.length ? p.url : buildPageUrl(p.slug)

        return (
          <div key={p._id || p.slug} className="page-card">
            <div className="page-thumb bg-gradient-to-br from-indigo-600 to-indigo-400">
              {p.images?.[0]?.url && (
                <img
                  src={p.images[0].url}
                  alt={p.name}
                  className="absolute inset-0 h-full w-full object-cover"
                />
              )}
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/40" />
              <span className="relative z-[1] text-white/80">{p.slug}</span>
            </div>
            <div className="page-body">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="page-name">{p.name}</div>
                  <div className="page-url">/{p.slug}</div>
                </div>
                <span className={`badge ${p.status === 'Live' ? 'badge-live' : 'badge-draft'}`}>
                  <span className="badge-dot" />
                  {p.status}
                </span>
              </div>
              <div className="page-meta mt-3 grid grid-cols-2 gap-2">
                <div className="page-meta-item">
                  <div className="label">Price</div>
                  <div className="val money-val" style={{ color: 'var(--text)' }}>
                    ৳{Number(p.price).toLocaleString('en-US')}
                  </div>
                </div>
                <div className="page-meta-item">
                  <div className="label">Stock</div>
                  <div className="val">{p.stock} pcs</div>
                </div>
                <div className="page-meta-item">
                  <div className="label">Orders</div>
                  <div className="val">{p.orders || 0}</div>
                </div>
                <div className="page-meta-item">
                  <div className="label">Sold %</div>
                  <div className="val">{sold}%</div>
                </div>
              </div>
              <div className="mt-3">
                <div className="flex items-center justify-between text-[11px]" style={{ color: 'var(--text3)' }}>
                  <span>Progress</span>
                  <span className="font-semibold">{sold}%</span>
                </div>
                <div className="page-progress-bar">
                  <div
                    className="h-full rounded-sm transition-all duration-500"
                    style={{ width: `${sold}%`, background: progressColor }}
                  />
                </div>
              </div>
              <div className="page-url-chip">
                <RiExternalLinkLine className="shrink-0" style={{ color: 'var(--text3)' }} />
                <span className="truncate">{pageUrl}</span>
                <CopyButton text={pageUrl} />
              </div>
              <div className="mt-3 flex gap-2 border-t pt-3" style={{ borderColor: 'var(--border)' }}>
                <button type="button" className="btn btn-ghost btn-sm" onClick={() => onOpen(p.slug)}>
                  Preview
                </button>
                <button type="button" className="btn btn-ghost btn-sm flex-1" onClick={() => onEdit(p.slug)}>
                  Edit
                </button>
                <button type="button" className="btn act-cancel border btn-sm" onClick={() => onDelete?.(p.slug)}>
                  Delete
                </button>
                {p.status !== 'Live' ? (
                  <button type="button" className="btn btn-accent btn-sm" onClick={() => onPublish(p.slug)}>
                    Publish
                  </button>
                ) : (
                  <button type="button" className="btn btn-ghost btn-sm" onClick={() => onOrders?.(p.slug)}>
                    Orders →
                  </button>
                )}
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default LandingGrid
