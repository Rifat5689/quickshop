import { lazy } from 'react'

export const LazyOverviewPage = lazy(() => import('../features/overview/pages/OverviewPage'))
export const LazyAllOrdersPage = lazy(() => import('../features/orders/pages/AllOrdersPage'))
export const LazyPendingOrdersPage = lazy(() => import('../features/orders/pages/PendingOrdersPage'))
export const LazyProcessingOrdersPage = lazy(
	() => import('../features/orders/pages/ProcessingOrdersPage')
)
export const LazyShippedOrdersPage = lazy(
	() => import('../features/orders/pages/ShippedOrdersPage')
)
export const LazyDeliveredOrdersPage = lazy(
	() => import('../features/orders/pages/DeliveredOrdersPage')
)
export const LazyViewsPage = lazy(() => import('../features/views/pages/ViewsPage'))
export const LazyLandingPagesPage = lazy(() => import('../features/landing-pages/pages/LandingPagesPage'))
export const LazySettingsPage = lazy(() => import('../features/settings/pages/SettingsPage'))
export const LazyLoginPage = lazy(() => import('../features/auth/pages/LoginPage'))
export const LazySignupPage = lazy(() => import('../features/auth/pages/SignupPage'))
export const LazyNotFoundPage = lazy(() => import('../pages/NotFoundPage'))
