import { Link } from 'react-router-dom'
import Logo from './Logo'
import Icon from './Icon'
import { contact, whatsappLink, product } from '../lib/siteConfig'

const productLinks = [
  { to: '/product', label: 'What it does' },
  { to: '/how-it-works', label: 'How it works' },
  { to: '/who-its-for', label: "Who it's for" },
  { to: '/why-different', label: 'What makes it different' },
  { to: '/status', label: 'Where it actually is' },
  { to: '/changelog', label: 'Changelog' },
]

const companyLinks = [
  { to: '/about', label: 'About' },
  { to: '/contact', label: 'Contact' },
  { to: '/pilot', label: 'Request a pilot' },
  { to: '/portal/login', label: 'Staff login' },
]

export default function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="mt-auto border-t border-brand-800/70 bg-brand-950/60">
      <div className="container-bt grid gap-10 py-12 sm:grid-cols-2 lg:grid-cols-4">
        <div className="sm:col-span-2 lg:col-span-1">
          <Logo />
          <p className="mt-4 max-w-xs text-sm text-brand-300">{product.oneLiner}</p>
          <p className="mt-3 inline-flex items-center gap-1.5 text-xs text-brand-400">
            <Icon name="monitor" className="h-3.5 w-3.5" /> {product.platform}
          </p>
        </div>

        <div>
          <h4 className="mb-3 text-sm font-semibold text-white">The product</h4>
          <ul className="space-y-2 text-sm">
            {productLinks.map((l) => (
              <li key={l.to}>
                <Link to={l.to} className="text-brand-300 hover:text-accent">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="mb-3 text-sm font-semibold text-white">Company</h4>
          <ul className="space-y-2 text-sm">
            {companyLinks.map((l) => (
              <li key={l.to}>
                <Link to={l.to} className="text-brand-300 hover:text-accent">
                  {l.label}
                </Link>
              </li>
            ))}
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
          <p>Inventory · Health · Alerting · Action · Posture</p>
        </div>
      </div>
    </footer>
  )
}
