import Icon from './Icon'

// One place that decides how build state is rendered, so "not started" never
// quietly becomes a dash that reads like a zero — the same rule the product
// itself follows.
const styles = {
  built: {
    label: 'Built',
    icon: 'check',
    className: 'border-green-500/40 bg-green-500/10 text-green-200',
  },
  'built-hidden': {
    label: 'Built, switched off',
    icon: 'minus',
    className: 'border-amber-500/40 bg-amber-500/10 text-amber-200',
  },
  'not-started': {
    label: 'Not started',
    icon: 'warn',
    className: 'border-brand-600 bg-brand-800/60 text-brand-300',
  },
}

export default function StateBadge({ state, className = '' }) {
  const style = styles[state]
  if (!style) return null
  return (
    <span className={`badge gap-1.5 text-[11px] ${style.className} ${className}`}>
      <Icon name={style.icon} className="h-3.5 w-3.5" strokeWidth={2} />
      {style.label}
    </span>
  )
}
