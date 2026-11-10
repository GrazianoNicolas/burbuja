import SectionHead from './SectionHead.jsx'
import { services } from '../data.js'

export default function Services() {
  return (
    <section id="servicios" className="section bg-bg-alt">
      <div className="container-page">
        <SectionHead eyebrow="Qué hacemos" title="Servicios pensados para tu crecimiento">
          Combinamos experiencia, datos y un enfoque práctico para resolver los desafíos reales de tu organización.
        </SectionHead>

        <div className="grid gap-6.5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s) => (
            <div
              key={s.title}
              className="rounded-[14px] border border-line bg-white px-7 py-8 transition duration-200 hover:-translate-y-1.5 hover:shadow-soft"
            >
              <div className="mb-5 grid size-[52px] place-items-center rounded-[13px] bg-linear-135 from-accent to-primary text-2xl">
                {s.icon}
              </div>
              <h3 className="mb-2.5 text-xl font-bold text-primary">{s.title}</h3>
              <p className="text-[0.96rem] text-muted">{s.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
