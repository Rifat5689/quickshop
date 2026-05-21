import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import LandingGrid from '../components/LandingGrid'
import useLandingPages from '../hooks/useLandingPages'
import usePageActions from '../hooks/usePageActions'
import CreatePageModal from '../components/CreatePageModal'
import EditPageModal from '../components/EditPageModal'
import PreviewDrawer from '../components/PreviewDrawer'

const LandingPagesPage = () => {
  const navigate = useNavigate()
  const { data: pages = [], isLoading } = useLandingPages()
  const { create, update, remove, publish, unpublish } = usePageActions()
  const [isCreateOpen, setCreateOpen] = useState(false)
  const [editPage, setEditPage] = useState(null)
  const [previewPage, setPreviewPage] = useState(null)

  const mapped = useMemo(() => pages, [pages])

  const handlePreview = (slug) => {
    const page = mapped.find((item) => item.slug === slug)
    setPreviewPage(page)
  }

  const handleEdit = (slug) => {
    const page = mapped.find((item) => item.slug === slug)
    setEditPage(page)
  }

  const handlePublish = (slug) => {
    const page = mapped.find((item) => item.slug === slug)
    if (!page) return
    publish.mutate(page._id)
  }

  const handlePrimary = () => {
    if (!previewPage) return
    if (previewPage.status === 'Live') {
      navigate('/orders')
    } else {
      publish.mutate(previewPage._id)
    }
    setPreviewPage(null)
  }

  const liveCount = pages.filter((page) => page.status === 'Live').length

  return (
    <div className="space-y-6">
      <div className="page-header-row page-header">
        <div>
          <h2 className="page-title">Landing Pages</h2>
          <p className="page-sub">
            {pages.length} pages · {liveCount} live
          </p>
        </div>
        <button
          type="button"
          id="new-page-btn"
          onClick={() => setCreateOpen(true)}
          className="btn btn-accent"
        >
          New Page
        </button>
      </div>
      {isLoading ? (
        <div className="card p-6 text-[13px]" style={{ color: 'var(--text3)' }}>
          Loading pages...
        </div>
      ) : (
        <LandingGrid
          pages={mapped}
          onOpen={handlePreview}
          onEdit={handleEdit}
          onPublish={handlePublish}
          onOrders={() => navigate('/orders')}
        />
      )}
      <CreatePageModal
        isOpen={isCreateOpen}
        onClose={() => setCreateOpen(false)}
        onCreate={(payload) => {
          create.mutate(payload)
          setCreateOpen(false)
        }}
      />
      <EditPageModal
        key={editPage?._id || 'edit'}
        isOpen={Boolean(editPage)}
        page={editPage}
        onClose={() => setEditPage(null)}
        onSave={(id, payload) => {
          update.mutate({ id, payload })
          if (payload.status === 'Live') publish.mutate(id)
          if (payload.status === 'Draft') unpublish.mutate(id)
          setEditPage(null)
        }}
        onDelete={(id) => {
          remove.mutate(id)
          setEditPage(null)
        }}
      />
      <PreviewDrawer
        isOpen={Boolean(previewPage)}
        page={previewPage}
        onClose={() => setPreviewPage(null)}
        onPrimary={handlePrimary}
      />
      <button
        type="button"
        onClick={() => setCreateOpen(true)}
        className="fab"
        aria-label="Create new landing page"
      >
        +
      </button>
    </div>
  )
}

export default LandingPagesPage
