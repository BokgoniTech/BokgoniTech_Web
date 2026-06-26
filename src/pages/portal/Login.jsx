import { useState, useEffect } from 'react'
import { useNavigate, useLocation, Link } from 'react-router-dom'
import Logo from '../../components/Logo'
import NotConfigured from '../../components/NotConfigured'
import { useAuth } from '../../context/AuthContext'

export default function Login() {
  const { signIn, user, loading, isFirebaseConfigured } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const from = location.state?.from?.pathname || '/portal'

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)

  // If already signed in, skip the form.
  useEffect(() => {
    if (!loading && user) navigate(from, { replace: true })
  }, [loading, user, from, navigate])

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    setSubmitting(true)
    try {
      await signIn(email, password)
      navigate(from, { replace: true })
    } catch (err) {
      setError(friendlyError(err.code))
      setSubmitting(false)
    }
  }

  return (
    <div className="grid min-h-screen place-items-center bg-brand-950 px-5">
      <div className="w-full max-w-sm">
        <div className="mb-8 flex justify-center">
          <Logo to="/" />
        </div>

        <div className="card">
          <h1 className="text-xl font-bold text-white">Staff sign in</h1>
          <p className="mt-1 text-sm text-brand-400">Private portal — authorised staff only.</p>

          {!isFirebaseConfigured && (
            <div className="mt-5">
              <NotConfigured feature="The portal login" />
            </div>
          )}

          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <div>
              <label className="label" htmlFor="email">Email</label>
              <input
                id="email"
                type="email"
                required
                autoComplete="username"
                className="input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label className="label" htmlFor="password">Password</label>
              <input
                id="password"
                type="password"
                required
                autoComplete="current-password"
                className="input"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            {error && (
              <p className="rounded-lg border border-red-500/40 bg-red-500/10 px-4 py-2.5 text-sm text-red-200">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={submitting || !isFirebaseConfigured}
              className="btn-primary w-full"
            >
              {submitting ? 'Signing in…' : 'Sign in'}
            </button>
          </form>
        </div>

        <p className="mt-6 text-center text-sm text-brand-400">
          <Link to="/" className="hover:text-accent">← Back to website</Link>
        </p>
      </div>
    </div>
  )
}

function friendlyError(code) {
  switch (code) {
    case 'auth/invalid-email':
      return 'That email address is not valid.'
    case 'auth/user-not-found':
    case 'auth/wrong-password':
    case 'auth/invalid-credential':
      return 'Incorrect email or password.'
    case 'auth/too-many-requests':
      return 'Too many attempts. Please wait a moment and try again.'
    default:
      return 'Could not sign in. Please check your details and try again.'
  }
}
