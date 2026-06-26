import { useEffect, useState } from 'react'
import PageHeader from '../components/PageHeader'
import NotConfigured from '../components/NotConfigured'
import { activityCategories } from '../lib/siteConfig'
import { getPublicActivity, formatDate } from '../lib/db'
import { isFirebaseConfigured } from '../lib/firebase'

export default function ActivityLog() {
  const [filter, setFilter] = useState('all')
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(isFirebaseConfigured)

  useEffect(() => {
    if (!isFirebaseConfigured) return
    let active = true
    setLoading(true)
    getPublicActivity(filter === 'all' ? {} : { category: filter })
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
        eyebrow="Activity Log"
        title="Real work, recorded"
        subtitle="A transparent record of repairs, IT jobs, security improvements and projects. Customer details are kept private — we only publish what proves the work."
      />

      <section className="section">
        <div className="container-bt">
          {!isFirebaseConfigured && (
            <div className="mb-8">
              <NotConfigured feature="The activity log" />
            </div>
          )}

          {/* Filters */}
          <div className="mb-8 flex flex-wrap gap-2">
            <FilterChip active={filter === 'all'} onClick={() => setFilter('all')}>
              All
            </FilterChip>
            {activityCategories.map((c) => (
              <FilterChip key={c.value} active={filter === c.value} onClick={() => setFilter(c.value)}>
                {c.label}
              </FilterChip>
            ))}
          </div>

          {loading ? (
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="card h-64 animate-pulse bg-brand-900/40" />
              ))}
            </div>
          ) : items.length === 0 ? (
            <div className="card border-dashed py-16 text-center">
              <p className="text-brand-300">
                {isFirebaseConfigured
                  ? 'No public entries yet. As work is completed and published, it will appear here.'
                  : 'Once Firebase is connected and entries are published, they’ll appear here.'}
              </p>
            </div>
          ) : (
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {items.map((item) => (
                <ActivityCard key={item.id} item={item} />
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

function ActivityCard({ item }) {
  const categoryLabel =
    activityCategories.find((c) => c.value === item.category)?.label || item.category
  const beforeImg = item.imagesBefore?.[0]
  const afterImg = item.imagesAfter?.[0]

  return (
    <article className="card-hover flex flex-col">
      {(beforeImg || afterImg) && (
        <div className="-mx-6 -mt-6 mb-4 grid grid-cols-2 gap-px overflow-hidden rounded-t-2xl bg-brand-800">
          <ImageTile src={beforeImg} label="Before" />
          <ImageTile src={afterImg} label="After" />
        </div>
      )}

      <div className="flex items-center gap-2">
        <span className="badge text-[10px]">{categoryLabel}</span>
        {item.status && (
          <span className="badge border-green-500/40 bg-green-500/10 text-[10px] text-green-200">
            {item.status}
          </span>
        )}
      </div>

      <h3 className="mt-3 font-semibold text-white">{item.title}</h3>

      {item.deviceType && (
        <p className="mt-1 text-xs text-brand-400">Device/system: {item.deviceType}</p>
      )}

      <div className="mt-3 space-y-2 text-sm">
        {item.problem && <Field label="Problem" value={item.problem} />}
        {item.work && <Field label="Work completed" value={item.work} />}
        {item.after && <Field label="Condition after" value={item.after} />}
      </div>

      <p className="mt-4 text-xs text-brand-500">{formatDate(item.date)}</p>
    </article>
  )
}

function ImageTile({ src, label }) {
  return (
    <div className="relative aspect-[4/3] bg-brand-900">
      {src ? (
        <img src={src} alt={label} className="h-full w-full object-cover" loading="lazy" />
      ) : (
        <div className="grid h-full place-items-center text-xs text-brand-500">{label}</div>
      )}
      <span className="absolute left-2 top-2 rounded bg-brand-950/80 px-1.5 py-0.5 text-[10px] font-medium text-brand-200">
        {label}
      </span>
    </div>
  )
}

function Field({ label, value }) {
  return (
    <p className="text-brand-300">
      <span className="font-medium text-brand-200">{label}: </span>
      {value}
    </p>
  )
}
