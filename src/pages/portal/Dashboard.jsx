import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Icon from '../../components/Icon'
import NotConfigured from '../../components/NotConfigured'
import { useAuth } from '../../context/AuthContext'
import { getRequests, getJobs, getAllActivity, formatDate } from '../../lib/db'
import { isFirebaseConfigured } from '../../lib/firebase'

export default function Dashboard() {
  const { profile, user } = useAuth()
  const [data, setData] = useState({ requests: [], jobs: [], activity: [] })
  const [loading, setLoading] = useState(isFirebaseConfigured)

  useEffect(() => {
    if (!isFirebaseConfigured) return
    let active = true
    Promise.all([getRequests(), getJobs(), getAllActivity()])
      .then(([requests, jobs, activity]) => {
        if (active) setData({ requests, jobs, activity })
      })
      .catch(console.error)
      .finally(() => active && setLoading(false))
    return () => {
      active = false
    }
  }, [])

  const newRequests = data.requests.filter((r) => r.status === 'new')
  const inRepair = data.jobs.filter((j) => j.status === 'In repair' || j.status === 'in-repair')
  const awaitingParts = data.jobs.filter((j) => j.status === 'Awaiting parts')
  const readyForCollection = data.jobs.filter((j) => j.status === 'Ready for collection')

  const stats = [
    { label: 'New requests', value: newRequests.length, to: '/portal/requests', icon: 'mail' },
    { label: 'Devices in repair', value: inRepair.length, to: '/portal/jobs', icon: 'list' },
    { label: 'Awaiting parts', value: awaitingParts.length, to: '/portal/jobs', icon: 'clock' },
    { label: 'Ready for collection', value: readyForCollection.length, to: '/portal/jobs', icon: 'check' },
  ]

  return (
    <div className="space-y-8">
      <header>
        <p className="eyebrow mb-1">Private portal</p>
        <h1 className="text-2xl font-bold text-white">
          Welcome{profile?.name ? `, ${profile.name.split(' ')[0]}` : ''}
        </h1>
        <p className="mt-1 text-sm text-brand-400">{user?.email}</p>
      </header>

      {!isFirebaseConfigured && <NotConfigured feature="The dashboard" />}

      {/* Today's snapshot */}
      <section>
        <h2 className="mb-4 text-sm font-semibold uppercase tracking-wide text-brand-300">
          Today
        </h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((s) => (
            <Link key={s.label} to={s.to} className="card-hover">
              <div className="flex items-center justify-between">
                <span className="grid h-9 w-9 place-items-center rounded-lg bg-accent/10 text-accent">
                  <Icon name={s.icon} className="h-5 w-5" />
                </span>
                <span className="text-3xl font-extrabold text-white">
                  {loading ? '…' : s.value}
                </span>
              </div>
              <p className="mt-3 text-sm text-brand-300">{s.label}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* Quick actions */}
      <section>
        <h2 className="mb-4 text-sm font-semibold uppercase tracking-wide text-brand-300">
          Quick actions
        </h2>
        <div className="flex flex-wrap gap-3">
          <Link to="/portal/activity/new" className="btn-primary">
            <Icon name="plus" className="h-4 w-4" /> Add activity log entry
          </Link>
          <Link to="/portal/requests" className="btn-secondary">View service requests</Link>
          <Link to="/portal/roadmap" className="btn-secondary">Business roadmap</Link>
        </div>
      </section>

      {/* Recent requests */}
      <section>
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-brand-300">
            Latest service requests
          </h2>
          <Link to="/portal/requests" className="text-sm text-accent hover:underline">
            View all
          </Link>
        </div>
        <div className="card divide-y divide-brand-800 p-0">
          {loading ? (
            <p className="p-5 text-sm text-brand-400">Loading…</p>
          ) : data.requests.length === 0 ? (
            <p className="p-5 text-sm text-brand-400">No requests yet.</p>
          ) : (
            data.requests.slice(0, 5).map((r) => (
              <div key={r.id} className="flex items-center justify-between gap-4 p-4">
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium text-white">
                    {r.name} — <span className="text-brand-300">{r.service}</span>
                  </p>
                  <p className="truncate text-xs text-brand-400">{r.problem}</p>
                </div>
                <div className="shrink-0 text-right">
                  <span
                    className={`badge text-[10px] ${
                      r.status === 'new' ? 'border-accent/40 bg-accent/10 text-accent' : ''
                    }`}
                  >
                    {r.status || 'new'}
                  </span>
                  <p className="mt-1 text-[10px] text-brand-500">{formatDate(r.createdAt)}</p>
                </div>
              </div>
            ))
          )}
        </div>
      </section>
    </div>
  )
}
