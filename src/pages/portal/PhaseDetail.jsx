import { useParams, Link, Navigate } from 'react-router-dom'
import Icon from '../../components/Icon'
import { phases, sectionOrder } from '../../lib/phases'

export default function PhaseDetail() {
  const { slug } = useParams()
  const phase = phases.find((p) => p.slug === slug)
  if (!phase) return <Navigate to="/portal/roadmap" replace />

  const nextPhase = phases.find((p) => p.id === phase.id + 1)

  return (
    <div className="space-y-8">
      <Link
        to="/portal/roadmap"
        className="inline-flex items-center gap-2 text-sm text-brand-300 hover:text-accent"
      >
        <Icon name="arrow" className="h-4 w-4 rotate-180" /> Business Roadmap
      </Link>

      <header className="card bg-gradient-to-br from-brand-800 to-brand-900">
        <p className="eyebrow mb-2">Phase {phase.id}</p>
        <h1 className="text-2xl font-bold text-white">{phase.name}</h1>
        <p className="mt-3 text-brand-200">
          <span className="font-semibold text-white">Purpose: </span>
          {phase.purpose}
        </p>
      </header>

      <div className="grid gap-4 sm:grid-cols-2">
        {sectionOrder
          .filter((key) => phase.sections[key])
          .map((key, i) => (
            <section key={key} className="card">
              <div className="mb-2 flex items-center gap-2">
                <span className="grid h-6 w-6 place-items-center rounded-md bg-accent/10 text-xs font-bold text-accent">
                  {i + 1}
                </span>
                <h2 className="text-sm font-semibold uppercase tracking-wide text-brand-200">
                  {key}
                </h2>
              </div>
              <p className="text-sm text-brand-300">{phase.sections[key]}</p>
            </section>
          ))}
      </div>

      {nextPhase && (
        <Link to={`/portal/roadmap/${nextPhase.slug}`} className="card-hover flex items-center justify-between">
          <div>
            <p className="text-xs uppercase tracking-wide text-brand-400">Next phase</p>
            <p className="mt-1 font-semibold text-white">
              Phase {nextPhase.id} — {nextPhase.name}
            </p>
          </div>
          <Icon name="arrow" className="h-5 w-5 text-accent" />
        </Link>
      )}
    </div>
  )
}
