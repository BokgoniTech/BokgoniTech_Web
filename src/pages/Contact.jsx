import { Link } from 'react-router-dom'
import PageHeader from '../components/PageHeader'
import Icon from '../components/Icon'
import { contact, whatsappLink } from '../lib/siteConfig'

export default function Contact() {
  const items = [
    {
      icon: 'whatsapp',
      label: 'WhatsApp',
      value: 'Chat with us',
      href: whatsappLink(),
      external: true,
    },
    { icon: 'mail', label: 'Email', value: contact.email, href: `mailto:${contact.email}` },
    { icon: 'phone', label: 'Phone', value: contact.phone, href: `tel:${contact.phone.replace(/\s/g, '')}` },
    { icon: 'pin', label: 'Location', value: contact.location },
    { icon: 'clock', label: 'Hours', value: contact.hours },
  ]

  return (
    <>
      <PageHeader
        eyebrow="Contact"
        title="Get in touch with Bokgoni Tech"
        subtitle="Reach us the way that suits you. For repairs and quotes, the fastest route is WhatsApp or the request form."
      />

      <section className="section">
        <div className="container-bt grid gap-8 lg:grid-cols-2">
          <div className="grid gap-4 sm:grid-cols-2">
            {items.map((item) => {
              const inner = (
                <>
                  <span className="grid h-11 w-11 place-items-center rounded-xl bg-accent/10 text-accent">
                    <Icon name={item.icon} className="h-6 w-6" />
                  </span>
                  <div>
                    <p className="text-xs uppercase tracking-wide text-brand-400">{item.label}</p>
                    <p className="mt-0.5 font-medium text-white">{item.value}</p>
                  </div>
                </>
              )
              const cls = 'card flex items-center gap-4'
              return item.href ? (
                <a
                  key={item.label}
                  href={item.href}
                  target={item.external ? '_blank' : undefined}
                  rel={item.external ? 'noreferrer' : undefined}
                  className={`${cls} hover:border-accent/50`}
                >
                  {inner}
                </a>
              ) : (
                <div key={item.label} className={cls}>
                  {inner}
                </div>
              )
            })}
          </div>

          <div className="card flex flex-col bg-gradient-to-br from-brand-800 to-brand-900">
            <h2 className="text-2xl font-bold text-white">Ready to book?</h2>
            <p className="mt-3 text-brand-200">
              The request form captures everything we need to give you a quick, accurate quote —
              including optional photos of the problem.
            </p>
            <div className="mt-auto pt-6">
              <Link to="/request" className="btn-primary w-full sm:w-auto">
                Request a Service <Icon name="arrow" className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
