import { Link } from 'react-router-dom'
import Icon from '../../components/Icon'
import StateBadge from '../../components/StateBadge'
import { stages, knownGaps } from '../../lib/stages'

export default function Roadmap() {
  const built = stages.filter((s) => s.state === 'built').length

  return (
    <div className="space-y-8">
      <header>
        <p className="eyebrow mb-1">Build state</p>
        <h1 className="text-2xl font-bold text-white">The six stages of the platform</h1>
        <p className="mt-2 max-w-2xl text-sm text-brand-300">
          The internal record of what is actually built. Each stage explains what it is, why it
          exists, what each of the three pieces does for it, what is verified, and what is still
          missing.
        </p>
        <p className="mt-3 max-w-2xl text-sm text-brand-400">
          Keep this true. A roadmap that says “done” when it means “mostly” is the same failure the
          product exists to avoid — it just points inward.
        </p>
      </header>

      {/* Counts, stated as counts rather than a progress bar that implies a date. */}
      <div className="grid gap-4 sm:grid-cols-3">
        <div className="card">
          <p className="text-3xl font-extrabold text-white">{built}</p>
          <p className="mt-1 text-sm text-brand-300">Stages built</p>
        </div>
        <div className="card">
          <p className="text-3xl font-extrabold text-white">{stages.length - built}</p>
          <p className="mt-1 text-sm text-brand-300">Stages not started</p>
        </div>
        <div className="card border-amber-500/30">
          <p className="text-3xl font-extrabold text-amber-200">{knownGaps.length}</p>
          <p className="mt-1 text-sm text-brand-300">Known gaps before a paying customer</p>
        </div>
      </div>

      {/* Stages */}
      <div className="relative space-y-4 border-l border-brand-700 pl-8">
        {stages.map((stage) => (
          <Link
            key={stage.slug}
            to={`/portal/roadmap/${stage.slug}`}
            className="card-hover group relative block"
          >
            <span
              className={`absolute -left-[44px] top-6 grid h-8 w-8 place-items-center rounded-full text-sm font-bold ${
                stage.state === 'not-started'
                  ? 'border border-brand-600 bg-brand-950 text-brand-400'
                  : 'border border-accent/50 bg-brand-950 text-accent'
              }`}
            >
              {stage.id}
            </span>
            <div className="flex items-start justify-between gap-4">
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2.5">
                  <h2 className="text-lg font-semibold text-white">
                    Stage {stage.id} — {stage.name}
                  </h2>
                  <StateBadge state={stage.state} />
                </div>
                <p className="mt-1 text-sm italic text-brand-400">{stage.question}</p>
                <p className="mt-2 text-sm text-brand-300">{stage.purpose}</p>
              </div>
              <Icon
                name="arrow"
                className="mt-1 h-5 w-5 shrink-0 text-brand-500 transition group-hover:text-accent"
              />
            </div>
          </Link>
        ))}
      </div>

      {/* Known gaps */}
      <section>
        <h2 className="mb-4 text-sm font-semibold uppercase tracking-wide text-brand-300">
          Known gaps
        </h2>
        <div className="space-y-3">
          {knownGaps.map((g) => (
            <div key={g.label} className="card border-amber-500/30">
              <p className="flex items-start gap-2.5 font-semibold text-white">
                <Icon name="warn" className="mt-0.5 h-4 w-4 shrink-0 text-amber-300" />
                {g.label}
              </p>
              <p className="mt-2 pl-7 text-sm text-brand-300">{g.text}</p>
              <p className="mt-1.5 pl-7 text-sm text-brand-400">
                <span className="font-medium text-brand-300">Blocks: </span>
                {g.blocks}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
