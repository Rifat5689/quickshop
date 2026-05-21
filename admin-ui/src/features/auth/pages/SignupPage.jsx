import { useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import SignupForm from '../components/SignupForm'
import useAuth from '../../../hooks/useAuth'

const SignupPage = () => {
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
        <h1 className="page-title">Create admin account</h1>
        <p className="page-sub">Set up your dashboard access.</p>
        <SignupForm />
        <p className="mt-4 text-[13px]" style={{ color: 'var(--text3)' }}>
          Already have an account?{' '}
          <Link to="/login" className="font-semibold" style={{ color: 'var(--accent)' }}>
            Sign in
          </Link>
        </p>
      </div>
    </div>
  )
}

export default SignupPage
