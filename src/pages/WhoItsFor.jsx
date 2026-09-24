import { Link } from 'react-router-dom'
import PageHeader from '../components/PageHeader'
import Icon from '../components/Icon'
import {
  audienceIntro,
  audiences,
  buying,
  savings,
  bestFit,
} from '../lib/siteConfig'

export default function WhoItsFor() {
  return (
    <>
      <PageHeader eyebrow="Who it is for" title="The person" subtitle={audienceIntro} />

      {/* --------------------------- Three shapes --------------------------- */}
      <section className="section">
        <div className="container-bt">
          <p className="eyebrow mb-6">Three shapes of that person</p>
          <div className="grid gap-5 lg:grid-cols-3">
            {audiences.map((a, i) => (
              <div key={a.name} className="card">
                <span className="grid h-8 w-8 place-items-center rounded-full bg-accent/15 text-sm font-bold text-accent">
                  {i + 1}
                </span>
                <h2 className="mt-4 text-lg font-semibold text-white">{a.name}</h2>
                <p className="mt-3 text-sm text-brand-300">{a.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ----------------------- What they are buying ----------------------- */}
      <section className="section border-t border-brand-800/70 bg-brand-900/30">
        <div className="container-bt grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <p className="eyebrow mb-3">What they are actually buying</p>
            <h2 className="text-3xl font-bold text-white">{buying.headline}</h2>
            <p className="mt-4 text-brand-300">{buying.intro}</p>
          </div>

          <div className="lg:col-span-7">
            <ul className="space-y-3">
              {buying.answers.map((q) => (
                <li
                  key={q}
                  className="flex items-start gap-3 rounded-xl border border-brand-700/70 bg-brand-950/40 px-5 py-4"
                >
                  <Icon name="question" className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
                  <span className="italic text-brand-100">{q}</span>
                </li>
              ))}
            </ul>
            <p className="mt-6 text-sm text-brand-300">{buying.note}</p>
          </div>
        </div>
      </section>

      {/* --------------------------- What it saves -------------------------- */}
      <section className="section border-t border-brand-800/70">
        <div className="container-bt">
          <div className="mb-10 max-w-2xl">
            <p className="eyebrow mb-3">What it saves them</p>
            <h2 className="text-3xl font-bold text-white">Four things, concretely.</h2>
          </div>
          <div className="grid gap-5 sm:grid-cols-2">
            {savings.map((s) => (
              <div key={s.label} className="card">
                <h3 className="font-semibold text-white">{s.label}</h3>
                <p className="mt-2 text-sm text-brand-300">{s.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------------------- Where it fits -------------------------- */}
      <section className="section border-t border-brand-800/70 bg-brand-900/30">
        <div className="container-bt">
          <div className="card mx-auto max-w-3xl bg-gradient-to-br from-brand-800 to-brand-900 text-center">
            <p className="eyebrow mb-3">Where it fits best</p>
            <p className="text-brand-100">{bestFit}</p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <Link to="/pilot" className="btn-primary">
                Request a pilot <Icon name="arrow" className="h-4 w-4" />
              </Link>
              <Link to="/product" className="btn-secondary">
                What it does
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
