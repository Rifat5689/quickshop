import { useLocation } from 'react-router-dom'
import { routeConfig } from '../../router/routeConfig'
import { APP_NAME } from '../../config/appConfig'

const Breadcrumb = () => {
  const location = useLocation()
  const match = routeConfig.find((route) => route.path === location.pathname)

  return (
    <div className="tb-crumb hidden md:flex">
      <span>{APP_NAME}</span>
      <span className="tb-crumb-sep">/</span>
      <span>{match?.label || 'Overview'}</span>
    </div>
  )
}

export default Breadcrumb
