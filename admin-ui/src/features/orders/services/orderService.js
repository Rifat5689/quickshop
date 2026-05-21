import api from '../../../services/api'

const getAll = async () => {
  const response = await api.get('/orders')
  return response.data?.data || []
}

const getById = async (id) => {
  const response = await api.get(`/orders/${id}`)
  return response.data?.data
}

const confirm = async (id) => {
  const response = await api.patch(`/orders/${id}/confirm`)
  return response.data?.data
}

const ship = async (id) => {
  const response = await api.patch(`/orders/${id}/ship`)
  return response.data?.data
}

const deliver = async (id) => {
  const response = await api.patch(`/orders/${id}/deliver`)
  return response.data?.data
}

const cancel = async (id) => {
  const response = await api.patch(`/orders/${id}/cancel`)
  return response.data?.data
}

const updatePaymentStatus = async (id, paymentStatus) => {
  const response = await api.patch(`/orders/${id}/payment`, { paymentStatus })
  return response.data?.data
}

export default {
  getAll,
  getById,
  confirm,
  ship,
  deliver,
  cancel,
  updatePaymentStatus,
}
