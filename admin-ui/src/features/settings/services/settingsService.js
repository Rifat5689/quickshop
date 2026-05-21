import api from '../../../services/api'

const getShopSettings = async () => {
  const response = await api.get('/settings')
  return response.data?.data ?? { shopLanguage: 'bn' }
}

const updateShopSettings = async (payload) => {
  const response = await api.patch('/settings', payload)
  return response.data?.data
}

export default { getShopSettings, updateShopSettings }
