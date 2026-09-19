import { Link } from 'react-router-dom'

export default function Logo({ to = '/', className = '' }) {
  return (
    <Link to={to} className={`group inline-flex items-center gap-2.5 ${className}`}>
      <span className="grid h-9 w-9 place-items-center rounded-lg bg-accent text-brand-950 shadow-glow">
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 7h7a4 4 0 0 1 0 8H4V7Zm0 8h8a4 4 0 0 1 0 8H4v-8Z" />
        </svg>
      </span>
      <span className="flex flex-col leading-none">
        <span className="text-base font-extrabold tracking-tight text-white">
          BOKGONI<span className="text-accent"> TECH</span>
        </span>
        <span className="text-[10px] font-medium uppercase tracking-[0.22em] text-brand-300">
          Windows endpoint management
        </span>
      </span>
    </Link>
  )
}
