import { useEffect, useState } from 'react'
import PageHeader from '../components/PageHeader'
import NotConfigured from '../components/NotConfigured'
import Icon from '../components/Icon'
import { changelogAreas } from '../lib/siteConfig'
import { getPublicChangelog, formatDate } from '../lib/db'
import { isFirebaseConfigured } from '../lib/firebase'

export default function Changelog() {
  const [filter, setFilter] = useState('all')
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(isFirebaseConfigured)

  useEffect(() => {
    if (!isFirebaseConfigured) return
    let active = true
    setLoading(true)
    getPublicChangelog(filter === 'all' ? {} : { area: filter })
      .then((data) => {
        if (active) setItems(data)
      })
      .catch((err) => {
        console.error(err)
        if (active) setItems([])
      })
      .finally(() => {
        if (active) setLoading(false)
      })
    return () => {
      active = false
    }
  }, [filter])

  return (
    <>
      <PageHeader
        eyebrow="Changelog"
        title="What shipped, and when"
        subtitle="A record of real work on the agent, the backend and the dashboard. Nothing is listed here before it works."
      />

      <section className="section">
        <div className="container-bt">
          {!isFirebaseConfigured && (
            <div className="mb-8">
              <NotConfigured feature="The changelog" />
            </div>
          )}

          {/* Filters */}
          <div className="mb-8 flex flex-wrap gap-2">
            <FilterChip active={filter === 'all'} onClick={() => setFilter('all')}>
              All
            </FilterChip>
            {changelogAreas.map((a) => (
              <FilterChip key={a.value} active={filter === a.value} onClick={() => setFilter(a.value)}>
                {a.label}
              </FilterChip>
            ))}
          </div>

          {loading ? (
            <div className="space-y-4">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="card h-32 animate-pulse bg-brand-900/40" />
              ))}
            </div>
          ) : items.length === 0 ? (
            <div className="card border-dashed py-16 text-center">
              <p className="text-brand-300">
                {isFirebaseConfigured
                  ? 'Nothing published here yet. Entries appear as work ships.'
                  : 'Once Firebase is connected and entries are published, they’ll appear here.'}
              </p>
              <p className="mx-auto mt-3 max-w-lg text-sm text-brand-500">
                An empty list here means nothing has been published — not that nothing has been
                built. What is built is on the status page.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {items.map((item) => (
                <ChangelogEntry key={item.id} item={item} />
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  )
}

function FilterChip({ active, onClick, children }) {
  return (
    <button
      onClick={onClick}
      className={`rounded-full border px-4 py-2 text-sm font-medium transition ${
        active
          ? 'border-accent bg-accent/15 text-white'
          : 'border-brand-700 text-brand-300 hover:border-brand-500'
      }`}
    >
      {children}
    </button>
  )
}

function ChangelogEntry({ item }) {
  const areaLabel = changelogAreas.find((a) => a.value === item.area)?.label || item.area

  return (
    <article className="card">
      <div className="flex flex-wrap items-center gap-2">
        <span className="badge text-[10px]">{areaLabel}</span>
        {item.version && (
          <span className="badge border-accent/40 bg-accent/10 font-mono text-[10px] text-accent">
            {item.version}
          </span>
        )}
        {item.state && <span className="badge text-[10px]">{item.state}</span>}
        <span className="ml-auto text-xs text-brand-500">{formatDate(item.date)}</span>
      </div>

      <h2 className="mt-3 text-lg font-semibold text-white">{item.title}</h2>

      {item.summary && <p className="mt-2 text-brand-300">{item.summary}</p>}

      {item.detail && (
        <p className="mt-3 text-sm text-brand-300">
          <span className="font-medium text-brand-200">What changed: </span>
          {item.detail}
        </p>
      )}

      {item.why && (
        <p className="mt-2 text-sm text-brand-300">
          <span className="font-medium text-brand-200">Why it matters: </span>
          {item.why}
        </p>
      )}

      {item.images?.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-2">
          {item.images.map((url, i) => (
            <a key={i} href={url} target="_blank" rel="noreferrer" className="group relative">
              <img
                src={url}
                alt=""
                loading="lazy"
                className="h-24 rounded-lg border border-brand-700 object-cover transition group-hover:border-accent/60"
              />
              <span className="absolute bottom-1 right-1 rounded bg-brand-950/80 p-1 text-brand-200">
                <Icon name="arrow" className="h-3 w-3" />
              </span>
            </a>
          ))}
        </div>
      )}
    </article>
  )
}
