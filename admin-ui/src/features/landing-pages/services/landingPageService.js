import api from '../../../services/api'
import { buildPageUrl } from '../../../config/env'

const buildProductFormData = (payload) => {
  const formData = new FormData()
  formData.append('name', payload.name)
  if (payload.slug) formData.append('slug', payload.slug)
  formData.append('title', payload.title || '')
  formData.append('subtitle', payload.subtitle || '')
  formData.append('description', payload.description || '')
  formData.append('price', String(payload.price ?? 0))
  formData.append('discount', String(payload.discount ?? 0))
  formData.append('stock', String(payload.stock ?? 0))
  formData.append('status', payload.status || 'Draft')
  formData.append('language', payload.language === 'en' ? 'en' : 'bn')
  formData.append('url', buildPageUrl(payload.slug))

  if (payload.images?.length) {
    Array.from(payload.images).forEach((file) => formData.append('images', file))
  }

  return formData
}

const getAll = async () => {
  const response = await api.get('/products')
  return response.data?.data || []
}

const suggestSlug = async ({ name = '', slug = '', excludeId = '' } = {}) => {
  const params = new URLSearchParams()
  if (name) params.set('name', name)
  if (slug) params.set('slug', slug)
  if (excludeId) params.set('excludeId', excludeId)

  const response = await api.get(`/products/slug/suggest?${params.toString()}`)
  return response.data?.data?.slug || ''
}

const create = async (payload) => {
  const response = await api.post('/products', buildProductFormData(payload), {
    headers: { 'Content-Type': 'multipart/form-data' },
  })
  return response.data?.data
}

const update = async (id, payload) => {
  const response = await api.patch(`/products/${id}`, buildProductFormData(payload), {
    headers: { 'Content-Type': 'multipart/form-data' },
  })
  return response.data?.data
}

const remove = async (id) => {
  const response = await api.delete(`/products/${id}`)
  return response.data?.data
}

const publish = async (id) => {
  const response = await api.patch(`/products/${id}/publish`)
  return response.data?.data
}

const unpublish = async (id) => {
  const response = await api.patch(`/products/${id}/unpublish`)
  return response.data?.data
}

export default { getAll, suggestSlug, create, update, remove, publish, unpublish }
