import axios from 'axios'
import { API_BASE_URL } from '../config/env'

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 12_000,
  withCredentials: true,
})

const refreshAccessToken = async () => {
  return axios.post(`${API_BASE_URL}/admin/auth/refresh`, null, {
    withCredentials: true,
  })
}

api.interceptors.request.use((config) => config)

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const status = error?.response?.status
    const requestUrl = error?.config?.url || ''
    const isAuthCheck = requestUrl.includes('/admin/auth/me')
    const isAuthRefresh = requestUrl.includes('/admin/auth/refresh')
    const isAuthLogin = requestUrl.includes('/admin/auth/login')
    const isAuthRegister = requestUrl.includes('/admin/auth/register')
    const isLoginPage = window.location.pathname === '/login'
    const isSignupPage = window.location.pathname === '/signup'

    if (status === 401) {
      localStorage.removeItem('auth-user')
      if (
        !error.config?._retry &&
        !isAuthCheck &&
        !isAuthRefresh &&
        !isAuthLogin &&
        !isAuthRegister
      ) {
        error.config._retry = true
        try {
          await refreshAccessToken()
          return api(error.config)
        } catch {
          if (!isLoginPage && !isSignupPage) {
            window.location.assign('/login')
          }
        }
      } else if (!isLoginPage && !isSignupPage && !isAuthCheck) {
        window.location.assign('/login')
      }
    }

    if (status === 422) {
      return Promise.reject({
        message: 'Validation error',
        errors: error?.response?.data?.errors || {},
      })
    }

    return Promise.reject(error)
  }
)

export default api
