import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import LandingGrid from '../components/LandingGrid'
import useLandingPages from '../hooks/useLandingPages'
import usePageActions from '../hooks/usePageActions'
import CreatePageModal from '../components/CreatePageModal'
import EditPageModal from '../components/EditPageModal'
import PreviewDrawer from '../components/PreviewDrawer'
import ConfirmModal from '../../../components/shared/ConfirmModal'

const LandingPagesPage = () => {
  const navigate = useNavigate()
  const { data: pages = [], isLoading } = useLandingPages()
  const { create, update, remove, publish, unpublish } = usePageActions()
  const [isCreateOpen, setCreateOpen] = useState(false)
  const [editPage, setEditPage] = useState(null)
  const [previewPage, setPreviewPage] = useState(null)
  const [deleteTarget, setDeleteTarget] = useState(null)

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

  const handleDeletePrompt = (slug) => {
    const page = mapped.find((item) => item.slug === slug)
    if (!page) return
    setDeleteTarget(page)
  }

  const handleDeleteConfirm = () => {
    if (!deleteTarget) return
    remove.mutate(deleteTarget._id)
    setDeleteTarget(null)
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
          onDelete={handleDeletePrompt}
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
          setEditPage(null)
        }}
        onDelete={(id) => {
          const page = mapped.find((item) => item._id === id)
          if (page) {
            setDeleteTarget(page)
          }
          setEditPage(null)
        }}
      />
      <PreviewDrawer
        isOpen={Boolean(previewPage)}
        page={previewPage}
        onClose={() => setPreviewPage(null)}
        onPrimary={handlePrimary}
      />
      <ConfirmModal
        isOpen={Boolean(deleteTarget)}
        title="Delete Landing Page"
        message={
          deleteTarget
            ? `Are you sure you want to delete "${deleteTarget.name}"? This action cannot be undone.`
            : ''
        }
        confirmLabel="Delete Page"
        onConfirm={handleDeleteConfirm}
        onClose={() => setDeleteTarget(null)}
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
