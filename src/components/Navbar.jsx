import { useState } from 'react'
import { NavLink, Link } from 'react-router-dom'
import Logo from './Logo'
import Icon from './Icon'
import { useAuth } from '../context/AuthContext'

const links = [
  { to: '/product', label: 'What it does' },
  { to: '/how-it-works', label: 'How it works' },
  { to: '/who-its-for', label: "Who it's for" },
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
      <nav className="container-bt flex h-16 items-center justify-between gap-4">
        <Logo />

        <div className="hidden items-center gap-0.5 lg:flex">
          {links.map((l) => (
            <NavLink key={l.to} to={l.to} className={linkClass}>
              {l.label}
            </NavLink>
          ))}
        </div>

        <div className="hidden items-center gap-2 lg:flex">
          <Link to={user ? '/portal' : '/portal/login'} className="btn-ghost">
            <Icon name="lock" className="h-4 w-4" />
            {user ? 'Portal' : 'Staff'}
          </Link>
          <Link to="/pilot" className="btn-primary">
            Request a pilot
          </Link>
        </div>

        <button
          className="btn-ghost lg:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          <Icon name={open ? 'close' : 'menu'} />
        </button>
      </nav>

      {open && (
        <div className="border-t border-brand-800/70 bg-brand-950 lg:hidden">
          <div className="container-bt flex flex-col gap-1 py-4">
            {links.map((l) => (
              <NavLink key={l.to} to={l.to} className={linkClass} onClick={() => setOpen(false)}>
                {l.label}
              </NavLink>
            ))}
            <NavLink to="/changelog" className={linkClass} onClick={() => setOpen(false)}>
              Changelog
            </NavLink>
            <NavLink to="/contact" className={linkClass} onClick={() => setOpen(false)}>
              Contact
            </NavLink>
            <div className="mt-2 flex flex-col gap-2">
              <Link
                to={user ? '/portal' : '/portal/login'}
                className="btn-secondary"
                onClick={() => setOpen(false)}
              >
                <Icon name="lock" className="h-4 w-4" />
                {user ? 'Open portal' : 'Staff login'}
              </Link>
              <Link to="/pilot" className="btn-primary" onClick={() => setOpen(false)}>
                Request a pilot
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
