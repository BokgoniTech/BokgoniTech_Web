import { useState } from 'react'
import { Link } from 'react-router-dom'
import PageHeader from '../components/PageHeader'
import NotConfigured from '../components/NotConfigured'
import Icon from '../components/Icon'
import { serviceNeededOptions, contactMethods, whatsappLink } from '../lib/siteConfig'
import { submitRequest } from '../lib/db'
import { isFirebaseConfigured } from '../lib/firebase'

const REPAIR_SERVICES = ['Phone repair', 'Laptop repair']

const empty = {
  service: '',
  name: '',
  businessName: '',
  phone: '',
  email: '',
  systemType: '',
  problem: '',
  preferredContact: 'WhatsApp',
  consent: false,
  // repair-specific
  deviceBrand: '',
  deviceModel: '',
  problemType: '',
  openedBefore: '',
  powersOn: '',
  screenDisplays: '',
}

export default function RequestService() {
  const [form, setForm] = useState(empty)
  const [photos, setPhotos] = useState([])
  const [status, setStatus] = useState('idle') // idle | submitting | done | error
  const [error, setError] = useState('')

  const isRepair = REPAIR_SERVICES.includes(form.service)

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
      await submitRequest(form, { photoFiles: photos })
      setStatus('done')
      window.scrollTo({ top: 0 })
    } catch (err) {
      console.error(err)
      setError(err.message || 'Something went wrong. Please try WhatsApp instead.')
      setStatus('error')
    }
  }

  if (status === 'done') {
    return (
      <>
        <PageHeader eyebrow="Request a Service" title="Request received" />
        <section className="section">
          <div className="container-bt max-w-xl">
            <div className="card text-center">
              <span className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-accent/15 text-accent">
                <Icon name="check" className="h-8 w-8" />
              </span>
              <h2 className="mt-4 text-xl font-bold text-white">Thank you!</h2>
              <p className="mt-2 text-brand-300">
                We’ve received your request and will be in touch via your preferred method. For
                anything urgent, message us on WhatsApp.
              </p>
              <div className="mt-6 flex flex-wrap justify-center gap-3">
                <a href={whatsappLink()} target="_blank" rel="noreferrer" className="btn-primary">
                  <Icon name="whatsapp" className="h-4 w-4" /> WhatsApp us
                </a>
                <Link to="/" className="btn-secondary">Back to home</Link>
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
        eyebrow="Request a Service"
        title="Tell us what you need"
        subtitle="Fill this in and we’ll get back to you with next steps or a quote. Fields marked * are required."
      />

      <section className="section">
        <div className="container-bt max-w-2xl">
          {!isFirebaseConfigured && (
            <div className="mb-6">
              <NotConfigured feature="The request form" />
              <p className="mt-3 text-sm text-brand-400">
                In the meantime you can reach us directly on{' '}
                <a href={whatsappLink()} target="_blank" rel="noreferrer" className="text-accent hover:underline">
                  WhatsApp
                </a>
                .
              </p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="card space-y-6">
            {/* Service needed */}
            <div>
              <label className="label" htmlFor="service">Service needed *</label>
              <select
                id="service"
                required
                className="input"
                value={form.service}
                onChange={(e) => update('service', e.target.value)}
              >
                <option value="" disabled>Select a service…</option>
                {serviceNeededOptions.map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="label" htmlFor="name">Name *</label>
                <input id="name" required className="input" value={form.name} onChange={(e) => update('name', e.target.value)} />
              </div>
              <div>
                <label className="label" htmlFor="businessName">Business name (optional)</label>
                <input id="businessName" className="input" value={form.businessName} onChange={(e) => update('businessName', e.target.value)} />
              </div>
              <div>
                <label className="label" htmlFor="phone">Phone number *</label>
                <input id="phone" type="tel" required className="input" value={form.phone} onChange={(e) => update('phone', e.target.value)} />
              </div>
              <div>
                <label className="label" htmlFor="email">Email address</label>
                <input id="email" type="email" className="input" value={form.email} onChange={(e) => update('email', e.target.value)} />
              </div>
            </div>

            <div>
              <label className="label" htmlFor="systemType">Device type / business system</label>
              <input id="systemType" className="input" placeholder="e.g. Samsung A14, office Wi-Fi, booking website" value={form.systemType} onChange={(e) => update('systemType', e.target.value)} />
            </div>

            <div>
              <label className="label" htmlFor="problem">Describe the problem *</label>
              <textarea id="problem" required rows={4} className="input" value={form.problem} onChange={(e) => update('problem', e.target.value)} />
            </div>

            {/* Repair-specific fields */}
            {isRepair && (
              <div className="rounded-xl border border-brand-700 bg-brand-950/40 p-4">
                <p className="eyebrow mb-4">Repair details</p>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="label" htmlFor="deviceBrand">Device brand</label>
                    <input id="deviceBrand" className="input" value={form.deviceBrand} onChange={(e) => update('deviceBrand', e.target.value)} />
                  </div>
                  <div>
                    <label className="label" htmlFor="deviceModel">Device model</label>
                    <input id="deviceModel" className="input" value={form.deviceModel} onChange={(e) => update('deviceModel', e.target.value)} />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="label" htmlFor="problemType">Problem type</label>
                    <input id="problemType" className="input" placeholder="e.g. cracked screen, won't charge" value={form.problemType} onChange={(e) => update('problemType', e.target.value)} />
                  </div>
                  <YesNo label="Has the device been opened before?" value={form.openedBefore} onChange={(v) => update('openedBefore', v)} />
                  <YesNo label="Does the device power on?" value={form.powersOn} onChange={(v) => update('powersOn', v)} />
                  <YesNo label="Can the screen still display an image?" value={form.screenDisplays} onChange={(v) => update('screenDisplays', v)} />
                </div>
              </div>
            )}

            {/* Photos */}
            <div>
              <label className="label" htmlFor="photos">Upload photos (optional)</label>
              <input
                id="photos"
                type="file"
                accept="image/*"
                multiple
                className="block w-full text-sm text-brand-300 file:mr-4 file:rounded-lg file:border-0 file:bg-brand-700 file:px-4 file:py-2 file:text-sm file:font-medium file:text-white hover:file:bg-brand-600"
                onChange={(e) => setPhotos(Array.from(e.target.files || []))}
              />
              {photos.length > 0 && (
                <p className="mt-1 text-xs text-brand-400">{photos.length} photo(s) selected</p>
              )}
            </div>

            {/* Preferred contact */}
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

            {/* Consent */}
            <label className="flex items-start gap-3 text-sm text-brand-200">
              <input
                type="checkbox"
                checked={form.consent}
                onChange={(e) => update('consent', e.target.checked)}
                className="mt-0.5 h-4 w-4 rounded border-brand-600 bg-brand-950 text-accent focus:ring-accent"
              />
              <span>
                I consent to Bokgoni Tech storing these details and contacting me about my
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
              {status === 'submitting' ? 'Submitting…' : 'Submit Request'}
            </button>
          </form>
        </div>
      </section>
    </>
  )
}

function YesNo({ label, value, onChange }) {
  return (
    <div className="sm:col-span-2">
      <span className="label">{label}</span>
      <div className="flex gap-2">
        {['Yes', 'No', 'Not sure'].map((opt) => (
          <button
            type="button"
            key={opt}
            onClick={() => onChange(opt)}
            className={`rounded-lg border px-3 py-1.5 text-sm transition ${
              value === opt
                ? 'border-accent bg-accent/15 text-white'
                : 'border-brand-700 text-brand-300 hover:border-brand-500'
            }`}
          >
            {opt}
          </button>
        ))}
      </div>
    </div>
  )
}
