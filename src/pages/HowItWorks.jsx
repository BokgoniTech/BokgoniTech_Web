import { Link } from 'react-router-dom'
import PageHeader from '../components/PageHeader'
import Icon from '../components/Icon'
import {
  pieces,
  commandLifecycle,
  commandLifecycleNotes,
  longJobs,
  stack,
  stackNote,
} from '../lib/siteConfig'

export default function HowItWorks() {
  return (
    <>
      <PageHeader
        eyebrow="How it works"
        title="Three pieces. You only ever see one of them."
        subtitle="The agent on each machine, the backend on your server, the dashboard in your browser."
      />

      {/* --------------------------- The diagram ---------------------------- */}
      <section className="section">
        <div className="container-bt">
          <div className="grid gap-4 lg:grid-cols-3">
            {pieces.map((p, i) => (
              <div key={p.slug} className="relative">
                <div className="card h-full">
                  <p className="text-xs uppercase tracking-[0.18em] text-brand-400">{p.where}</p>
                  <div className="mt-4 flex items-center gap-3">
                    <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-accent/10 text-accent">
                      <Icon name={p.icon} className="h-6 w-6" />
                    </span>
                    <h2 className="text-lg font-bold text-white">{p.name}</h2>
                  </div>
                  <p className="mt-4 text-sm text-brand-300">{p.body}</p>

                  <div className="mt-5 space-y-4 border-t border-brand-800 pt-5">
                    {p.points.map((pt) => (
                      <div key={pt.label}>
                        <p className="text-sm font-semibold text-white">{pt.label}</p>
                        <p className="mt-1 text-sm text-brand-300">{pt.text}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Flow arrow between cards — horizontal on desktop, vertical stacked. */}
                {i < pieces.length - 1 && (
                  <div
                    className="flex justify-center py-2 text-brand-600 lg:absolute lg:-right-5 lg:top-1/2 lg:z-10 lg:-translate-y-1/2 lg:py-0"
                    aria-hidden="true"
                  >
                    <span className="grid h-8 w-8 place-items-center rounded-full border border-brand-700 bg-brand-950">
                      <Icon name="arrow" className="h-4 w-4 rotate-90 lg:rotate-0" />
                    </span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ------------------------ A command's journey ----------------------- */}
      <section className="section border-t border-brand-800/70 bg-brand-900/30">
        <div className="container-bt grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <p className="eyebrow mb-3">How a command actually travels</p>
            <h2 className="text-3xl font-bold text-white">Worth following once.</h2>
            <p className="mt-4 text-brand-300">
              It explains why the audit trail is trustworthy — which is the part of a remote-action
              tool you either believe or you do not.
            </p>

            <div className="mt-8 space-y-4">
              {commandLifecycleNotes.map((n) => (
                <div key={n.label} className="card">
                  <p className="font-semibold text-white">{n.label}</p>
                  <p className="mt-1.5 text-sm text-brand-300">{n.text}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-7">
            <ol className="relative space-y-5 border-l border-brand-700 pl-8">
              {commandLifecycle.map((step, i) => (
                <li key={i} className="relative">
                  <span
                    className={`absolute -left-[41px] grid h-7 w-7 place-items-center rounded-full text-xs font-bold ${
                      step.emphasis
                        ? 'border border-accent bg-accent text-brand-950'
                        : 'border border-accent/50 bg-brand-950 text-accent'
                    }`}
                  >
                    {i + 1}
                  </span>
                  <div
                    className={
                      step.emphasis
                        ? 'rounded-xl border border-accent/40 bg-accent/5 px-4 py-3'
                        : 'px-1'
                    }
                  >
                    <p className="text-sm text-brand-200">
                      <span className="font-semibold text-white">{step.actor}</span> {step.text}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* ---------------------------- Long jobs ----------------------------- */}
      <section className="section border-t border-brand-800/70">
        <div className="container-bt grid gap-8 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <p className="eyebrow mb-3">Patching, specifically</p>
            <h2 className="text-3xl font-bold text-white">{longJobs.title}</h2>
          </div>
          <div className="lg:col-span-7">
            <p className="text-brand-300">{longJobs.body}</p>
            <p className="mt-5 flex gap-2.5 rounded-lg border border-brand-700 bg-brand-900/50 px-4 py-3 text-sm text-brand-200">
              <Icon name="warn" className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
              {longJobs.note}
            </p>
          </div>
        </div>
      </section>

      {/* ------------------------ What it is built from ---------------------- */}
      <section className="section border-t border-brand-800/70">
        <div className="container-bt">
          <div className="mb-8 max-w-2xl">
            <p className="eyebrow mb-3">What it is built from</p>
            <h2 className="text-3xl font-bold text-white">No surprises in the stack.</h2>
          </div>

          <div className="overflow-hidden rounded-2xl border border-brand-700/70">
            <table className="w-full text-left text-sm">
              <thead className="bg-brand-900/60 text-brand-200">
                <tr>
                  <th className="px-6 py-4 font-semibold">Piece</th>
                  <th className="px-6 py-4 font-semibold">Built with</th>
                  <th className="px-6 py-4 font-semibold">Why</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-brand-800">
                {stack.map((row) => (
                  <tr key={row.piece} className="hover:bg-brand-900/40">
                    <td className="px-6 py-4 font-semibold text-white">{row.piece}</td>
                    <td className="px-6 py-4 text-brand-100">{row.builtWith}</td>
                    <td className="px-6 py-4 text-brand-300">{row.why}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className="mt-5 text-sm text-brand-400">{stackNote}</p>

          <div className="card mt-10 flex flex-col items-center justify-between gap-4 text-center sm:flex-row sm:text-left">
            <p className="text-brand-200">
              The careful part of all this is a discipline, not a feature.
            </p>
            <Link to="/why-different" className="btn-secondary shrink-0">
              What makes it different <Icon name="arrow" className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
