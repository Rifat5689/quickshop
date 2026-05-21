import { Navigate } from 'react-router-dom'
import useAuth from '../hooks/useAuth'

const PrivateRoute = ({ children }) => {
  const { isAuthenticated, isReady } = useAuth()

  if (!isReady) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-bg text-text">
        Loading...
      </div>
    )
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }

  return children
}

export default PrivateRoute
