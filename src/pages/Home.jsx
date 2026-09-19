import { Link } from 'react-router-dom'
import Icon from '../components/Icon'
import StateBadge from '../components/StateBadge'
import { product, questions, pieces, rule, buildState } from '../lib/siteConfig'

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
            <p className="mt-4 max-w-xl text-brand-400">That is the whole idea. Everything else is detail.</p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/pilot" className="btn-primary">
                Request a pilot <Icon name="arrow" className="h-4 w-4" />
              </Link>
              <Link to="/product" className="btn-secondary">
                What it does
              </Link>
            </div>

            <p className="mt-6 text-sm text-brand-400">
              Not a prototype — and not finished either.{' '}
              <Link to="/status" className="text-accent hover:underline">
                Here is exactly where it is
              </Link>
              .
            </p>
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

      {/* ------------------------- The five questions ----------------------- */}
      <section className="section border-t border-brand-800/70">
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
                className={`flex flex-col gap-3 p-5 sm:flex-row sm:items-center sm:gap-5 ${
                  i > 0 ? 'border-t border-brand-800' : ''
                } ${q.state === 'not-started' ? 'bg-brand-950/60' : 'hover:bg-brand-900/40'}`}
              >
                <span
                  className={`grid h-10 w-10 shrink-0 place-items-center rounded-xl ${
                    q.state === 'not-started'
                      ? 'bg-brand-800/60 text-brand-400'
                      : 'bg-accent/10 text-accent'
                  }`}
                >
                  <Icon name={q.icon} className="h-5 w-5" />
                </span>
                <p
                  className={`min-w-0 flex-1 font-semibold ${
                    q.state === 'not-started' ? 'text-brand-300' : 'text-white'
                  }`}
                >
                  {q.question}
                </p>
                <p className="min-w-0 flex-1 text-sm text-brand-300">{q.answer}</p>
                <StateBadge state={q.state} className="shrink-0 self-start sm:self-center" />
              </div>
            ))}
          </div>

          <p className="mt-5 max-w-3xl text-sm text-brand-400">
            The sixth is deliberately last, and{' '}
            <Link to="/status" className="text-accent hover:underline">
              why that matters
            </Link>{' '}
            is part of the pitch, not a caveat buried in it.
          </p>
        </div>
      </section>

      {/* ----------------------------- The rule ----------------------------- */}
      <section className="section border-t border-brand-800/70 bg-brand-900/30">
        <div className="container-bt">
          <div className="mx-auto max-w-3xl text-center">
            <p className="eyebrow mb-4">The one design rule</p>
            <blockquote className="text-2xl font-bold leading-snug text-white sm:text-3xl">
              “{rule}”
            </blockquote>
            <p className="mt-6 text-brand-300">
              That sounds obvious. Almost no monitoring tool actually does it, and the gap is where
              the failures live. Ask most tools whether a machine has antivirus and they will answer{' '}
              <span className="font-semibold text-white">no</span> both when it has none and when
              the check simply failed. Those need opposite responses.
            </p>
            <Link
              to="/why-different"
              className="btn-secondary mt-8"
            >
              What that looks like in practice <Icon name="arrow" className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* --------------------------- Honest status -------------------------- */}
      <section className="section border-t border-brand-800/70">
        <div className="container-bt grid gap-8 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <p className="eyebrow mb-3">Where it actually is</p>
            <h2 className="text-3xl font-bold text-white">
              Working product. Three known gaps.
            </h2>
            <p className="mt-4 text-brand-300">{buildState.summary}</p>
            <Link to="/status" className="btn-secondary mt-6">
              The full status <Icon name="arrow" className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid gap-4 lg:col-span-7 lg:grid-cols-2">
            <div className="card">
              <p className="mb-3 inline-flex items-center gap-2 text-sm font-semibold text-green-200">
                <Icon name="check" className="h-4 w-4" /> Built and running
              </p>
              <ul className="space-y-2.5 text-sm text-brand-300">
                {buildState.done.map((d) => (
                  <li key={d} className="flex gap-2">
                    <Icon name="check" className="mt-0.5 h-4 w-4 shrink-0 text-green-400/70" />
                    {d}
                  </li>
                ))}
              </ul>
            </div>
            <div className="card border-amber-500/30">
              <p className="mb-3 inline-flex items-center gap-2 text-sm font-semibold text-amber-200">
                <Icon name="warn" className="h-4 w-4" /> Not done
              </p>
              <ul className="space-y-2.5 text-sm text-brand-300">
                {buildState.gaps.map((g) => (
                  <li key={g.label} className="flex gap-2">
                    <Icon name="minus" className="mt-0.5 h-4 w-4 shrink-0 text-amber-400/70" />
                    <span>
                      <span className="font-medium text-brand-100">{g.label}.</span>{' '}
                      {g.text}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* -------------------------------- CTA ------------------------------- */}
      <section className="section border-t border-brand-800/70">
        <div className="container-bt">
          <div className="card relative overflow-hidden bg-gradient-to-br from-brand-800 to-brand-900 text-center">
            <h2 className="text-3xl font-bold text-white">Try it on one client.</h2>
            <p className="mx-auto mt-3 max-w-xl text-brand-200">
              There is no self-service signup yet — the installer is not hosted. A pilot is set up
              with us by hand, which means you get a conversation rather than a trial that expires.
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
