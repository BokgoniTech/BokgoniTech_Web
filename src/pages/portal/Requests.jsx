import { useEffect, useState } from 'react'
import Icon from '../../components/Icon'
import NotConfigured from '../../components/NotConfigured'
import { getRequests, formatDate } from '../../lib/db'
import { isFirebaseConfigured } from '../../lib/firebase'

export default function Requests() {
  const [requests, setRequests] = useState([])
  const [loading, setLoading] = useState(isFirebaseConfigured)
  const [expanded, setExpanded] = useState(null)

  useEffect(() => {
    if (!isFirebaseConfigured) return
    let active = true
    getRequests()
      .then((data) => active && setRequests(data))
      .catch(console.error)
      .finally(() => active && setLoading(false))
    return () => {
      active = false
    }
  }, [])

  return (
    <div className="space-y-6">
      <header>
        <p className="eyebrow mb-1">Pilot requests</p>
        <h1 className="text-2xl font-bold text-white">Incoming enquiries</h1>
        <p className="mt-1 text-sm text-brand-400">
          Submitted through the public pilot form. Contact details are private to staff.
        </p>
      </header>

      {!isFirebaseConfigured && <NotConfigured feature="Pilot requests" />}

      {loading ? (
        <p className="text-sm text-brand-400">Loading…</p>
      ) : requests.length === 0 ? (
        <div className="card border-dashed py-12 text-center text-brand-400">
          No requests yet. They’ll appear here as the form is submitted.
        </div>
      ) : (
        <div className="space-y-3">
          {requests.map((r) => (
            <div key={r.id} className="card p-0">
              <button
                onClick={() => setExpanded(expanded === r.id ? null : r.id)}
                className="flex w-full items-center justify-between gap-4 p-4 text-left"
              >
                <div className="min-w-0">
                  <p className="truncate font-medium text-white">
                    {r.organisation || 'Unnamed organisation'}
                    {r.name ? ` · ${r.name}` : ''}
                  </p>
                  <p className="truncate text-sm text-brand-300">
                    {[r.fleetSize, r.needToAnswer].filter(Boolean).join(' — ')}
                  </p>
                </div>
                <div className="flex shrink-0 items-center gap-3">
                  <span
                    className={`badge text-[10px] ${
                      (r.status || 'new') === 'new' ? 'border-accent/40 bg-accent/10 text-accent' : ''
                    }`}
                  >
                    {r.status || 'new'}
                  </span>
                  <Icon
                    name="arrow"
                    className={`h-4 w-4 text-brand-400 transition ${
                      expanded === r.id ? '-rotate-90' : 'rotate-90'
                    }`}
                  />
                </div>
              </button>

              {expanded === r.id && (
                <div className="space-y-3 border-t border-brand-800 p-4 text-sm">
                  <div className="grid gap-3 sm:grid-cols-2">
                    <Detail label="Contact name" value={r.name} />
                    <Detail label="Email" value={r.email} />
                    <Detail label="Phone" value={r.phone} />
                    <Detail label="Preferred contact" value={r.preferredContact} />
                    <Detail label="Closest description" value={r.role} />
                    <Detail label="Windows machines" value={r.fleetSize} />
                    <Detail label="Uses today" value={r.currentTool} />
                    <Detail label="Submitted" value={formatDate(r.createdAt)} />
                  </div>
                  <Detail label="Question they need answered" value={r.needToAnswer} block />

                  {/* Repair-era submissions, if any are still in the collection. */}
                  {(r.service || r.problem) && (
                    <div className="rounded-lg border border-brand-700 bg-brand-950/40 p-3">
                      <p className="mb-2 text-xs uppercase tracking-wide text-brand-400">
                        Legacy service-request fields
                      </p>
                      <div className="grid gap-3 sm:grid-cols-2">
                        <Detail label="Service" value={r.service} />
                        <Detail label="Device / system" value={r.systemType} />
                        <Detail label="Problem" value={r.problem} block />
                      </div>
                    </div>
                  )}

                  <div className="flex flex-wrap gap-2 pt-2">
                    {r.email && (
                      <a href={`mailto:${r.email}`} className="btn-secondary">
                        <Icon name="mail" className="h-4 w-4" /> Email
                      </a>
                    )}
                    {r.phone && (
                      <>
                        <a href={`tel:${r.phone}`} className="btn-secondary">
                          <Icon name="phone" className="h-4 w-4" /> Call
                        </a>
                        <a
                          href={`https://wa.me/${r.phone.replace(/\D/g, '')}`}
                          target="_blank"
                          rel="noreferrer"
                          className="btn-secondary"
                        >
                          <Icon name="whatsapp" className="h-4 w-4" /> WhatsApp
                        </a>
                      </>
                    )}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

function Detail({ label, value, block }) {
  if (!value) return null
  return (
    <div className={block ? 'sm:col-span-2' : ''}>
      <p className="text-xs uppercase tracking-wide text-brand-400">{label}</p>
      <p className="mt-0.5 whitespace-pre-line text-brand-100">{value}</p>
    </div>
  )
}
