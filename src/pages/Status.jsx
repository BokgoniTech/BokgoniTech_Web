import { Link } from 'react-router-dom'
import PageHeader from '../components/PageHeader'
import Icon from '../components/Icon'
import StateBadge from '../components/StateBadge'
import { buildState, questions, rule } from '../lib/siteConfig'

export default function Status() {
  return (
    <>
      <PageHeader
        eyebrow="Where it actually is"
        title="What is built, and what is not"
        subtitle={buildState.summary}
      >
        <p className="max-w-2xl text-sm text-brand-400">
          The product’s rule is “{rule.toLowerCase().replace(/\.$/, '')}”. It would be strange to
          apply that to your machines and not to this page.
        </p>
      </PageHeader>

      {/* ------------------------ Stage-by-stage state ---------------------- */}
      <section className="section">
        <div className="container-bt">
          <div className="mb-8 max-w-2xl">
            <p className="eyebrow mb-3">The six stages</p>
            <h2 className="text-3xl font-bold text-white">Five built, one not started.</h2>
          </div>

          <div className="overflow-hidden rounded-2xl border border-brand-700/70">
            {questions.map((q, i) => (
              <div
                key={q.slug}
                className={`flex flex-col gap-3 p-5 sm:flex-row sm:items-center sm:gap-5 ${
                  i > 0 ? 'border-t border-brand-800' : ''
                } ${q.state === 'not-started' ? 'bg-brand-950/60' : ''}`}
              >
                <span className="w-6 shrink-0 font-mono text-sm text-brand-500">{i + 1}</span>
                <span
                  className={`grid h-10 w-10 shrink-0 place-items-center rounded-xl ${
                    q.state === 'not-started'
                      ? 'bg-brand-800/60 text-brand-400'
                      : 'bg-accent/10 text-accent'
                  }`}
                >
                  <Icon name={q.icon} className="h-5 w-5" />
                </span>
                <div className="min-w-0 flex-1">
                  <p
                    className={`font-semibold ${
                      q.state === 'not-started' ? 'text-brand-300' : 'text-white'
                    }`}
                  >
                    {q.question}
                  </p>
                  <p className="mt-0.5 text-sm text-brand-400">{q.answer}</p>
                </div>
                <StateBadge state={q.state} className="shrink-0 self-start sm:self-center" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ------------------------------- Done -------------------------------- */}
      <section className="section border-t border-brand-800/70 bg-brand-900/30">
        <div className="container-bt grid gap-8 lg:grid-cols-2">
          <div>
            <p className="eyebrow mb-3">Built, working, and running against a real machine</p>
            <h2 className="mb-6 text-2xl font-bold text-white">Done</h2>
            <ul className="space-y-3">
              {buildState.done.map((d) => (
                <li key={d} className="flex items-start gap-3 rounded-xl border border-green-500/25 bg-green-500/5 px-5 py-4">
                  <Icon name="check" className="mt-0.5 h-5 w-5 shrink-0 text-green-400" />
                  <span className="text-sm text-brand-100">{d}</span>
                </li>
              ))}
            </ul>
            <p className="mt-5 text-sm text-brand-400">
              Nothing here is a prototype. “Verified” means an update was actually installed on an
              actual computer and the result matched what the dashboard said.
            </p>
          </div>

          <div>
            <p className="eyebrow mb-3 text-amber-300">
              Three known gaps before a paying customer
            </p>
            <h2 className="mb-6 text-2xl font-bold text-white">Not done</h2>
            <ul className="space-y-3">
              {buildState.gaps.map((g) => (
                <li
                  key={g.label}
                  className="rounded-xl border border-amber-500/25 bg-amber-500/5 px-5 py-4"
                >
                  <p className="flex items-start gap-3 font-semibold text-white">
                    <Icon name="warn" className="mt-0.5 h-5 w-5 shrink-0 text-amber-300" />
                    {g.label}
                  </p>
                  <p className="mt-2 pl-8 text-sm text-brand-300">{g.text}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* -------------------------- Built but hidden ------------------------- */}
      <section className="section border-t border-brand-800/70">
        <div className="container-bt">
          <div className="card mx-auto max-w-3xl">
            <div className="flex flex-wrap items-center gap-3">
              <p className="eyebrow">One thing that exists but is switched off</p>
              <StateBadge state="built-hidden" />
            </div>
            <h2 className="mt-4 text-xl font-bold text-white">{buildState.switchedOff.label}</h2>
            <p className="mt-3 text-brand-300">{buildState.switchedOff.text}</p>
          </div>

          <div className="card mt-10 flex flex-col items-center justify-between gap-4 text-center sm:flex-row sm:text-left">
            <p className="text-brand-200">
              What shipped, and when, is recorded as it happens.
            </p>
            <div className="flex shrink-0 gap-3">
              <Link to="/changelog" className="btn-secondary">
                Changelog
              </Link>
              <Link to="/pilot" className="btn-primary">
                Request a pilot
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
