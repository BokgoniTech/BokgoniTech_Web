import { isFirebaseConfigured } from '../lib/firebase'

// Friendly banner shown where live data is expected but Firebase isn't set up yet.
export default function NotConfigured({ feature = 'This feature' }) {
  if (isFirebaseConfigured) return null
  return (
    <div className="card border-amber-500/40 bg-amber-500/5 text-amber-100">
      <p className="font-semibold text-amber-200">⚙️ {feature} needs Firebase</p>
      <p className="mt-1 text-sm text-amber-100/80">
        Add your Firebase keys to a <code className="rounded bg-brand-950/60 px-1.5 py-0.5">.env.local</code> file
        (copy <code className="rounded bg-brand-950/60 px-1.5 py-0.5">.env.example</code>) and restart the dev
        server. See <code className="rounded bg-brand-950/60 px-1.5 py-0.5">SETUP.md</code> for step-by-step
        instructions.
      </p>
    </div>
  )
}
