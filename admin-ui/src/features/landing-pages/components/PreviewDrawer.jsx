import { buildPageUrl } from '../../../config/env'
import CopyButton from '../../../components/shared/CopyButton'

const PreviewDrawer = ({ isOpen, page, onClose, onPrimary }) => {
  if (!isOpen || !page) return null

  const imageUrl = page.images?.[0]?.url
  const shopUrl = page.url && page.url.length ? page.url : buildPageUrl(page.slug)

  return (
    <>
      <div className="drawer-overlay show" onClick={onClose} />
      <div className="drawer open">
        <div className="drawer-header">
          <div>
            <div className="modal-title">{page.name} — Preview</div>
            <div className="text-[11px]" style={{ color: 'var(--text3)' }}>
              Product preview
            </div>
          </div>
          <button type="button" onClick={onClose} className="modal-close" aria-label="Close">
            ✕
          </button>
        </div>
        <div className="modal-body">
          {imageUrl && (
            <div className="mb-3.5 overflow-hidden rounded-xl border" style={{ borderColor: 'var(--border)' }}>
              <img src={imageUrl} alt={page.name} className="block h-[180px] w-full object-cover" />
            </div>
          )}
          <div className="mb-1.5 text-lg font-bold" style={{ color: 'var(--text)' }}>
            {page.name}
          </div>
          <p className="mb-3.5 text-[13px]" style={{ color: 'var(--text3)' }}>
            {page.description || 'Product preview'}
          </p>
          <div className="detail-row">
            <span className="detail-key">Price</span>
            <span className="detail-val money-val">৳{Number(page.price).toLocaleString('en-US')}</span>
          </div>
          <div className="detail-row">
            <span className="detail-key">Stock remaining</span>
            <span className="detail-val" style={{ fontFamily: 'var(--mono)' }}>
              {page.stock} pcs
            </span>
          </div>
          <div className="detail-row">
            <span className="detail-key">Orders</span>
            <span className="detail-val" style={{ fontFamily: 'var(--mono)' }}>
              {page.orders || 0}
            </span>
          </div>
          <div className="detail-row">
            <span className="detail-key">Sold percentage</span>
            <span className="detail-val" style={{ color: 'var(--green)' }}>
              {page.sold || 0}%
            </span>
          </div>
          <div className="detail-row !border-0">
            <span className="detail-key">Status</span>
            <span className={`badge ${page.status === 'Live' ? 'badge-live' : 'badge-draft'}`}>
              <span className="badge-dot" />
              {page.status}
            </span>
          </div>
          <div className="detail-row !border-0">
            <span className="detail-key">Shop URL</span>
            <div className="flex items-center gap-2 min-w-0">
              <a
                href={shopUrl}
                target="_blank"
                rel="noreferrer"
                className="detail-val truncate text-[12px]"
                style={{ color: 'var(--accent)' }}
              >
                {shopUrl}
              </a>
              <CopyButton text={shopUrl} />
            </div>
          </div>
        </div>
        <div className="modal-footer">
          <button type="button" onClick={onClose} className="btn btn-ghost flex-1">
            Close
          </button>
          <button
            type="button"
            onClick={onPrimary}
            className={`btn flex-1 ${page.status === 'Live' ? 'btn-ghost' : 'btn-accent'}`}
          >
            {page.status === 'Live' ? 'Go to Orders' : 'Publish Page'}
          </button>
        </div>
      </div>
    </>
  )
}

export default PreviewDrawer
