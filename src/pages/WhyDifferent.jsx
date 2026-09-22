import { Link } from 'react-router-dom'
import PageHeader from '../components/PageHeader'
import Icon from '../components/Icon'
import {
  rule,
  ruleProblem,
  rulePractice,
  ruleLayers,
  ruleLayersNote,
  rulePayoff,
} from '../lib/siteConfig'

export default function WhyDifferent() {
  return (
    <>
      <PageHeader
        eyebrow="What makes it different"
        title="One rule, applied everywhere"
        subtitle="Not a feature — a discipline, in every layer."
      />

      {/* ------------------------------ The rule ---------------------------- */}
      <section className="section">
        <div className="container-bt">
          <blockquote className="mx-auto max-w-3xl border-l-2 border-accent bg-brand-900/40 px-6 py-6 text-2xl font-bold leading-snug text-white sm:px-8 sm:text-3xl">
            {rule}
          </blockquote>
          <p className="mx-auto mt-6 max-w-3xl text-brand-300">
            That sounds obvious. Almost no monitoring tool actually does it, and the gap is where the
            failures live.
          </p>
        </div>
      </section>

      {/* --------------------------- The problem ---------------------------- */}
      <section className="section border-t border-brand-800/70 bg-brand-900/30">
        <div className="container-bt">
          <div className="mb-10 max-w-2xl">
            <p className="eyebrow mb-3">The problem it solves</p>
            <h2 className="text-3xl font-bold text-white">
              Two different facts, reported identically.
            </h2>
            <p className="mt-4 text-brand-300">{ruleProblem.intro}</p>
          </div>

          <div className="grid gap-5 lg:grid-cols-2">
            {ruleProblem.cases.map((c, i) => (
              <div key={c} className="card">
                <div className="flex items-start gap-4">
                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-brand-800 font-mono text-sm font-bold text-brand-200">
                    {i + 1}
                  </span>
                  <div>
                    <p className="font-semibold text-white">{c}</p>
                    <p className="mt-2 text-sm text-brand-400">
                      {i === 0
                        ? 'Sends you to fix a machine.'
                        : 'Sends you to fix your monitoring.'}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <p className="mt-8 max-w-3xl text-brand-300">{ruleProblem.outro}</p>
          <p className="mt-4 max-w-3xl font-semibold text-white">
            That is the failure this product is built to avoid.
          </p>
        </div>
      </section>

      {/* ----------------------- What it looks like -------------------------- */}
      <section className="section border-t border-brand-800/70">
        <div className="container-bt">
          <div className="mb-10 max-w-2xl">
            <p className="eyebrow mb-3">What it looks like in practice</p>
            <h2 className="text-3xl font-bold text-white">Six places you can check us on.</h2>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            {rulePractice.map((p) => (
              <div key={p.label} className="card">
                <p className="flex items-start gap-2.5 font-semibold text-white">
                  <Icon name="check" className="mt-1 h-4 w-4 shrink-0 text-accent" />
                  {p.label}
                </p>
                <p className="mt-2 pl-[26px] text-sm text-brand-300">{p.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --------------------- Why it is hard to add later ------------------- */}
      <section className="section border-t border-brand-800/70 bg-brand-900/30">
        <div className="container-bt grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <p className="eyebrow mb-3">Why this is hard to add later</p>
            <h2 className="text-3xl font-bold text-white">
              It is a decision at every layer, made the same way.
            </h2>
            <p className="mt-4 text-brand-300">{ruleLayersNote}</p>
          </div>

          <div className="lg:col-span-7">
            <div className="overflow-hidden rounded-2xl border border-brand-700/70">
              {ruleLayers.map((l, i) => (
                <div
                  key={l.layer}
                  className={`flex flex-col gap-1 px-5 py-4 sm:flex-row sm:items-baseline sm:gap-4 ${
                    i > 0 ? 'border-t border-brand-800' : ''
                  }`}
                >
                  <p className="w-40 shrink-0 font-semibold text-white">{l.layer}</p>
                  <p className="text-sm text-brand-300">{l.must}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* --------------------------- What it buys ---------------------------- */}
      <section className="section border-t border-brand-800/70">
        <div className="container-bt">
          <div className="card mx-auto max-w-3xl border-l-2 border-l-accent">
            <p className="eyebrow mb-3">{rulePayoff.title}</p>
            <p className="text-brand-200">{rulePayoff.body}</p>
          </div>

          <div className="card mt-10 flex flex-col items-center justify-between gap-4 text-center sm:flex-row sm:text-left">
            <p className="text-brand-200">
              A month on a real fleet is the only thing that settles it. That is what a pilot is
              for.
            </p>
            <div className="flex shrink-0 gap-3">
              <Link to="/who-its-for" className="btn-secondary">
                Who it&apos;s for
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
