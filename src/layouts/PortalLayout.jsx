import { useState } from 'react'
import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import Logo from '../components/Logo'
import Icon from '../components/Icon'
import { useAuth } from '../context/AuthContext'

const navItems = [
  { to: '/portal', label: 'Dashboard', icon: 'dashboard', end: true },
  { to: '/portal/requests', label: 'Pilot Requests', icon: 'mail' },
  { to: '/portal/changelog/new', label: 'Add Changelog Entry', icon: 'plus' },
  { to: '/portal/roadmap', label: 'Build State', icon: 'map' },
]

export default function PortalLayout() {
  const { profile, user, signOut } = useAuth()
  const navigate = useNavigate()
  const [open, setOpen] = useState(false)

  async function handleSignOut() {
    await signOut()
    navigate('/')
  }

  const linkClass = ({ isActive }) =>
    `flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
      isActive ? 'bg-accent/15 text-white' : 'text-brand-300 hover:bg-brand-800/60 hover:text-white'
    }`

  return (
    <div className="flex min-h-screen bg-brand-950">
      {/* Sidebar (desktop) */}
      <aside className="sticky top-0 hidden h-screen w-64 shrink-0 flex-col border-r border-brand-800/70 bg-brand-900/40 p-4 lg:flex">
        <Logo to="/portal" />
        <nav className="mt-8 flex-1 space-y-1">
          {navItems.map((item) => (
            <NavLink key={item.to} to={item.to} end={item.end} className={linkClass}>
              <Icon name={item.icon} className="h-5 w-5" /> {item.label}
            </NavLink>
          ))}
        </nav>
        <UserCard profile={profile} user={user} onSignOut={handleSignOut} />
      </aside>

      {/* Main */}
      <div className="flex min-w-0 flex-1 flex-col">
        {/* Mobile top bar */}
        <header className="sticky top-0 z-30 flex items-center justify-between border-b border-brand-800/70 bg-brand-950/90 px-4 py-3 backdrop-blur lg:hidden">
          <Logo to="/portal" />
          <button className="btn-ghost" onClick={() => setOpen((v) => !v)} aria-label="Menu">
            <Icon name={open ? 'close' : 'menu'} />
          </button>
        </header>

        {open && (
          <nav className="space-y-1 border-b border-brand-800/70 bg-brand-900/60 p-4 lg:hidden">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.end}
                className={linkClass}
                onClick={() => setOpen(false)}
              >
                <Icon name={item.icon} className="h-5 w-5" /> {item.label}
              </NavLink>
            ))}
            <button onClick={handleSignOut} className={`${linkClass({ isActive: false })} w-full`}>
              <Icon name="logout" className="h-5 w-5" /> Sign out
            </button>
          </nav>
        )}

        <main className="flex-1 p-5 sm:p-8">
          <div className="mx-auto max-w-5xl">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  )
}

function UserCard({ profile, user, onSignOut }) {
  return (
    <div className="mt-4 rounded-xl border border-brand-700/60 bg-brand-950/40 p-3">
      <p className="truncate text-sm font-medium text-white">
        {profile?.name || user?.email || 'Staff member'}
      </p>
      <p className="truncate text-xs text-brand-400">{profile?.role ? `Role: ${profile.role}` : user?.email}</p>
      <button
        onClick={onSignOut}
        className="mt-3 flex w-full items-center justify-center gap-2 rounded-lg border border-brand-700 px-3 py-2 text-xs font-medium text-brand-200 hover:border-accent/50 hover:text-white"
      >
        <Icon name="logout" className="h-4 w-4" /> Sign out
      </button>
    </div>
  )
}
