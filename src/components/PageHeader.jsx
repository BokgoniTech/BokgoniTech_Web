export default function PageHeader({ eyebrow, title, subtitle, children }) {
  return (
    <section className="relative overflow-hidden border-b border-brand-800/70 bg-brand-900/40">
      <div className="container-bt py-14 sm:py-20">
        {eyebrow && <p className="eyebrow mb-3">{eyebrow}</p>}
        <h1 className="max-w-3xl text-3xl font-extrabold tracking-tight text-white sm:text-4xl lg:text-5xl">
          {title}
        </h1>
        {subtitle && (
          <p className="mt-4 max-w-2xl text-base text-brand-300 sm:text-lg">{subtitle}</p>
        )}
        {children && <div className="mt-6">{children}</div>}
      </div>
    </section>
  )
}
