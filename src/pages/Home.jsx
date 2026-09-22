import { Link } from 'react-router-dom'
import Icon from '../components/Icon'
import { product, questions, pieces, outcomes, engagement, rule } from '../lib/siteConfig'

export default function Home() {
  return (
    <>
      {/* ------------------------------- Hero ------------------------------- */}
      <section className="relative overflow-hidden">
        <div className="container-bt grid items-start gap-12 py-20 sm:py-28 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <span className="badge mb-5">
              <span className="mr-2 h-1.5 w-1.5 rounded-full bg-accent" /> {product.platform} ·{' '}
              {product.name}
            </span>
            <h1 className="text-4xl font-extrabold leading-[1.05] tracking-tight text-white sm:text-5xl lg:text-[3.4rem]">
              Know what your Windows machines are{' '}
              <span className="text-accent">actually doing.</span>
            </h1>
            <p className="mt-6 max-w-xl text-lg text-brand-200">{product.oneLiner}</p>
            <p className="mt-4 max-w-xl text-brand-300">{product.summary}</p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/pilot" className="btn-primary">
                Request a pilot <Icon name="arrow" className="h-4 w-4" />
              </Link>
              <Link to="/product" className="btn-secondary">
                What it does
              </Link>
            </div>
          </div>

          {/* The three pieces, as a diagram you can read in one pass. */}
          <div className="lg:col-span-5">
            <div className="card relative">
              <div className="absolute -inset-px -z-10 rounded-2xl bg-gradient-to-br from-accent/20 to-transparent blur-xl" />
              <p className="eyebrow mb-5">Three pieces. You only ever see one.</p>
              <div className="space-y-2">
                {pieces.map((p, i) => (
                  <div key={p.slug}>
                    <div className="rounded-xl border border-brand-700/60 bg-brand-950/40 p-4">
                      <div className="flex items-center gap-3">
                        <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-accent/10 text-accent">
                          <Icon name={p.icon} className="h-5 w-5" />
                        </span>
                        <div className="min-w-0">
                          <p className="font-semibold text-white">{p.name}</p>
                          <p className="text-xs text-brand-400">{p.where}</p>
                        </div>
                      </div>
                      <p className="mt-3 text-sm text-brand-300">{p.summary}</p>
                    </div>
                    {i < pieces.length - 1 && (
                      <div className="flex justify-center py-1.5 text-brand-600" aria-hidden="true">
                        <Icon name="arrow" className="h-4 w-4 rotate-90" />
                      </div>
                    )}
                  </div>
                ))}
              </div>
              <Link
                to="/how-it-works"
                className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-accent hover:underline"
              >
                How they talk to each other <Icon name="arrow" className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ---------------------------- What you get -------------------------- */}
      <section className="section border-t border-brand-800/70">
        <div className="container-bt">
          <div className="mb-10 max-w-2xl">
            <p className="eyebrow mb-3">What you get</p>
            <h2 className="text-3xl font-bold text-white">
              The end of not knowing.
            </h2>
            <p className="mt-3 text-brand-300">
              Everything below is answerable today by walking to a machine or asking someone to
              check. The value is that it becomes quick, and correct, and stays true tomorrow.
            </p>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            {outcomes.map((o) => (
              <div key={o.title} className="card">
                <span className="grid h-11 w-11 place-items-center rounded-xl bg-accent/10 text-accent">
                  <Icon name={o.icon} className="h-6 w-6" />
                </span>
                <h3 className="mt-4 text-lg font-semibold text-white">{o.title}</h3>
                <p className="mt-2 text-sm text-brand-300">{o.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ------------------------- The five questions ----------------------- */}
      <section className="section border-t border-brand-800/70 bg-brand-900/30">
        <div className="container-bt">
          <div className="mb-10 max-w-2xl">
            <p className="eyebrow mb-3">What it answers</p>
            <h2 className="text-3xl font-bold text-white">Five questions, in order.</h2>
            <p className="mt-3 text-brand-300">
              Each one builds on the last. A tool that answers the fifth without the first is
              guessing.
            </p>
          </div>

          <div className="overflow-hidden rounded-2xl border border-brand-700/70">
            {questions.map((q, i) => (
              <div
                key={q.slug}
                className={`flex flex-col gap-3 p-5 sm:flex-row sm:items-center sm:gap-5 hover:bg-brand-900/40 ${
                  i > 0 ? 'border-t border-brand-800' : ''
                }`}
              >
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-accent/10 text-accent">
                  <Icon name={q.icon} className="h-5 w-5" />
                </span>
                <p className="min-w-0 flex-1 font-semibold text-white">{q.question}</p>
                <p className="min-w-0 flex-1 text-sm text-brand-300">{q.answer}</p>
              </div>
            ))}
          </div>

          <div className="mt-6">
            <Link to="/product" className="btn-secondary">
              What it does, in detail <Icon name="arrow" className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ----------------------------- The rule ----------------------------- */}
      <section className="section border-t border-brand-800/70">
        <div className="container-bt">
          <div className="mx-auto max-w-3xl text-center">
            <p className="eyebrow mb-4">Why this one</p>
            <blockquote className="text-2xl font-bold leading-snug text-white sm:text-3xl">
              “{rule}”
            </blockquote>
            <p className="mt-6 text-brand-300">
              Ask most monitoring tools whether a machine has antivirus and they answer{' '}
              <span className="font-semibold text-white">no</span> both when it has none and when
              the check simply failed. Those need opposite responses. This one keeps them apart, at
              every layer — so what the dashboard tells you is something you can act on.
            </p>
            <Link to="/why-different" className="btn-secondary mt-8">
              What that looks like in practice <Icon name="arrow" className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ------------------------- Working with us -------------------------- */}
      <section className="section border-t border-brand-800/70 bg-brand-900/30">
        <div className="container-bt">
          <div className="mb-10 max-w-2xl">
            <p className="eyebrow mb-3">Working with us</p>
            <h2 className="text-3xl font-bold text-white">How it starts.</h2>
          </div>

          <div className="grid gap-5 lg:grid-cols-3">
            {engagement.map((e, i) => (
              <div key={e.step} className="card">
                <span className="grid h-8 w-8 place-items-center rounded-full bg-accent/15 text-sm font-bold text-accent">
                  {i + 1}
                </span>
                <h3 className="mt-4 text-lg font-semibold text-white">{e.step}</h3>
                <p className="mt-2 text-sm text-brand-300">{e.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* -------------------------------- CTA ------------------------------- */}
      <section className="section border-t border-brand-800/70">
        <div className="container-bt">
          <div className="card relative overflow-hidden bg-gradient-to-br from-brand-800 to-brand-900 text-center">
            <h2 className="text-3xl font-bold text-white">Try it on one client.</h2>
            <p className="mx-auto mt-3 max-w-xl text-brand-200">
              We set the pilot up with you and you watch a real fleet for a month. That is the
              demonstration that settles it.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <Link to="/pilot" className="btn-primary">
                Request a pilot
              </Link>
              <Link to="/who-its-for" className="btn-secondary">
                Is this for me?
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
