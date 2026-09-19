import { Link } from 'react-router-dom'
import PageHeader from '../components/PageHeader'
import Icon from '../components/Icon'
import { capabilities, buildState } from '../lib/siteConfig'

export default function Product() {
  return (
    <>
      <PageHeader
        eyebrow="What it does"
        title="The capabilities, in plain terms"
        subtitle="Written for somebody deciding whether they want this, not for somebody building it."
      />

      <section className="section">
        <div className="container-bt">
          {/* Jump list — the page is long and each section stands alone. */}
          <nav className="mb-14 flex flex-wrap gap-2" aria-label="On this page">
            {capabilities.map((c) => (
              <a key={c.slug} href={`#${c.slug}`} className="badge hover:border-accent/60 hover:text-white">
                <Icon name={c.icon} className="mr-1.5 h-3.5 w-3.5 text-accent" />
                {c.nav}
              </a>
            ))}
          </nav>

          <div className="space-y-16">
            {capabilities.map((c) => (
              <article key={c.slug} id={c.slug} className="scroll-mt-24">
                <div className="grid gap-8 lg:grid-cols-12">
                  <div className="lg:col-span-5">
                    <span className="grid h-11 w-11 place-items-center rounded-xl bg-accent/10 text-accent">
                      <Icon name={c.icon} className="h-6 w-6" />
                    </span>
                    <h2 className="mt-4 text-2xl font-bold text-white">{c.title}</h2>
                    <p className="mt-4 text-brand-300">{c.body}</p>

                    {c.quote && (
                      <blockquote className="mt-5 border-l-2 border-accent/60 bg-brand-900/40 px-4 py-3 font-mono text-sm text-brand-100">
                        {c.quote}
                      </blockquote>
                    )}
                  </div>

                  <div className="lg:col-span-7">
                    {c.list && (
                      <ul className="grid gap-2.5 sm:grid-cols-2">
                        {c.list.map((item) => (
                          <li
                            key={item}
                            className="flex items-start gap-2.5 rounded-lg border border-brand-800 bg-brand-900/40 px-4 py-3 text-sm text-brand-100"
                          >
                            <Icon name="check" className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    )}

                    {c.points && (
                      <div className="space-y-4">
                        {c.points.map((p) => (
                          <div key={p.label} className="card">
                            <p className="font-semibold text-white">{p.label}</p>
                            <p className="mt-1.5 text-sm text-brand-300">{p.text}</p>
                          </div>
                        ))}
                      </div>
                    )}

                    {c.pull && (
                      <div className={`card ${c.list || c.points ? 'mt-5' : ''}`}>
                        <p className="eyebrow mb-2">{c.pullTitle}</p>
                        <p className="text-brand-200">{c.pull}</p>
                      </div>
                    )}

                    {c.note && (
                      <p className="mt-5 flex gap-2.5 rounded-lg border border-brand-700 bg-brand-950/50 px-4 py-3 text-sm text-brand-200">
                        <Icon name="warn" className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                        {c.note}
                      </p>
                    )}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------------- The part that is not built ------------------- */}
      <section className="section border-t border-brand-800/70 bg-brand-900/30">
        <div className="container-bt grid gap-8 lg:grid-cols-2">
          <div className="card border-amber-500/30">
            <p className="eyebrow mb-3 text-amber-300">The part that is not built</p>
            <h2 className="text-xl font-bold text-white">Detection and response</h2>
            <p className="mt-3 text-brand-300">
              Spotting an attack in progress and cutting a machine off the network.
            </p>
            <p className="mt-4 text-brand-300">
              It is deliberately last, and the reason is worth stating: detection built on
              unreliable information produces confident accusations about the wrong machines. Every
              question above has to be answered dependably first, or the sixth one generates alarms
              nobody can check and everyone learns to dismiss.
            </p>
          </div>

          <div className="card">
            <p className="eyebrow mb-3">One thing that exists but is switched off</p>
            <h2 className="text-xl font-bold text-white">{buildState.switchedOff.label}</h2>
            <p className="mt-3 text-brand-300">{buildState.switchedOff.text}</p>
            <Link
              to="/status"
              className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-accent hover:underline"
            >
              Everything else that is and is not done <Icon name="arrow" className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      <section className="section border-t border-brand-800/70">
        <div className="container-bt">
          <div className="card flex flex-col items-center justify-between gap-4 text-center sm:flex-row sm:text-left">
            <p className="text-brand-200">
              Want to see how the three pieces fit together, or whether this is aimed at you?
            </p>
            <div className="flex shrink-0 gap-3">
              <Link to="/how-it-works" className="btn-secondary">
                How it works
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
