export default function CtaBand() {
  return (
    <section className="section bg-accent">
      <div className="container-page text-center">
        <h2 className="mb-3.5 text-[clamp(1.7rem,3vw,2.3rem)] font-bold tracking-tight text-white">
          ¿Listo para dar el próximo paso?
        </h2>
        <p className="mb-7 text-[1.08rem] text-white/90">
          Agendá una consulta gratuita y conversemos sobre cómo podemos ayudarte.
        </p>
        <a
          href="#contacto"
          className="btn bg-white text-accent shadow-[0_8px_22px_rgba(0,0,0,0.18)] hover:-translate-y-0.5 hover:bg-[#f3f7ff]"
        >
          Agendar consulta gratuita
        </a>
      </div>
    </section>
  )
}
