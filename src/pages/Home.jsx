import { Link } from 'react-router-dom'
import Icon from '../components/Icon'
import { services, howWeHelp } from '../lib/siteConfig'

export default function Home() {
  return (
    <>
      {/* ------------------------------- Hero ------------------------------- */}
      <section className="relative overflow-hidden">
        <div className="container-bt grid items-center gap-10 py-20 sm:py-28 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <span className="badge mb-5">
              <span className="mr-2 h-1.5 w-1.5 rounded-full bg-accent" /> Pretoria · South Africa
            </span>
            <h1 className="text-4xl font-extrabold leading-[1.05] tracking-tight text-white sm:text-5xl lg:text-6xl">
              Building efficient <span className="text-accent">systems.</span>
            </h1>
            <p className="mt-6 max-w-xl text-lg text-brand-200">
              We repair, support, secure and build technology that helps people and businesses
              operate better.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/request" className="btn-primary">
                Request a Service <Icon name="arrow" className="h-4 w-4" />
              </Link>
              <Link to="/services" className="btn-secondary">
                Explore Services
              </Link>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="card-hover relative">
              <div className="absolute -inset-px -z-10 rounded-2xl bg-gradient-to-br from-accent/20 to-transparent blur-xl" />
              <p className="eyebrow">The Bokgoni Tech journey</p>
              <div className="mt-5 space-y-3">
                {['Repair', 'Support', 'Secure', 'Build', 'Automate'].map((step, i) => (
                  <div
                    key={step}
                    className="flex items-center gap-3 rounded-xl border border-brand-700/60 bg-brand-950/40 px-4 py-3"
                  >
                    <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-accent/15 text-sm font-bold text-accent">
                      {i + 1}
                    </span>
                    <span className="font-semibold text-white">{step}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --------------------------- Service cards -------------------------- */}
      <section className="section border-t border-brand-800/70">
        <div className="container-bt">
          <div className="mb-10 max-w-2xl">
            <p className="eyebrow mb-3">What we do</p>
            <h2 className="text-3xl font-bold text-white">Core services</h2>
            <p className="mt-3 text-brand-300">
              From a cracked screen to a full business system — one team, end to end.
            </p>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((s) => (
              <Link
                key={s.slug}
                to={`/services/${s.slug}`}
                className="card-hover group flex flex-col"
              >
                <span className="grid h-11 w-11 place-items-center rounded-xl bg-accent/10 text-accent">
                  <Icon name={s.icon} className="h-6 w-6" />
                </span>
                <h3 className="mt-4 flex items-center gap-2 text-lg font-semibold text-white">
                  {s.name}
                  {!s.available && <span className="badge text-[10px]">Coming soon</span>}
                </h3>
                <p className="mt-1 flex-1 text-sm text-brand-300">{s.short}</p>
                <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-accent opacity-0 transition group-hover:opacity-100">
                  Learn more <Icon name="arrow" className="h-4 w-4" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------------------- How we help --------------------------- */}
      <section className="section border-t border-brand-800/70 bg-brand-900/30">
        <div className="container-bt">
          <div className="mb-10 max-w-2xl">
            <p className="eyebrow mb-3">How we help</p>
            <h2 className="text-3xl font-bold text-white">Tell us the problem.</h2>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {howWeHelp.map((item) => (
              <div key={item.problem} className="card flex gap-4">
                <Icon name="arrow" className="mt-1 h-5 w-5 shrink-0 text-accent" />
                <div>
                  <p className="font-semibold text-white">{item.problem}</p>
                  <p className="mt-1 text-sm text-brand-300">{item.answer}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --------------------------- Trust (future) ------------------------- */}
      <section className="section border-t border-brand-800/70">
        <div className="container-bt">
          <div className="card border-dashed text-center">
            <p className="eyebrow mb-3">Building trust</p>
            <h2 className="text-2xl font-bold text-white">Our track record is being built</h2>
            <p className="mx-auto mt-3 max-w-2xl text-brand-300">
              As real work is completed, this section will show devices repaired, businesses
              supported, systems deployed, response times, warranties and customer reviews — all
              backed by real records in our{' '}
              <Link to="/activity" className="text-accent hover:underline">
                Activity Log
              </Link>
              . We don’t publish numbers we haven’t earned.
            </p>
          </div>
        </div>
      </section>

      {/* -------------------------------- CTA ------------------------------- */}
      <section className="section border-t border-brand-800/70">
        <div className="container-bt">
          <div className="card relative overflow-hidden bg-gradient-to-br from-brand-800 to-brand-900 text-center">
            <h2 className="text-3xl font-bold text-white">Ready to get started?</h2>
            <p className="mx-auto mt-3 max-w-xl text-brand-200">
              Book a repair, request IT support, or discuss a project. We respond quickly.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <Link to="/request" className="btn-primary">
                Request a Service
              </Link>
              <Link to="/contact" className="btn-secondary">
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
