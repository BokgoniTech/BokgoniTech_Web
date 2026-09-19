import { useParams, Link, Navigate } from 'react-router-dom'
import Icon from '../../components/Icon'
import StateBadge from '../../components/StateBadge'
import { stages, sectionOrder } from '../../lib/stages'

// Sections that are worth reading even when they say "none" — they are the ones
// where an omission would be mistaken for good news.
const HIGHLIGHTED = ['The careful part', 'Known gaps', 'What is verified']

export default function StageDetail() {
  const { slug } = useParams()
  const stage = stages.find((s) => s.slug === slug)
  if (!stage) return <Navigate to="/portal/roadmap" replace />

  const nextStage = stages.find((s) => s.id === stage.id + 1)

  return (
    <div className="space-y-8">
      <Link
        to="/portal/roadmap"
        className="inline-flex items-center gap-2 text-sm text-brand-300 hover:text-accent"
      >
        <Icon name="arrow" className="h-4 w-4 rotate-180" /> Build state
      </Link>

      <header className="card bg-gradient-to-br from-brand-800 to-brand-900">
        <div className="flex flex-wrap items-center gap-3">
          <p className="eyebrow">Stage {stage.id}</p>
          <StateBadge state={stage.state} />
        </div>
        <h1 className="mt-2 text-2xl font-bold text-white">{stage.name}</h1>
        <p className="mt-1 text-lg italic text-brand-300">{stage.question}</p>
        <p className="mt-4 text-brand-200">
          <span className="font-semibold text-white">Purpose: </span>
          {stage.purpose}
        </p>
      </header>

      <div className="grid gap-4 sm:grid-cols-2">
        {sectionOrder
          .filter((key) => stage.sections[key])
          .map((key, i) => {
            const highlighted = HIGHLIGHTED.includes(key)
            return (
              <section
                key={key}
                className={`card ${highlighted ? 'border-accent/40 sm:col-span-2' : ''}`}
              >
                <div className="mb-2 flex items-center gap-2">
                  <span
                    className={`grid h-6 w-6 place-items-center rounded-md text-xs font-bold ${
                      highlighted ? 'bg-accent text-brand-950' : 'bg-accent/10 text-accent'
                    }`}
                  >
                    {i + 1}
                  </span>
                  <h2 className="text-sm font-semibold uppercase tracking-wide text-brand-200">
                    {key}
                  </h2>
                </div>
                <p className="text-sm text-brand-300">{stage.sections[key]}</p>
              </section>
            )
          })}
      </div>

      {nextStage && (
        <Link
          to={`/portal/roadmap/${nextStage.slug}`}
          className="card-hover flex items-center justify-between"
        >
          <div>
            <p className="text-xs uppercase tracking-wide text-brand-400">Next stage</p>
            <p className="mt-1 font-semibold text-white">
              Stage {nextStage.id} — {nextStage.name}
            </p>
          </div>
          <Icon name="arrow" className="h-5 w-5 text-accent" />
        </Link>
      )}
    </div>
  )
}
