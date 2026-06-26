import { useParams, Link, Navigate } from 'react-router-dom'
import PageHeader from '../components/PageHeader'
import Icon from '../components/Icon'
import { services, serviceDetails, whatsappLink } from '../lib/siteConfig'

export default function ServiceDetail() {
  const { slug } = useParams()
  const service = services.find((s) => s.slug === slug)
  const detail = serviceDetails[slug]

  if (!service || !detail) return <Navigate to="/services" replace />

  return (
    <>
      <PageHeader
        eyebrow={service.name}
        title={detail.headline}
        subtitle={detail.intro}
      >
        {!service.available && (
          <span className="badge border-amber-500/40 bg-amber-500/10 text-amber-200">
            Coming as Bokgoni Tech grows
          </span>
        )}
      </PageHeader>

      <section className="section">
        <div className="container-bt grid gap-12 lg:grid-cols-12">
          {/* Service list */}
          <div className="lg:col-span-7">
            <p className="eyebrow mb-4">
              {slug === 'innovation' ? 'Building toward' : 'What we offer'}
            </p>
            <ul className="grid gap-2.5 sm:grid-cols-2">
              {detail.serviceList.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-2.5 rounded-lg border border-brand-800 bg-brand-900/40 px-4 py-3 text-sm text-brand-100"
                >
                  <Icon name="check" className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                  {item}
                </li>
              ))}
            </ul>

            {/* Target audience (IT support) */}
            {detail.audience && (
              <div className="mt-10">
                <p className="eyebrow mb-4">Who we help</p>
                <div className="flex flex-wrap gap-2">
                  {detail.audience.map((a) => (
                    <span key={a} className="badge">{a}</span>
                  ))}
                </div>
              </div>
            )}

            {/* Packages (IT support) */}
            {detail.packages && (
              <div className="mt-10">
                <p className="eyebrow mb-4">Support packages</p>
                <div className="grid gap-4 sm:grid-cols-3">
                  {detail.packages.map((p) => (
                    <div key={p.name} className="card-hover">
                      <h4 className="font-semibold text-white">{p.name}</h4>
                      <p className="mt-2 text-sm text-brand-300">{p.for}</p>
                    </div>
                  ))}
                </div>
                <p className="mt-4 text-xs text-brand-400">
                  Request a quote — pricing is tailored to your business.
                </p>
              </div>
            )}
          </div>

          {/* Workflow + CTA sidebar */}
          <div className="lg:col-span-5">
            {detail.workflow && (
              <div className="card">
                <p className="eyebrow mb-5">
                  {slug === 'device-repair' ? 'Repair workflow' : 'Delivery process'}
                </p>
                <ol className="relative space-y-5 border-l border-brand-700 pl-6">
                  {detail.workflow.map((step, i) => (
                    <li key={step} className="relative">
                      <span className="absolute -left-[31px] grid h-6 w-6 place-items-center rounded-full border border-accent/50 bg-brand-950 text-xs font-bold text-accent">
                        {i + 1}
                      </span>
                      <p className="text-sm font-medium text-brand-100">{step}</p>
                    </li>
                  ))}
                </ol>
              </div>
            )}

            <div className="card mt-6 bg-gradient-to-br from-brand-800 to-brand-900">
              <h3 className="text-lg font-semibold text-white">
                {slug === 'device-repair'
                  ? 'Need a repair?'
                  : slug === 'software-development'
                  ? 'Have a process that’s too manual?'
                  : 'Ready to talk?'}
              </h3>
              <div className="mt-4 flex flex-col gap-3">
                <Link to="/request" className="btn-primary w-full">
                  {slug === 'software-development' ? 'Discuss Your Project' : 'Request a Service'}
                </Link>
                <a
                  href={whatsappLink(`Hi Bokgoni Tech, I'm interested in ${service.name}.`)}
                  target="_blank"
                  rel="noreferrer"
                  className="btn-secondary w-full"
                >
                  <Icon name="whatsapp" className="h-4 w-4" /> WhatsApp Bokgoni Tech
                </a>
              </div>
            </div>

            <Link
              to="/services"
              className="mt-6 inline-flex items-center gap-2 text-sm text-brand-300 hover:text-accent"
            >
              <Icon name="arrow" className="h-4 w-4 rotate-180" /> All services
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
