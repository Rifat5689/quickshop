import { useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import LoginForm from '../components/LoginForm'
import useAuth from '../../../hooks/useAuth'

const LoginPage = () => {
  const navigate = useNavigate()
  const { isAuthenticated, isReady } = useAuth()

  useEffect(() => {
    if (isReady && isAuthenticated) {
      navigate('/')
    }
  }, [isReady, isAuthenticated, navigate])

  return (
    <div className="admin-shell flex min-h-screen items-center justify-center px-4">
      <div className="auth-card w-full max-w-md">
        <h1 className="page-title">Welcome back</h1>
        <p className="page-sub">Sign in to manage the store.</p>
        <LoginForm />
        <p className="mt-4 text-[13px]" style={{ color: 'var(--text3)' }}>
          New here?{' '}
          <Link to="/signup" className="font-semibold" style={{ color: 'var(--accent)' }}>
            Create an account
          </Link>
        </p>
      </div>
    </div>
  )
}

export default LoginPage
