import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import authService from '../services/authService'
import useAuth from '../../../hooks/useAuth'
import useToast from '../../../hooks/useToast'

const SignupForm = () => {
  const [form, setForm] = useState({ username: '', email: '', password: '' })
  const [loading, setLoading] = useState(false)
  const { login } = useAuth()
  const { showToast } = useToast()
  const navigate = useNavigate()

  const handleChange = (field) => (event) => {
    setForm((prev) => ({ ...prev, [field]: event.target.value }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setLoading(true)

    try {
      const user = await authService.register(form)
      login(user)
      showToast('Signup successful', 'success')
      navigate('/')
    } catch (error) {
      showToast(error?.message || 'Signup failed', 'error')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="mt-6 grid gap-4">
      <div className="form-group">
        <label className="form-label">Username</label>
        <input
          type="text"
          value={form.username}
          onChange={handleChange('username')}
          className="form-input"
          placeholder="admin"
          required
        />
      </div>
      <div className="form-group">
        <label className="form-label">Email</label>
        <input
          type="email"
          value={form.email}
          onChange={handleChange('email')}
          className="form-input"
          placeholder="admin@example.com"
          required
        />
      </div>
      <div className="form-group">
        <label className="form-label">Password</label>
        <input
          type="password"
          value={form.password}
          onChange={handleChange('password')}
          className="form-input"
          placeholder="••••••••"
          required
        />
      </div>
      <button type="submit" disabled={loading} className="btn btn-accent w-full disabled:opacity-60">
        {loading ? 'Creating account...' : 'Sign Up'}
      </button>
    </form>
  )
}

export default SignupForm
