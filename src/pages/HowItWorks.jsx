import { Link } from 'react-router-dom'
import PageHeader from '../components/PageHeader'
import Icon from '../components/Icon'
import { howItWorks, requirements } from '../lib/siteConfig'

/**
 * How it works, for somebody buying it.
 *
 * Deliberately not architecture. There are three moving parts and they are
 * interesting to build, but a customer is not buying a diagram — they are
 * buying the fact that a machine in another building shows up on a page and
 * can be acted on from there.
 *
 * Putting the internals on a sales page also invites the wrong conversation:
 * it asks a visitor to evaluate our design decisions rather than whether the
 * product solves their problem. The technical account still exists, in the
 * platform's own documentation, where the people who need it will look.
 */
export default function HowItWorks() {
  return (
    <>
      <PageHeader
        eyebrow="How it works"
        title="Four steps, then it runs itself"
        subtitle="What using it actually looks like, from installing it on the first machine to fixing something without leaving your desk."
      />

      {/* ------------------------------ The steps --------------------------- */}
      <section className="section">
        <div className="container-bt">
          <div className="space-y-5">
            {howItWorks.map((s, i) => (
              <div key={s.step} className="card">
                <div className="grid gap-5 sm:grid-cols-12 sm:items-start">
                  <div className="flex items-center gap-4 sm:col-span-4">
                    <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-accent/10 text-accent">
                      <Icon name={s.icon} className="h-6 w-6" />
                    </span>
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wide text-brand-400">
                        Step {i + 1}
                      </p>
                      <h2 className="text-lg font-semibold text-white">{s.step}</h2>
                    </div>
                  </div>

                  <div className="sm:col-span-8">
                    <p className="text-brand-300">{s.body}</p>
                    <p className="mt-2 inline-flex items-start gap-2 text-sm text-brand-400">
                      <Icon name="check" className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                      {s.detail}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --------------------------- What it needs -------------------------- */}
      <section className="section border-t border-brand-800/70 bg-brand-900/30">
        <div className="container-bt">
          <div className="mb-10 max-w-2xl">
            <p className="eyebrow mb-3">What it asks of you</p>
            <h2 className="text-3xl font-bold text-white">A short list, on purpose.</h2>
          </div>

          <div className="grid gap-5 lg:grid-cols-3">
            {requirements.map((r) => (
              <div key={r.label} className="card">
                <h3 className="font-semibold text-white">{r.label}</h3>
                <p className="mt-2 text-sm text-brand-300">{r.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ------------------------------- CTA -------------------------------- */}
      <section className="section border-t border-brand-800/70">
        <div className="container-bt">
          <div className="card flex flex-col items-center justify-between gap-4 text-center sm:flex-row sm:text-left">
            <p className="text-brand-200">
              We set the first machines up with you, so the start is a conversation rather than a
              download.
            </p>
            <div className="flex shrink-0 gap-3">
              <Link to="/product" className="btn-secondary">
                What it does
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
