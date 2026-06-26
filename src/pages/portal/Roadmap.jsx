import { Link } from 'react-router-dom'
import Icon from '../../components/Icon'
import { phases } from '../../lib/phases'

export default function Roadmap() {
  return (
    <div className="space-y-8">
      <header>
        <p className="eyebrow mb-1">Business Roadmap</p>
        <h1 className="text-2xl font-bold text-white">The five phases of Bokgoni Tech</h1>
        <p className="mt-2 max-w-2xl text-sm text-brand-300">
          This is the internal operating manual — how the business grows from device repair to
          full automation. Each phase explains the what, why, who, how, risks and what success
          looks like.
        </p>
      </header>

      <div className="relative space-y-4 border-l border-brand-700 pl-8">
        {phases.map((phase) => (
          <Link
            key={phase.slug}
            to={`/portal/roadmap/${phase.slug}`}
            className="card-hover group relative block"
          >
            <span className="absolute -left-[44px] top-6 grid h-8 w-8 place-items-center rounded-full border border-accent/50 bg-brand-950 text-sm font-bold text-accent">
              {phase.id}
            </span>
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="text-lg font-semibold text-white">
                  Phase {phase.id} — {phase.name}
                </h2>
                <p className="mt-1 text-sm text-brand-300">{phase.purpose}</p>
              </div>
              <Icon
                name="arrow"
                className="mt-1 h-5 w-5 shrink-0 text-brand-500 transition group-hover:text-accent"
              />
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
