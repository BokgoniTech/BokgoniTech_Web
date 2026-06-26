import { Link } from 'react-router-dom'
import PageHeader from '../components/PageHeader'
import Icon from '../components/Icon'
import { services } from '../lib/siteConfig'

export default function Services() {
  return (
    <>
      <PageHeader
        eyebrow="Services"
        title="What Bokgoni Tech does"
        subtitle="Each service solves a real problem. Start with what you need today — we grow with you."
      />

      <section className="section">
        <div className="container-bt">
          {/* Problem → solution overview table (cards on mobile) */}
          <div className="hidden overflow-hidden rounded-2xl border border-brand-700/70 lg:block">
            <table className="w-full text-left text-sm">
              <thead className="bg-brand-900/60 text-brand-200">
                <tr>
                  <th className="px-6 py-4 font-semibold">Service</th>
                  <th className="px-6 py-4 font-semibold">Customer problem</th>
                  <th className="px-6 py-4 font-semibold">Bokgoni Tech solution</th>
                  <th className="px-6 py-4" />
                </tr>
              </thead>
              <tbody className="divide-y divide-brand-800">
                {services.map((s) => (
                  <tr key={s.slug} className="hover:bg-brand-900/40">
                    <td className="px-6 py-4 font-semibold text-white">
                      {s.name}
                      {!s.available && <span className="badge ml-2 text-[10px]">Coming soon</span>}
                    </td>
                    <td className="px-6 py-4 text-brand-300">{s.problem}</td>
                    <td className="px-6 py-4 text-brand-300">{s.solution}</td>
                    <td className="px-6 py-4 text-right">
                      <Link to={`/services/${s.slug}`} className="text-accent hover:underline">
                        View
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Card grid (all sizes, primary on mobile) */}
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:hidden">
            {services.map((s) => (
              <Link key={s.slug} to={`/services/${s.slug}`} className="card-hover">
                <span className="grid h-11 w-11 place-items-center rounded-xl bg-accent/10 text-accent">
                  <Icon name={s.icon} className="h-6 w-6" />
                </span>
                <h3 className="mt-4 text-lg font-semibold text-white">{s.name}</h3>
                <p className="mt-1 text-sm text-brand-300">{s.solution}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
