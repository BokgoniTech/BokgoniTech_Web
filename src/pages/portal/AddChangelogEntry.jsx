import { useState } from 'react'
import { Link } from 'react-router-dom'
import Icon from '../../components/Icon'
import NotConfigured from '../../components/NotConfigured'
import { changelogAreas } from '../../lib/siteConfig'
import { addChangelogEntry } from '../../lib/db'
import { isFirebaseConfigured } from '../../lib/firebase'

const STATES = ['Shipped', 'Verified on a real machine', 'Behind a flag']

const empty = {
  title: '',
  area: 'agent',
  date: new Date().toISOString().slice(0, 10),
  version: '',
  summary: '',
  detail: '',
  why: '',
  state: 'Shipped',
  isPublic: true,
}

export default function AddChangelogEntry() {
  const [form, setForm] = useState(empty)
  const [imageFiles, setImageFiles] = useState([])
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
      await addChangelogEntry(form, { imageFiles })
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
    setImageFiles([])
    setDone(false)
  }

  if (done) {
    return (
      <div className="space-y-6">
        <div className="card text-center">
          <span className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-accent/15 text-accent">
            <Icon name="check" className="h-8 w-8" />
          </span>
          <h1 className="mt-4 text-xl font-bold text-white">Changelog entry saved</h1>
          <p className="mt-2 text-brand-300">
            {form.isPublic
              ? 'It is now visible on the public changelog.'
              : 'Saved as private — not shown publicly.'}
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <button onClick={reset} className="btn-primary">
              <Icon name="plus" className="h-4 w-4" /> Add another
            </button>
            <Link to="/changelog" className="btn-secondary">
              View public changelog
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <header>
        <p className="eyebrow mb-1">Add changelog entry</p>
        <h1 className="text-2xl font-bold text-white">New changelog entry</h1>
        <p className="mt-1 text-sm text-brand-400">
          Only publish what actually works. If it is behind a flag or unverified, say so in the
          state field rather than leaving it to be assumed.
        </p>
      </header>

      {!isFirebaseConfigured && <NotConfigured feature="Adding changelog entries" />}

      <form onSubmit={handleSubmit} className="card space-y-5">
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <label className="label">Title *</label>
            <input
              required
              className="input"
              placeholder="e.g. Patch installation reports each update individually"
              value={form.title}
              onChange={(e) => update('title', e.target.value)}
            />
          </div>
          <div>
            <label className="label">Area *</label>
            <select className="input" value={form.area} onChange={(e) => update('area', e.target.value)}>
              {changelogAreas.map((a) => (
                <option key={a.value} value={a.value}>
                  {a.label}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="label">Date</label>
            <input
              type="date"
              className="input"
              value={form.date}
              onChange={(e) => update('date', e.target.value)}
            />
          </div>
          <div>
            <label className="label">Version / commit (optional)</label>
            <input
              className="input"
              placeholder="v0.1.0 or a short SHA"
              value={form.version}
              onChange={(e) => update('version', e.target.value)}
            />
          </div>
          <div>
            <label className="label">State</label>
            <select
              className="input"
              value={form.state}
              onChange={(e) => update('state', e.target.value)}
            >
              {STATES.map((s) => (
                <option key={s}>{s}</option>
              ))}
            </select>
          </div>
        </div>

        <Textarea
          label="Summary"
          value={form.summary}
          onChange={(v) => update('summary', v)}
          placeholder="One or two sentences a customer would understand."
        />
        <Textarea label="What changed" value={form.detail} onChange={(v) => update('detail', v)} />
        <Textarea
          label="Why it matters"
          value={form.why}
          onChange={(v) => update('why', v)}
          placeholder="What it stops going wrong. Leave blank rather than inventing one."
        />

        <div>
          <label className="label">Screenshots (optional)</label>
          <input
            type="file"
            accept="image/*"
            multiple
            className="block w-full text-sm text-brand-300 file:mr-4 file:rounded-lg file:border-0 file:bg-brand-700 file:px-4 file:py-2 file:text-sm file:font-medium file:text-white hover:file:bg-brand-600"
            onChange={(e) => setImageFiles(Array.from(e.target.files || []))}
          />
          {imageFiles.length > 0 && (
            <p className="mt-1 text-xs text-brand-400">{imageFiles.length} selected</p>
          )}
          <p className="mt-1.5 text-xs text-brand-400">
            Screenshots are public. Check for customer hostnames, usernames and IP addresses first.
          </p>
        </div>

        <div>
          <label className="label">Visibility</label>
          <div className="flex gap-2">
            {[
              { k: true, l: 'Public' },
              { k: false, l: 'Private' },
            ].map((opt) => (
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

        {error && (
          <p className="rounded-lg border border-red-500/40 bg-red-500/10 px-4 py-3 text-sm text-red-200">
            {error}
          </p>
        )}

        <button type="submit" disabled={saving || !isFirebaseConfigured} className="btn-primary w-full">
          {saving ? 'Saving…' : 'Save changelog entry'}
        </button>
      </form>
    </div>
  )
}

function Textarea({ label, value, onChange, placeholder }) {
  return (
    <div>
      <label className="label">{label}</label>
      <textarea
        rows={2}
        className="input"
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  )
}
