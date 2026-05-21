import api from '../../../services/api'

const getSummary = async () => {
  const response = await api.get('/products/views/summary')
  return response.data?.data
}

const getAll = async () => {
  const response = await api.get('/products/views')
  return response.data?.data || []
}

export default { getSummary, getAll }
