import api from '../../../services/api'

const getSummary = async () => {
  const response = await api.get('/pages/views/summary')
  return response.data?.data
}

const getAll = async () => {
  const response = await api.get('/pages/views')
  return response.data?.data || []
}

export default { getSummary, getAll }
