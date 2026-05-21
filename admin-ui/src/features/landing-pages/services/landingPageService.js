import api from '../../../services/api'

const buildProductFormData = (payload) => {
  const formData = new FormData()
  formData.append('name', payload.name)
  formData.append('title', payload.title || '')
  formData.append('subtitle', payload.subtitle || '')
  formData.append('description', payload.description || '')
  formData.append('price', String(payload.price || 0))
  formData.append('discount', String(payload.discount || 0))
  formData.append('stock', String(payload.stock || 0))

  if (payload.images && payload.images.length) {
    Array.from(payload.images).forEach((file) => formData.append('images', file))
  }

  return formData
}

const getAll = async () => {
  const response = await api.get('/pages')
  return response.data?.data || []
}

const suggestSlug = async ({ name = '', slug = '', excludeId = '' } = {}) => {
  const params = new URLSearchParams()
  if (name) params.set('name', name)
  if (slug) params.set('slug', slug)
  if (excludeId) params.set('excludeId', excludeId)

  const response = await api.get(`/pages/slug/suggest?${params.toString()}`)
  return response.data?.data?.slug || ''
}

const create = async (payload) => {
  const productForm = buildProductFormData(payload)
  const productResponse = await api.post('/products', productForm, {
    headers: { 'Content-Type': 'multipart/form-data' },
  })

  const product = productResponse.data?.data

  const pagePayload = {
    name: payload.name,
    title: payload.title,
    subtitle: payload.subtitle,
    slug: payload.slug,
    price: Number(payload.price || 0),
    discount: Number(payload.discount || 0),
    stock: Number(payload.stock || 0),
    description: payload.description || '',
    status: payload.status || 'Draft',
    productId: product?._id,
    images: product?.images || [],
  }

  const response = await api.post('/pages', pagePayload)
  return response.data?.data
}

const update = async (id, payload) => {
  let product = null

  if (payload.productId) {
    const productForm = buildProductFormData(payload)
    const productResponse = await api.patch(`/products/${payload.productId}`, productForm, {
      headers: { 'Content-Type': 'multipart/form-data' },
    })
    product = productResponse.data?.data
  }

  const pagePayload = {
    name: payload.name,
    slug: payload.slug,
    title: payload.title,
    subtitle: payload.subtitle,
    price: Number(payload.price || 0),
    discount: Number(payload.discount || 0),
    stock: Number(payload.stock || 0),
    description: payload.description || '',
    status: payload.status || 'Draft',
    productId: payload.productId,
  }

  if (product?.images?.length) {
    pagePayload.images = product.images
  }

  const response = await api.put(`/pages/${id}`, pagePayload)
  return response.data?.data
}

const remove = async (id) => {
  const response = await api.delete(`/pages/${id}`)
  return response.data?.data
}

const publish = async (id) => {
  const response = await api.patch(`/pages/${id}/publish`)
  return response.data?.data
}

const unpublish = async (id) => {
  const response = await api.patch(`/pages/${id}/unpublish`)
  return response.data?.data
}

export default { getAll, suggestSlug, create, update, remove, publish, unpublish }
