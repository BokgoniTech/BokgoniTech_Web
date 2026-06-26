import { useState } from 'react'
import { NavLink, Link } from 'react-router-dom'
import Logo from './Logo'
import Icon from './Icon'
import { useAuth } from '../context/AuthContext'

const links = [
  { to: '/', label: 'Home', end: true },
  { to: '/about', label: 'About' },
  { to: '/services', label: 'Services' },
  { to: '/activity', label: 'Activity Log' },
  { to: '/contact', label: 'Contact' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const { user } = useAuth()

  const linkClass = ({ isActive }) =>
    `px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
      isActive ? 'text-white bg-brand-800/70' : 'text-brand-200 hover:text-white hover:bg-brand-800/40'
    }`

  return (
    <header className="sticky top-0 z-50 border-b border-brand-800/70 bg-brand-950/80 backdrop-blur-md">
      <nav className="container-bt flex h-16 items-center justify-between">
        <Logo />

        <div className="hidden items-center gap-1 md:flex">
          {links.map((l) => (
            <NavLink key={l.to} to={l.to} end={l.end} className={linkClass}>
              {l.label}
            </NavLink>
          ))}
        </div>

        <div className="hidden items-center gap-2 md:flex">
          <Link to={user ? '/portal' : '/portal/login'} className="btn-ghost">
            <Icon name="lock" className="h-4 w-4" />
            {user ? 'Portal' : 'Staff Login'}
          </Link>
          <Link to="/request" className="btn-primary">
            Request a Service
          </Link>
        </div>

        <button
          className="btn-ghost md:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          <Icon name={open ? 'close' : 'menu'} />
        </button>
      </nav>

      {open && (
        <div className="border-t border-brand-800/70 bg-brand-950 md:hidden">
          <div className="container-bt flex flex-col gap-1 py-4">
            {links.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                end={l.end}
                className={linkClass}
                onClick={() => setOpen(false)}
              >
                {l.label}
              </NavLink>
            ))}
            <div className="mt-2 flex flex-col gap-2">
              <Link
                to={user ? '/portal' : '/portal/login'}
                className="btn-secondary"
                onClick={() => setOpen(false)}
              >
                <Icon name="lock" className="h-4 w-4" />
                {user ? 'Open Portal' : 'Staff Login'}
              </Link>
              <Link to="/request" className="btn-primary" onClick={() => setOpen(false)}>
                Request a Service
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
