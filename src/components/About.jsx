import { checklist } from '../data.js'

export default function About() {
  return (
    <section id="nosotros" className="section">
      <div className="container-page grid items-center gap-14 md:grid-cols-2">
        <div>
          <h2 className="mb-4.5 text-[clamp(1.8rem,3vw,2.4rem)] font-bold tracking-tight text-primary">
            Un equipo que trabaja codo a codo con vos
          </h2>
          <p className="mb-4 text-muted">
            En Nexo Consultores creemos que cada negocio es único. Por eso no aplicamos recetas
            genéricas: escuchamos, analizamos y diseñamos soluciones a la medida de tus objetivos.
          </p>
          <p className="mb-4 text-muted">
            Más de una década ayudando a empresas de distintos rubros nos enseñó que los mejores
            resultados nacen de la cercanía, la transparencia y el compromiso.
          </p>
          <ul className="mt-5.5 space-y-3.5">
            {checklist.map((item) => (
              <li key={item} className="flex items-start gap-3 font-medium">
                <span className="font-extrabold text-accent">✓</span> {item}
              </li>
            ))}
          </ul>
        </div>

        <figure className="rounded-[20px] bg-linear-135 from-primary to-primary-dark p-8 text-white shadow-lift md:p-11">
          <blockquote className="mb-5.5 text-xl leading-normal font-medium">
            "Nexo nos ayudó a ordenar la operación y duplicar nuestra capacidad en menos de un año.
            El acompañamiento fue clave."
          </blockquote>
          <figcaption className="flex items-center gap-3.5">
            <div className="grid size-12 place-items-center rounded-full bg-white/20 font-bold">MR</div>
            <div>
              <div className="font-semibold">María Rodríguez</div>
              <div className="text-sm opacity-80">Directora — Grupo Lumen</div>
            </div>
          </figcaption>
        </figure>
      </div>
    </section>
  )
}
