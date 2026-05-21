import api from '../../../services/api'

const login = async (payload) => {
  const response = await api.post('/admin/auth/login', payload)
  return response.data?.data
}

const register = async (payload) => {
  const response = await api.post('/admin/auth/register', payload)
  return response.data?.data
}

const logout = async () => {
  const response = await api.post('/admin/auth/logout')
  return response.data?.data
}

const me = async () => {
  const response = await api.get('/admin/auth/me')
  return response.data?.data
}

const refresh = async () => {
  const response = await api.post('/admin/auth/refresh')
  return response.data?.data
}

export default {
  login,
  register,
  logout,
  me,
  refresh,
}
