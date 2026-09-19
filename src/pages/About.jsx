import { Link } from 'react-router-dom'
import PageHeader from '../components/PageHeader'
import Icon from '../components/Icon'
import { product, rule, questions, contact } from '../lib/siteConfig'

const values = ['Careful', 'Honest about gaps', 'Windows-focused', 'Built to be trusted']

export default function About() {
  return (
    <>
      <PageHeader
        eyebrow="About"
        title="About Bokgoni Tech"
        subtitle={`We build ${product.name} — ${product.oneLiner.charAt(0).toLowerCase() + product.oneLiner.slice(1)}`}
      />

      <section className="section">
        <div className="container-bt grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <div className="space-y-5 text-brand-200">
              <p>
                Bokgoni Tech is a software company in {contact.location}. We build one product: a
                platform for looking after Windows computers you are responsible for but are not
                sitting in front of.
              </p>
              <p>
                It started from the work of actually supporting small businesses — and from the
                specific frustration of monitoring tools that answer confidently when they should
                say they do not know. That frustration is now the product’s design rule.
              </p>
              <p>
                We are small, the product is young, and we say so on the{' '}
                <Link to="/status" className="text-accent hover:underline">
                  status page
                </Link>{' '}
                rather than in a footnote. It is a working product with three known gaps, and we
                would rather you hear that from us than find it out in week two.
              </p>
            </div>

            <div className="mt-10">
              <p className="eyebrow mb-3">What we are building toward</p>
              <p className="text-xl font-medium text-white">
                A tool a technician trusts at 2am — because it has never told them something
                reassuring it could not support.
              </p>
            </div>

            <div className="mt-10">
              <p className="eyebrow mb-4">How we work</p>
              <div className="flex flex-wrap gap-2.5">
                {values.map((v) => (
                  <span key={v} className="badge text-sm">
                    <Icon name="check" className="mr-1.5 h-3.5 w-3.5 text-accent" /> {v}
                  </span>
                ))}
              </div>
            </div>

            <div className="card mt-10 border-l-2 border-l-accent">
              <p className="eyebrow mb-2">The rule everything follows</p>
              <p className="text-lg font-semibold text-white">{rule}</p>
              <Link
                to="/why-different"
                className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-accent hover:underline"
              >
                Why that is the whole product <Icon name="arrow" className="h-4 w-4" />
              </Link>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="card sticky top-24">
              <p className="eyebrow mb-5">The order we built it in</p>
              <ol className="relative space-y-5 border-l border-brand-700 pl-6">
                {questions.map((q, i) => (
                  <li key={q.slug} className="relative">
                    <span
                      className={`absolute -left-[31px] grid h-6 w-6 place-items-center rounded-full text-xs font-bold ${
                        q.state === 'not-started'
                          ? 'border border-brand-600 bg-brand-950 text-brand-400'
                          : 'border border-accent/50 bg-brand-950 text-accent'
                      }`}
                    >
                      {i + 1}
                    </span>
                    <p
                      className={`text-sm font-semibold ${
                        q.state === 'not-started' ? 'text-brand-400' : 'text-white'
                      }`}
                    >
                      {q.question}
                    </p>
                    {q.state === 'not-started' && (
                      <p className="mt-0.5 text-xs text-brand-500">Not started — on purpose</p>
                    )}
                  </li>
                ))}
              </ol>
              <p className="mt-6 border-t border-brand-800 pt-5 text-sm text-brand-400">
                Each one builds on the last. Answering the fifth without the first is guessing, and
                answering the sixth without all five is worse than guessing.
              </p>
            </div>
          </div>
        </div>

        <div className="container-bt mt-12">
          <div className="card flex flex-col items-center justify-between gap-4 text-center sm:flex-row sm:text-left">
            <p className="text-brand-200">
              Want to see whether it fits what you look after?
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
