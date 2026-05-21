import { Link } from 'react-router-dom'

const NotFoundPage = () => {
  return (
    <div className="min-h-screen bg-bg">
      <div className="mx-auto flex min-h-screen w-full max-w-lg flex-col items-center justify-center gap-4 px-4 text-center">
        <h1 className="text-3xl font-semibold text-text">Page not found</h1>
        <p className="text-sm text-text/70">The page you requested does not exist.</p>
        <Link
          to="/"
          className="rounded-xl bg-accent px-4 py-2 text-sm font-semibold text-white"
        >
          Back to home
        </Link>
      </div>
    </div>
  )
}

export default NotFoundPage
