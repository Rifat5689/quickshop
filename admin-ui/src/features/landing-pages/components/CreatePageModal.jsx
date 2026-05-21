import { useEffect, useMemo, useState } from 'react'
import { API_BASE_URL } from '../../../config/env'
import landingPageService from '../services/landingPageService'

const toSlug = (value) =>
  value
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '')

const CreatePageModal = ({ isOpen, onClose, onCreate }) => {
  const [form, setForm] = useState({
    name: '',
    slug: '',
    title: '',
    subtitle: '',
    price: '',
    discount: '',
    stock: '',
    status: 'Draft',
    description: '',
    images: [],
  })
  const [imageError, setImageError] = useState('')
  const [isSlugTouched, setIsSlugTouched] = useState(false)

  const pageBaseUrl = useMemo(() => {
    const apiRoot = API_BASE_URL.replace(/\/api\/v1\/?$/, '')
    return `${apiRoot}/pages`
  }, [])

  if (!isOpen) return null

  useEffect(() => {
    const source = isSlugTouched ? form.slug : form.name
    const prepared = toSlug(source)

    if (!prepared) {
      setForm((prev) => ({ ...prev, slug: '' }))
      return undefined
    }

    const timer = setTimeout(async () => {
      try {
        const suggested = await landingPageService.suggestSlug({
          name: form.name,
          slug: prepared,
        })
        if (!suggested) return
        setForm((prev) => (prev.slug === suggested ? prev : { ...prev, slug: suggested }))
      } catch {
        setForm((prev) => (prev.slug === prepared ? prev : { ...prev, slug: prepared }))
      }
    }, 250)

    return () => clearTimeout(timer)
  }, [form.name, form.slug, isSlugTouched])

  const handleChange = (field) => (event) => {
    const value = event.target.value
    const next = { ...form, [field]: value }
    if (field === 'name') {
      if (!isSlugTouched) {
        next.slug = toSlug(value)
      }
    }
    if (field === 'slug') {
      next.slug = toSlug(value)
      setIsSlugTouched(true)
    }
    setForm(next)
  }

  const handleImages = (event) => {
    setForm((prev) => ({ ...prev, images: event.target.files }))
    setImageError('')
  }

  const handleSubmit = () => {
    if (!form.images || form.images.length === 0) {
      setImageError('Please add at least one image.')
      return
    }

    onCreate({
      name: form.name,
      slug: form.slug,
      title: form.title,
      subtitle: form.subtitle,
      price: Number(form.price || 0),
      discount: Number(form.discount || 0),
      stock: Number(form.stock || 0),
      status: form.status,
      description: form.description,
      images: form.images,
    })
    setImageError('')
    setForm({
      name: '',
      slug: '',
      title: '',
      subtitle: '',
      price: '',
      discount: '',
      stock: '',
      status: 'Draft',
      description: '',
      images: [],
    })
    setIsSlugTouched(false)
  }

  return (
    <div className="overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3 className="modal-title">Create Landing Page</h3>
          <button type="button" onClick={onClose} className="modal-close" aria-label="Close">
            ✕
          </button>
        </div>
        <div className="modal-body">
          <div className="section-label">Basic</div>
          <div className="form-group">
            <label className="form-label">Product Name</label>
            <input value={form.name} onChange={handleChange('name')} className="form-input" />
          </div>
          <div className="form-group">
            <label className="form-label">URL Slug</label>
            <input value={form.slug} onChange={handleChange('slug')} className="form-input mono" />
            <div className="mt-1 text-[11px]" style={{ color: 'var(--text3)' }}>
              Auto URL: {pageBaseUrl}/{form.slug || 'your-slug'}
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Title</label>
              <input value={form.title} onChange={handleChange('title')} className="form-input" />
            </div>
            <div className="form-group">
              <label className="form-label">Subtitle</label>
              <input value={form.subtitle} onChange={handleChange('subtitle')} className="form-input" />
            </div>
          </div>
          <div className="section-label">Pricing</div>
          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Price</label>
              <input type="number" value={form.price} onChange={handleChange('price')} className="form-input" />
            </div>
            <div className="form-group">
              <label className="form-label">Discount (%)</label>
              <input type="number" value={form.discount} onChange={handleChange('discount')} className="form-input" />
            </div>
            <div className="form-group">
              <label className="form-label">Stock</label>
              <input type="number" value={form.stock} onChange={handleChange('stock')} className="form-input" />
            </div>
            <div className="form-group">
              <label className="form-label">Status</label>
              <select value={form.status} onChange={handleChange('status')} className="settings-select">
                <option value="Draft">Draft</option>
                <option value="Live">Live</option>
              </select>
            </div>
          </div>
          <div className="section-label">Content</div>
          <div className="form-group">
            <label className="form-label">Description</label>
            <textarea
              rows="3"
              value={form.description}
              onChange={handleChange('description')}
              className="form-input"
            />
          </div>
          <div className="form-group">
            <label className="form-label">Images (required)</label>
            <input type="file" multiple accept="image/*" onChange={handleImages} className="form-input" />
            {imageError ? (
              <div className="mt-2 text-xs font-semibold" style={{ color: 'var(--red)' }}>
                {imageError}
              </div>
            ) : null}
          </div>
        </div>
        <div className="modal-footer">
          <button type="button" onClick={onClose} className="btn btn-ghost flex-1">
            Cancel
          </button>
          <button type="button" onClick={handleSubmit} className="btn btn-accent flex-1">
            Create Page
          </button>
        </div>
      </div>
    </div>
  )
}

export default CreatePageModal
