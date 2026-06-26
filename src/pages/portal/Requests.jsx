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
        <p className="eyebrow mb-1">Service Requests</p>
        <h1 className="text-2xl font-bold text-white">Incoming enquiries</h1>
        <p className="mt-1 text-sm text-brand-400">
          Submitted through the public request form. Contact details are private to staff.
        </p>
      </header>

      {!isFirebaseConfigured && <NotConfigured feature="Service requests" />}

      {loading ? (
        <p className="text-sm text-brand-400">Loading…</p>
      ) : requests.length === 0 ? (
        <div className="card border-dashed py-12 text-center text-brand-400">
          No requests yet. They’ll appear here as customers submit the form.
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
                    {r.name}
                    {r.businessName ? ` · ${r.businessName}` : ''}
                  </p>
                  <p className="truncate text-sm text-brand-300">
                    {r.service} — {r.problem}
                  </p>
                </div>
                <div className="flex shrink-0 items-center gap-3">
                  <span className="badge text-[10px]">{r.status || 'new'}</span>
                  <Icon
                    name="arrow"
                    className={`h-4 w-4 text-brand-400 transition ${expanded === r.id ? '-rotate-90' : 'rotate-90'}`}
                  />
                </div>
              </button>

              {expanded === r.id && (
                <div className="space-y-3 border-t border-brand-800 p-4 text-sm">
                  <div className="grid gap-3 sm:grid-cols-2">
                    <Detail label="Phone" value={r.phone} />
                    <Detail label="Email" value={r.email} />
                    <Detail label="Preferred contact" value={r.preferredContact} />
                    <Detail label="Device / system" value={r.systemType} />
                    {r.deviceBrand && <Detail label="Device brand" value={r.deviceBrand} />}
                    {r.deviceModel && <Detail label="Device model" value={r.deviceModel} />}
                    {r.problemType && <Detail label="Problem type" value={r.problemType} />}
                    {r.openedBefore && <Detail label="Opened before?" value={r.openedBefore} />}
                    {r.powersOn && <Detail label="Powers on?" value={r.powersOn} />}
                    {r.screenDisplays && <Detail label="Screen displays?" value={r.screenDisplays} />}
                    <Detail label="Submitted" value={formatDate(r.createdAt)} />
                  </div>
                  <Detail label="Problem description" value={r.problem} block />

                  {r.photos?.length > 0 && (
                    <div>
                      <p className="mb-2 text-xs uppercase tracking-wide text-brand-400">Photos</p>
                      <div className="flex flex-wrap gap-2">
                        {r.photos.map((url, i) => (
                          <a key={i} href={url} target="_blank" rel="noreferrer">
                            <img src={url} alt="" className="h-20 w-20 rounded-lg object-cover" />
                          </a>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="flex flex-wrap gap-2 pt-2">
                    {r.phone && (
                      <a href={`tel:${r.phone}`} className="btn-secondary">
                        <Icon name="phone" className="h-4 w-4" /> Call
                      </a>
                    )}
                    <a
                      href={`https://wa.me/${(r.phone || '').replace(/\D/g, '')}`}
                      target="_blank"
                      rel="noreferrer"
                      className="btn-secondary"
                    >
                      <Icon name="whatsapp" className="h-4 w-4" /> WhatsApp
                    </a>
                    {r.email && (
                      <a href={`mailto:${r.email}`} className="btn-secondary">
                        <Icon name="mail" className="h-4 w-4" /> Email
                      </a>
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
      <p className="mt-0.5 text-brand-100">{value}</p>
    </div>
  )
}
