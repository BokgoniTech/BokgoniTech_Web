import { Link } from 'react-router-dom'
import PageHeader from '../components/PageHeader'
import Icon from '../components/Icon'
import { product, questions, contact } from '../lib/siteConfig'

const values = ['Careful', 'Straightforward', 'Windows-focused', 'Built to be trusted']

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
                It started from the work of actually supporting small businesses: the hours that go
                into finding out what is wrong with a machine before anyone can begin fixing it, and
                the drive across town to restart a service that had stopped.
              </p>
              <p>
                We are a small team, and we build the whole thing ourselves. That is the reason a
                question about why a machine reported something odd reaches the person who built
                that part of it, rather than a support tier reading from a script.
              </p>
            </div>

            <div className="mt-10">
              <p className="eyebrow mb-3">What we are building toward</p>
              <p className="text-xl font-medium text-white">
                One page that answers what a technician needs to know, so the work is fixing things
                rather than finding out.
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
              <p className="eyebrow mb-2">What we are for</p>
              <p className="text-lg font-semibold text-white">
                Small IT teams looking after Windows machines they cannot walk over to.
              </p>
              <Link
                to="/who-its-for"
                className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-accent hover:underline"
              >
                Whether that is you <Icon name="arrow" className="h-4 w-4" />
              </Link>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="card sticky top-24">
              <p className="eyebrow mb-5">The order we built it in</p>
              <ol className="relative space-y-5 border-l border-brand-700 pl-6">
                {questions.map((q, i) => (
                  <li key={q.slug} className="relative">
                    <span className="absolute -left-[31px] grid h-6 w-6 place-items-center rounded-full border border-accent/50 bg-brand-950 text-xs font-bold text-accent">
                      {i + 1}
                    </span>
                    <p className="text-sm font-semibold text-white">{q.question}</p>
                  </li>
                ))}
              </ol>
              <p className="mt-6 border-t border-brand-800 pt-5 text-sm text-brand-400">
                Each one builds on the last, and they were built in this order for that reason.
                Answering the fifth without the first is guessing.
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
