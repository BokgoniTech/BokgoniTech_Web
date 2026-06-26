import { useState } from 'react'
import { Link } from 'react-router-dom'
import Icon from '../../components/Icon'
import NotConfigured from '../../components/NotConfigured'
import { activityCategories } from '../../lib/siteConfig'
import { addActivity } from '../../lib/db'
import { isFirebaseConfigured } from '../../lib/firebase'

const empty = {
  title: '',
  category: 'repair',
  date: new Date().toISOString().slice(0, 10),
  customerVisibility: 'Private customer',
  deviceType: '',
  problem: '',
  before: '',
  work: '',
  after: '',
  testing: '',
  status: 'Completed',
  isPublic: true,
}

export default function AddActivity() {
  const [form, setForm] = useState(empty)
  const [beforeFiles, setBeforeFiles] = useState([])
  const [afterFiles, setAfterFiles] = useState([])
  const [saving, setSaving] = useState(false)
  const [done, setDone] = useState(false)
  const [error, setError] = useState('')

  function update(field, value) {
    setForm((f) => ({ ...f, [field]: value }))
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    setSaving(true)
    try {
      await addActivity(form, { beforeFiles, afterFiles })
      setDone(true)
      window.scrollTo({ top: 0 })
    } catch (err) {
      console.error(err)
      setError(err.message)
    } finally {
      setSaving(false)
    }
  }

  function reset() {
    setForm(empty)
    setBeforeFiles([])
    setAfterFiles([])
    setDone(false)
  }

  if (done) {
    return (
      <div className="space-y-6">
        <div className="card text-center">
          <span className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-accent/15 text-accent">
            <Icon name="check" className="h-8 w-8" />
          </span>
          <h1 className="mt-4 text-xl font-bold text-white">Activity entry saved</h1>
          <p className="mt-2 text-brand-300">
            {form.isPublic
              ? 'It is now visible on the public Activity Log.'
              : 'Saved as private — not shown publicly.'}
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <button onClick={reset} className="btn-primary">
              <Icon name="plus" className="h-4 w-4" /> Add another
            </button>
            <Link to="/activity" className="btn-secondary">View public log</Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <header>
        <p className="eyebrow mb-1">Add Activity</p>
        <h1 className="text-2xl font-bold text-white">New activity log entry</h1>
        <p className="mt-1 text-sm text-brand-400">
          Create a portfolio entry from real work. Never include private identifiers (names,
          numbers, IMEI/serial) in public entries.
        </p>
      </header>

      {!isFirebaseConfigured && <NotConfigured feature="Adding activity entries" />}

      <form onSubmit={handleSubmit} className="card space-y-5">
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <label className="label">Title *</label>
            <input
              required
              className="input"
              placeholder="e.g. Samsung Galaxy Screen Replacement"
              value={form.title}
              onChange={(e) => update('title', e.target.value)}
            />
          </div>
          <div>
            <label className="label">Category *</label>
            <select className="input" value={form.category} onChange={(e) => update('category', e.target.value)}>
              {activityCategories.map((c) => (
                <option key={c.value} value={c.value}>{c.label}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="label">Date</label>
            <input type="date" className="input" value={form.date} onChange={(e) => update('date', e.target.value)} />
          </div>
          <div>
            <label className="label">Customer visibility</label>
            <input
              className="input"
              placeholder="Private customer"
              value={form.customerVisibility}
              onChange={(e) => update('customerVisibility', e.target.value)}
            />
          </div>
          <div>
            <label className="label">Device / system type</label>
            <input
              className="input"
              placeholder="Samsung Galaxy A-series"
              value={form.deviceType}
              onChange={(e) => update('deviceType', e.target.value)}
            />
          </div>
        </div>

        <Textarea label="Problem" value={form.problem} onChange={(v) => update('problem', v)} />
        <Textarea label="Condition before" value={form.before} onChange={(v) => update('before', v)} />
        <Textarea label="Work completed" value={form.work} onChange={(v) => update('work', v)} />
        <Textarea label="Condition after" value={form.after} onChange={(v) => update('after', v)} />
        <Textarea label="Testing completed" value={form.testing} onChange={(v) => update('testing', v)} placeholder="Touch, display, charging, camera" />

        <div className="grid gap-4 sm:grid-cols-2">
          <FileField label="Before photos" files={beforeFiles} onChange={setBeforeFiles} />
          <FileField label="After photos" files={afterFiles} onChange={setAfterFiles} />
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="label">Status</label>
            <select className="input" value={form.status} onChange={(e) => update('status', e.target.value)}>
              <option>Completed</option>
              <option>In progress</option>
            </select>
          </div>
          <div>
            <label className="label">Visibility</label>
            <div className="flex gap-2">
              {[{ k: true, l: 'Public' }, { k: false, l: 'Private' }].map((opt) => (
                <button
                  type="button"
                  key={opt.l}
                  onClick={() => update('isPublic', opt.k)}
                  className={`flex-1 rounded-lg border px-4 py-2.5 text-sm font-medium transition ${
                    form.isPublic === opt.k
                      ? 'border-accent bg-accent/15 text-white'
                      : 'border-brand-700 text-brand-300 hover:border-brand-500'
                  }`}
                >
                  {opt.l}
                </button>
              ))}
            </div>
          </div>
        </div>

        {error && (
          <p className="rounded-lg border border-red-500/40 bg-red-500/10 px-4 py-3 text-sm text-red-200">
            {error}
          </p>
        )}

        <button type="submit" disabled={saving || !isFirebaseConfigured} className="btn-primary w-full">
          {saving ? 'Saving…' : 'Save activity entry'}
        </button>
      </form>
    </div>
  )
}

function Textarea({ label, value, onChange, placeholder }) {
  return (
    <div>
      <label className="label">{label}</label>
      <textarea rows={2} className="input" value={value} placeholder={placeholder} onChange={(e) => onChange(e.target.value)} />
    </div>
  )
}

function FileField({ label, files, onChange }) {
  return (
    <div>
      <label className="label">{label}</label>
      <input
        type="file"
        accept="image/*"
        multiple
        className="block w-full text-sm text-brand-300 file:mr-4 file:rounded-lg file:border-0 file:bg-brand-700 file:px-4 file:py-2 file:text-sm file:font-medium file:text-white hover:file:bg-brand-600"
        onChange={(e) => onChange(Array.from(e.target.files || []))}
      />
      {files.length > 0 && <p className="mt-1 text-xs text-brand-400">{files.length} selected</p>}
    </div>
  )
}
