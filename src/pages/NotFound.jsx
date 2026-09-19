import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <div className="grid min-h-screen place-items-center bg-brand-950 px-5 text-center">
      <div>
        <p className="text-7xl font-extrabold text-accent">404</p>
        <h1 className="mt-4 text-2xl font-bold text-white">Page not found</h1>
        <p className="mt-2 text-brand-300">
          This page does not exist — which is different from a page that failed to load.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <Link to="/" className="btn-primary">
            Back to home
          </Link>
          <Link to="/product" className="btn-secondary">
            What the product does
          </Link>
        </div>
      </div>
    </div>
  )
}
