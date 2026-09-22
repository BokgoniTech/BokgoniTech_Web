import { Link } from 'react-router-dom'
import PageHeader from '../components/PageHeader'
import Icon from '../components/Icon'
import { contact, whatsappLink } from '../lib/siteConfig'

export default function Contact() {
  const items = [
    { icon: 'mail', label: 'Email', value: contact.email, href: `mailto:${contact.email}` },
    {
      icon: 'whatsapp',
      label: 'WhatsApp',
      value: 'Chat with us',
      href: whatsappLink(),
      external: true,
    },
    {
      icon: 'phone',
      label: 'Phone',
      value: contact.phone,
      href: `tel:${contact.phone.replace(/\s/g, '')}`,
    },
    { icon: 'pin', label: 'Location', value: contact.location },
    { icon: 'clock', label: 'Hours', value: contact.hours },
  ]

  return (
    <>
      <PageHeader
        eyebrow="Contact"
        title="Get in touch with Bokgoni Tech"
        subtitle="Reach us the way that suits you. If you want to actually try the platform, the pilot form tells us what we need to set it up."
      />

      <section className="section">
        <div className="container-bt grid gap-8 lg:grid-cols-2">
          <div className="grid gap-4 sm:grid-cols-2">
            {items.map((item) => {
              const inner = (
                <>
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-accent/10 text-accent">
                    <Icon name={item.icon} className="h-6 w-6" />
                  </span>
                  <div className="min-w-0">
                    <p className="text-xs uppercase tracking-wide text-brand-400">{item.label}</p>
                    <p className="mt-0.5 truncate font-medium text-white">{item.value}</p>
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
            <h2 className="text-2xl font-bold text-white">Want to try it?</h2>
            <p className="mt-3 text-brand-200">
              Pilots are set up with you rather than through a signup form, so you get a
              conversation instead of a trial that expires while you are busy. The form captures
              what we need: how many Windows machines, what you use today, and what question you
              need answered.
            </p>
            <div className="mt-auto flex flex-wrap gap-3 pt-6">
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
