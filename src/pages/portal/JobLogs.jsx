import { useEffect, useState } from 'react'
import Icon from '../../components/Icon'
import NotConfigured from '../../components/NotConfigured'
import { getJobs, addJob, formatDate } from '../../lib/db'
import { isFirebaseConfigured } from '../../lib/firebase'

const STATUSES = [
  'Received',
  'Diagnosing',
  'Quoted',
  'Awaiting parts',
  'In repair',
  'Testing',
  'Ready for collection',
  'Collected',
]

const STATUS_STYLES = {
  'Ready for collection': 'border-green-500/40 bg-green-500/10 text-green-200',
  Collected: 'border-brand-600 bg-brand-800/60 text-brand-300',
  'Awaiting parts': 'border-amber-500/40 bg-amber-500/10 text-amber-200',
}

const emptyJob = {
  jobId: '',
  dateReceived: new Date().toISOString().slice(0, 10),
  customerName: 'Private',
  contactNumber: '',
  deviceModel: '',
  reportedProblem: '',
  conditionBefore: '',
  quote: '',
  depositPaid: 'No',
  partsUsed: '',
  technician: '',
  workCompleted: '',
  testResults: '',
  conditionAfter: '',
  warrantyDays: '',
  status: 'Received',
}

export default function JobLogs() {
  const [jobs, setJobs] = useState([])
  const [loading, setLoading] = useState(isFirebaseConfigured)
  const [showForm, setShowForm] = useState(false)
  const [form, setForm] = useState(emptyJob)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    if (!isFirebaseConfigured) return
    refresh()
  }, [])

  function refresh() {
    setLoading(true)
    getJobs()
      .then(setJobs)
      .catch(console.error)
      .finally(() => setLoading(false))
  }

  function update(field, value) {
    setForm((f) => ({ ...f, [field]: value }))
  }

  async function handleSave(e) {
    e.preventDefault()
    setError('')
    setSaving(true)
    try {
      // Auto-generate a job ID if left blank (BT-R-0001 style).
      const jobId = form.jobId || `BT-R-${String(jobs.length + 1).padStart(4, '0')}`
      await addJob({ ...form, jobId })
      setForm(emptyJob)
      setShowForm(false)
      refresh()
    } catch (err) {
      setError(err.message)
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="space-y-6">
      <header className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="eyebrow mb-1">Repair Jobs</p>
          <h1 className="text-2xl font-bold text-white">Internal repair records</h1>
          <p className="mt-1 text-sm text-brand-400">
            Private records — never shown publicly. Keep customer identifiers here only.
          </p>
        </div>
        <button
          onClick={() => setShowForm((v) => !v)}
          className="btn-primary"
          disabled={!isFirebaseConfigured}
        >
          <Icon name={showForm ? 'close' : 'plus'} className="h-4 w-4" />
          {showForm ? 'Cancel' : 'New job'}
        </button>
      </header>

      {!isFirebaseConfigured && <NotConfigured feature="Repair job records" />}

      {showForm && (
        <form onSubmit={handleSave} className="card space-y-4">
          <p className="eyebrow">New repair job</p>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Job ID (auto if blank)" value={form.jobId} onChange={(v) => update('jobId', v)} placeholder="BT-R-0001" />
            <Field label="Date received" type="date" value={form.dateReceived} onChange={(v) => update('dateReceived', v)} />
            <Field label="Customer name (private)" value={form.customerName} onChange={(v) => update('customerName', v)} />
            <Field label="Contact number (private)" value={form.contactNumber} onChange={(v) => update('contactNumber', v)} />
            <Field label="Device brand / model" value={form.deviceModel} onChange={(v) => update('deviceModel', v)} />
            <Field label="Technician" value={form.technician} onChange={(v) => update('technician', v)} />
            <Field label="Quote (R)" value={form.quote} onChange={(v) => update('quote', v)} />
            <div>
              <label className="label">Deposit paid</label>
              <select className="input" value={form.depositPaid} onChange={(e) => update('depositPaid', e.target.value)}>
                <option>No</option>
                <option>Yes</option>
              </select>
            </div>
            <div>
              <label className="label">Status</label>
              <select className="input" value={form.status} onChange={(e) => update('status', e.target.value)}>
                {STATUSES.map((s) => <option key={s}>{s}</option>)}
              </select>
            </div>
            <Field label="Warranty (days)" value={form.warrantyDays} onChange={(v) => update('warrantyDays', v)} />
          </div>
          <Field label="Reported problem" value={form.reportedProblem} onChange={(v) => update('reportedProblem', v)} textarea />
          <Field label="Condition before" value={form.conditionBefore} onChange={(v) => update('conditionBefore', v)} textarea />
          <Field label="Parts used" value={form.partsUsed} onChange={(v) => update('partsUsed', v)} />
          <Field label="Work completed" value={form.workCompleted} onChange={(v) => update('workCompleted', v)} textarea />
          <Field label="Test results" value={form.testResults} onChange={(v) => update('testResults', v)} placeholder="Touch, display, charging, camera" />
          <Field label="Condition after" value={form.conditionAfter} onChange={(v) => update('conditionAfter', v)} textarea />

          {error && <p className="text-sm text-red-300">{error}</p>}
          <button type="submit" disabled={saving} className="btn-primary">
            {saving ? 'Saving…' : 'Save job'}
          </button>
        </form>
      )}

      {loading ? (
        <p className="text-sm text-brand-400">Loading…</p>
      ) : jobs.length === 0 ? (
        <div className="card border-dashed py-12 text-center text-brand-400">
          No repair jobs recorded yet.
        </div>
      ) : (
        <div className="overflow-x-auto rounded-2xl border border-brand-700/70">
          <table className="w-full text-left text-sm">
            <thead className="bg-brand-900/60 text-brand-200">
              <tr>
                <th className="px-4 py-3 font-semibold">Job ID</th>
                <th className="px-4 py-3 font-semibold">Device</th>
                <th className="px-4 py-3 font-semibold">Problem</th>
                <th className="px-4 py-3 font-semibold">Status</th>
                <th className="px-4 py-3 font-semibold">Received</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-brand-800">
              {jobs.map((j) => (
                <tr key={j.id} className="hover:bg-brand-900/40">
                  <td className="px-4 py-3 font-mono text-xs text-accent">{j.jobId}</td>
                  <td className="px-4 py-3 text-white">{j.deviceModel || '—'}</td>
                  <td className="px-4 py-3 text-brand-300">{j.reportedProblem || '—'}</td>
                  <td className="px-4 py-3">
                    <span className={`badge text-[10px] ${STATUS_STYLES[j.status] || ''}`}>
                      {j.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-brand-400">
                    {j.dateReceived ? formatDate(j.dateReceived) : formatDate(j.createdAt)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}

function Field({ label, value, onChange, type = 'text', placeholder, textarea }) {
  return (
    <div className={textarea ? '' : ''}>
      <label className="label">{label}</label>
      {textarea ? (
        <textarea rows={2} className="input" value={value} placeholder={placeholder} onChange={(e) => onChange(e.target.value)} />
      ) : (
        <input type={type} className="input" value={value} placeholder={placeholder} onChange={(e) => onChange(e.target.value)} />
      )}
    </div>
  )
}
