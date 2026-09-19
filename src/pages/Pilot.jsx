import { useState } from 'react'
import { Link } from 'react-router-dom'
import PageHeader from '../components/PageHeader'
import NotConfigured from '../components/NotConfigured'
import Icon from '../components/Icon'
import {
  fleetSizeOptions,
  roleOptions,
  contactMethods,
  whatsappLink,
  buildState,
} from '../lib/siteConfig'
import { submitRequest } from '../lib/db'
import { isFirebaseConfigured } from '../lib/firebase'

const empty = {
  name: '',
  organisation: '',
  email: '',
  phone: '',
  role: '',
  fleetSize: '',
  currentTool: '',
  needToAnswer: '',
  preferredContact: 'Email',
  consent: false,
}

export default function Pilot() {
  const [form, setForm] = useState(empty)
  const [status, setStatus] = useState('idle') // idle | submitting | done | error
  const [error, setError] = useState('')

  function update(field, value) {
    setForm((f) => ({ ...f, [field]: value }))
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    if (!form.consent) {
      setError('Please tick the consent box so we can contact you about your request.')
      return
    }
    setStatus('submitting')
    try {
      await submitRequest(form)
      setStatus('done')
      window.scrollTo({ top: 0 })
    } catch (err) {
      console.error(err)
      setError(err.message || 'Something went wrong. Please email us instead.')
      setStatus('error')
    }
  }

  if (status === 'done') {
    return (
      <>
        <PageHeader eyebrow="Request a pilot" title="Request received" />
        <section className="section">
          <div className="container-bt max-w-xl">
            <div className="card text-center">
              <span className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-accent/15 text-accent">
                <Icon name="check" className="h-8 w-8" />
              </span>
              <h2 className="mt-4 text-xl font-bold text-white">Thank you</h2>
              <p className="mt-2 text-brand-300">
                We’ve got it and will be in touch via your preferred method. Because there is no
                hosted installer yet, the first step is a conversation rather than a download — we
                set the pilot up with you.
              </p>
              <div className="mt-6 flex flex-wrap justify-center gap-3">
                <Link to="/status" className="btn-secondary">
                  Where the product is
                </Link>
                <Link to="/" className="btn-primary">
                  Back to home
                </Link>
              </div>
            </div>
          </div>
        </section>
      </>
    )
  }

  return (
    <>
      <PageHeader
        eyebrow="Request a pilot"
        title="Try it on one client, for a month"
        subtitle="That month is the product decision, and nothing in a sales conversation substitutes for it. Fields marked * are required."
      />

      <section className="section">
        <div className="container-bt grid gap-10 lg:grid-cols-12">
          {/* What to expect — set expectations before the form, not after. */}
          <div className="lg:col-span-5">
            <div className="card sticky top-24">
              <p className="eyebrow mb-4">What happens next</p>
              <ol className="relative space-y-5 border-l border-brand-700 pl-6">
                {[
                  'We reply and ask what you are trying to answer.',
                  'We set the agent up on a handful of your machines with you.',
                  'You watch it for a month and decide.',
                ].map((step, i) => (
                  <li key={step} className="relative">
                    <span className="absolute -left-[31px] grid h-6 w-6 place-items-center rounded-full border border-accent/50 bg-brand-950 text-xs font-bold text-accent">
                      {i + 1}
                    </span>
                    <p className="text-sm text-brand-200">{step}</p>
                  </li>
                ))}
              </ol>

              <div className="mt-6 space-y-3 border-t border-brand-800 pt-6">
                <p className="text-xs font-semibold uppercase tracking-wide text-amber-300">
                  Two things to know first
                </p>
                {buildState.gaps.slice(0, 2).map((g) => (
                  <p key={g.label} className="flex gap-2 text-sm text-brand-300">
                    <Icon name="warn" className="mt-0.5 h-4 w-4 shrink-0 text-amber-400/80" />
                    <span>
                      <span className="font-medium text-brand-100">{g.label}.</span> {g.text}
                    </span>
                  </p>
                ))}
                <Link
                  to="/status"
                  className="inline-flex items-center gap-1.5 text-sm font-medium text-accent hover:underline"
                >
                  The full status <Icon name="arrow" className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>

          {/* The form */}
          <div className="lg:col-span-7">
            {!isFirebaseConfigured && (
              <div className="mb-6">
                <NotConfigured feature="The pilot request form" />
                <p className="mt-3 text-sm text-brand-400">
                  In the meantime you can reach us on{' '}
                  <a
                    href={whatsappLink()}
                    target="_blank"
                    rel="noreferrer"
                    className="text-accent hover:underline"
                  >
                    WhatsApp
                  </a>{' '}
                  or via the{' '}
                  <Link to="/contact" className="text-accent hover:underline">
                    contact page
                  </Link>
                  .
                </p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="card space-y-6">
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="label" htmlFor="name">
                    Your name *
                  </label>
                  <input
                    id="name"
                    required
                    className="input"
                    value={form.name}
                    onChange={(e) => update('name', e.target.value)}
                  />
                </div>
                <div>
                  <label className="label" htmlFor="organisation">
                    Organisation *
                  </label>
                  <input
                    id="organisation"
                    required
                    className="input"
                    value={form.organisation}
                    onChange={(e) => update('organisation', e.target.value)}
                  />
                </div>
                <div>
                  <label className="label" htmlFor="email">
                    Email address *
                  </label>
                  <input
                    id="email"
                    type="email"
                    required
                    className="input"
                    value={form.email}
                    onChange={(e) => update('email', e.target.value)}
                  />
                </div>
                <div>
                  <label className="label" htmlFor="phone">
                    Phone number
                  </label>
                  <input
                    id="phone"
                    type="tel"
                    className="input"
                    value={form.phone}
                    onChange={(e) => update('phone', e.target.value)}
                  />
                </div>
              </div>

              <div>
                <label className="label" htmlFor="role">
                  Which of these is closest to you? *
                </label>
                <select
                  id="role"
                  required
                  className="input"
                  value={form.role}
                  onChange={(e) => update('role', e.target.value)}
                >
                  <option value="" disabled>
                    Select one…
                  </option>
                  {roleOptions.map((r) => (
                    <option key={r} value={r}>
                      {r}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="label" htmlFor="fleetSize">
                  How many Windows machines? *
                </label>
                <select
                  id="fleetSize"
                  required
                  className="input"
                  value={form.fleetSize}
                  onChange={(e) => update('fleetSize', e.target.value)}
                >
                  <option value="" disabled>
                    Select one…
                  </option>
                  {fleetSizeOptions.map((f) => (
                    <option key={f} value={f}>
                      {f}
                    </option>
                  ))}
                </select>
                <p className="mt-1.5 text-xs text-brand-400">
                  This is Windows only — no Mac, no Linux.
                </p>
              </div>

              <div>
                <label className="label" htmlFor="currentTool">
                  What do you use today?
                </label>
                <input
                  id="currentTool"
                  className="input"
                  placeholder="e.g. nothing, a spreadsheet, Intune, another RMM"
                  value={form.currentTool}
                  onChange={(e) => update('currentTool', e.target.value)}
                />
              </div>

              <div>
                <label className="label" htmlFor="needToAnswer">
                  What question do you need to be able to answer? *
                </label>
                <textarea
                  id="needToAnswer"
                  required
                  rows={4}
                  className="input"
                  placeholder="e.g. our insurer asked whether every laptop is encrypted and patched, and I cannot prove it"
                  value={form.needToAnswer}
                  onChange={(e) => update('needToAnswer', e.target.value)}
                />
              </div>

              <div>
                <label className="label">Preferred contact method</label>
                <div className="flex flex-wrap gap-2">
                  {contactMethods.map((m) => (
                    <button
                      type="button"
                      key={m}
                      onClick={() => update('preferredContact', m)}
                      className={`rounded-lg border px-4 py-2 text-sm font-medium transition ${
                        form.preferredContact === m
                          ? 'border-accent bg-accent/15 text-white'
                          : 'border-brand-700 text-brand-300 hover:border-brand-500'
                      }`}
                    >
                      {m}
                    </button>
                  ))}
                </div>
              </div>

              <label className="flex items-start gap-3 text-sm text-brand-200">
                <input
                  type="checkbox"
                  checked={form.consent}
                  onChange={(e) => update('consent', e.target.checked)}
                  className="mt-0.5 h-4 w-4 rounded border-brand-600 bg-brand-950 text-accent focus:ring-accent"
                />
                <span>
                  I consent to Bokgoni Tech storing these details and contacting me about this
                  request. *
                </span>
              </label>

              {error && (
                <p className="rounded-lg border border-red-500/40 bg-red-500/10 px-4 py-3 text-sm text-red-200">
                  {error}
                </p>
              )}

              <button
                type="submit"
                disabled={status === 'submitting' || !isFirebaseConfigured}
                className="btn-primary w-full"
              >
                {status === 'submitting' ? 'Submitting…' : 'Request a pilot'}
              </button>
            </form>
          </div>
        </div>
      </section>
    </>
  )
}
