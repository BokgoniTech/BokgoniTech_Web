import { Link } from 'react-router-dom'
import PageHeader from '../components/PageHeader'
import Icon from '../components/Icon'
import { businessJourney, values } from '../lib/siteConfig'

export default function About() {
  return (
    <>
      <PageHeader
        eyebrow="About"
        title="About Bokgoni Tech"
        subtitle="A technology solutions business focused on helping people and organisations keep their devices, systems and digital operations working efficiently."
      />

      <section className="section">
        <div className="container-bt grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <div className="space-y-5 text-brand-200">
              <p>
                Bokgoni Tech is a technology solutions business focused on helping people and
                organisations keep their devices, systems and digital operations working
                efficiently.
              </p>
              <p>
                We begin with practical services such as phone and laptop repair, then expand into
                IT support, cybersecurity, software development, and intelligent automation.
              </p>
            </div>

            <div className="mt-10">
              <p className="eyebrow mb-3">Our mission</p>
              <p className="text-xl font-medium text-white">
                To build efficient technology systems that help people and businesses operate
                smarter, safer and faster.
              </p>
            </div>

            <div className="mt-10">
              <p className="eyebrow mb-4">Our values</p>
              <div className="flex flex-wrap gap-2.5">
                {values.map((v) => (
                  <span key={v} className="badge text-sm">
                    <Icon name="check" className="mr-1.5 h-3.5 w-3.5 text-accent" /> {v}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="card sticky top-24">
              <p className="eyebrow mb-5">Business journey</p>
              <ol className="relative space-y-6 border-l border-brand-700 pl-6">
                {businessJourney.map((step, i) => (
                  <li key={step} className="relative">
                    <span className="absolute -left-[31px] grid h-6 w-6 place-items-center rounded-full border border-accent/50 bg-brand-950 text-xs font-bold text-accent">
                      {i + 1}
                    </span>
                    <p className="font-semibold text-white">{step}</p>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>

        <div className="container-bt mt-12">
          <div className="card flex flex-col items-center justify-between gap-4 text-center sm:flex-row sm:text-left">
            <p className="text-brand-200">
              Want to see what we’re working on? Explore our services or get in touch.
            </p>
            <div className="flex gap-3">
              <Link to="/services" className="btn-secondary">Our Services</Link>
              <Link to="/request" className="btn-primary">Request a Service</Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
