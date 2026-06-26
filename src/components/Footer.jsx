import { Link } from 'react-router-dom'
import Logo from './Logo'
import Icon from './Icon'
import { contact, whatsappLink, services } from '../lib/siteConfig'

export default function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="mt-auto border-t border-brand-800/70 bg-brand-950/60">
      <div className="container-bt grid gap-10 py-12 sm:grid-cols-2 lg:grid-cols-4">
        <div className="sm:col-span-2 lg:col-span-1">
          <Logo />
          <p className="mt-4 max-w-xs text-sm text-brand-300">
            We repair, support, secure and build technology that helps people and businesses
            operate better.
          </p>
        </div>

        <div>
          <h4 className="mb-3 text-sm font-semibold text-white">Services</h4>
          <ul className="space-y-2 text-sm">
            {services.map((s) => (
              <li key={s.slug}>
                <Link to={`/services/${s.slug}`} className="text-brand-300 hover:text-accent">
                  {s.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="mb-3 text-sm font-semibold text-white">Company</h4>
          <ul className="space-y-2 text-sm">
            <li><Link to="/about" className="text-brand-300 hover:text-accent">About</Link></li>
            <li><Link to="/activity" className="text-brand-300 hover:text-accent">Activity Log</Link></li>
            <li><Link to="/request" className="text-brand-300 hover:text-accent">Request a Service</Link></li>
            <li><Link to="/contact" className="text-brand-300 hover:text-accent">Contact</Link></li>
            <li><Link to="/portal/login" className="text-brand-300 hover:text-accent">Staff Login</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="mb-3 text-sm font-semibold text-white">Get in touch</h4>
          <ul className="space-y-3 text-sm text-brand-300">
            <li className="flex items-center gap-2">
              <Icon name="pin" className="h-4 w-4 text-accent" /> {contact.location}
            </li>
            <li>
              <a href={`mailto:${contact.email}`} className="flex items-center gap-2 hover:text-accent">
                <Icon name="mail" className="h-4 w-4 text-accent" /> {contact.email}
              </a>
            </li>
            <li>
              <a href={whatsappLink()} target="_blank" rel="noreferrer" className="flex items-center gap-2 hover:text-accent">
                <Icon name="whatsapp" className="h-4 w-4 text-accent" /> WhatsApp us
              </a>
            </li>
            <li className="flex items-center gap-2">
              <Icon name="clock" className="h-4 w-4 text-accent" /> {contact.hours}
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-brand-800/70">
        <div className="container-bt flex flex-col items-center justify-between gap-2 py-5 text-xs text-brand-400 sm:flex-row">
          <p>© {year} Bokgoni Tech. All rights reserved.</p>
          <p>Repair · Support · Secure · Build · Automate</p>
        </div>
      </div>
    </footer>
  )
}
