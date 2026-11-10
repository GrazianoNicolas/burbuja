export default function SectionHead({ eyebrow, title, children }) {
  return (
    <div className="mx-auto mb-14 max-w-[640px] text-center">
      <span className="text-[0.82rem] font-bold uppercase tracking-[0.08em] text-accent">{eyebrow}</span>
      <h2 className="mt-2.5 mb-3.5 text-[clamp(1.8rem,3vw,2.5rem)] font-bold tracking-tight text-primary">{title}</h2>
      <p className="text-[1.05rem] text-muted">{children}</p>
    </div>
  )
}
