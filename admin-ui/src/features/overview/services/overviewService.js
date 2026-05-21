import api from '../../../services/api'

const getStats = async () => {
  const response = await api.get('/orders/stats/dashboard')
  return response.data?.data
}

export default { getStats }
