import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import authService from '../services/authService'
import useAuth from '../../../hooks/useAuth'
import useToast from '../../../hooks/useToast'

const LoginForm = () => {
  const [identifier, setIdentifier] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const { login } = useAuth()
  const { showToast } = useToast()
  const navigate = useNavigate()

  const handleSubmit = async (event) => {
    event.preventDefault()
    setLoading(true)

    try {
      const user = await authService.login({ identifier, password })
      login(user)
      showToast('Login successful', 'success')
      navigate('/')
    } catch (error) {
      showToast(error?.message || 'Login failed', 'error')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="mt-6 grid gap-4">
      <div className="form-group">
        <label className="form-label">Username or email</label>
        <input
          type="text"
          value={identifier}
          onChange={(event) => setIdentifier(event.target.value)}
          className="form-input"
          placeholder="admin or admin@example.com"
          required
        />
      </div>
      <div className="form-group">
        <label className="form-label">Password</label>
        <input
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          className="form-input"
          placeholder="••••••••"
          required
        />
      </div>
      <button type="submit" disabled={loading} className="btn btn-accent w-full disabled:opacity-60">
        {loading ? 'Signing in...' : 'Sign In'}
      </button>
    </form>
  )
}

export default LoginForm
