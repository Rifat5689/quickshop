import { createBrowserRouter } from 'react-router-dom'
import AdminLayout from '../layouts/AdminLayout'
import PrivateRoute from './PrivateRoute'
import { routeConfig } from './routeConfig'
import { LazyLoginPage, LazyNotFoundPage, LazySignupPage } from './LazyRoutes'

const routes = routeConfig.map((route) => {
  const RouteComponent = route.component
  return {
    path: route.path,
    element: <RouteComponent />,
  }
})

const router = createBrowserRouter([
  {
    path: '/login',
    element: <LazyLoginPage />,
  },
  {
    path: '/signup',
    element: <LazySignupPage />,
  },
  {
    path: '/',
    element: (
      <PrivateRoute>
        <AdminLayout />
      </PrivateRoute>
    ),
    children: routes,
  },
  {
    path: '*',
    element: <LazyNotFoundPage />,
  },
])

export default router
