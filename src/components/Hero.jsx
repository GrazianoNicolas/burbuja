import { highlights, stats } from '../data.js'

export default function Hero() {
  return (
    <section
      id="inicio"
      className="bg-[radial-gradient(1200px_600px_at_80%_-10%,var(--color-accent-soft),transparent),linear-gradient(180deg,#fff_0%,var(--color-bg-alt)_100%)]
        pt-15 pb-14 md:pt-24 md:pb-20"
    >
      <div className="container-page grid items-center gap-14 md:grid-cols-[1.1fr_0.9fr]">
        <div>
          <span className="mb-5.5 inline-block rounded-full bg-accent-soft px-4 py-1.5 text-[0.82rem] font-semibold text-accent">
            Consultoría &amp; estrategia empresarial
          </span>
          <h1 className="mb-5 text-[clamp(2.1rem,4vw,3.3rem)] leading-[1.12] font-bold tracking-tight text-primary">
            Impulsamos tu negocio con soluciones profesionales a medida
          </h1>
          <p className="mb-8 max-w-[520px] text-lg text-muted">
            Acompañamos a empresas y emprendedores a tomar mejores decisiones, optimizar procesos
            y crecer de forma sostenible. Resultados claros, sin vueltas.
          </p>
          <div className="flex flex-wrap gap-4">
            <a href="#contacto" className="btn-primary">Solicitar propuesta</a>
            <a href="#servicios" className="btn-outline">Ver servicios</a>
          </div>
        </div>

        <div className="rounded-[20px] border border-line bg-white p-7 shadow-lift">
          {highlights.map((h) => (
            <div key={h.title} className="flex items-center gap-3.5 border-b border-line py-3.5 last:border-b-0">
              <div className="grid size-[42px] place-items-center rounded-[10px] bg-accent-soft text-xl">{h.icon}</div>
              <div>
                <div className="text-[0.95rem] font-semibold">{h.title}</div>
                <div className="text-[0.82rem] text-muted">{h.sub}</div>
              </div>
            </div>
          ))}
          <div className="mt-5.5 flex flex-wrap gap-3.5">
            {stats.map((s) => (
              <div key={s.label} className="min-w-[120px] flex-1 rounded-xl bg-bg-alt p-4.5 text-center">
                <div className="text-[1.7rem] font-extrabold text-accent">{s.num}</div>
                <div className="text-[0.82rem] text-muted">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
