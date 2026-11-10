import Logo from './Logo.jsx'

const columns = [
  {
    title: 'Servicios',
    links: [
      ['#servicios', 'Consultoría estratégica'],
      ['#servicios', 'Optimización de procesos'],
      ['#servicios', 'Análisis de datos'],
      ['#servicios', 'Transformación digital'],
    ],
  },
  {
    title: 'Empresa',
    links: [
      ['#nosotros', 'Nosotros'],
      ['#contacto', 'Contacto'],
      ['#inicio', 'Inicio'],
    ],
  },
]

export default function Footer() {
  return (
    <footer className="bg-primary-dark pt-14 pb-7 text-white/80">
      <div className="container-page">
        <div className="mb-9 grid gap-7 md:grid-cols-[2fr_1fr_1fr] md:gap-10">
          <div>
            <div className="mb-3.5"><Logo light /></div>
            <p className="max-w-[320px] text-[0.92rem]">
              Soluciones profesionales para empresas que quieren crecer con estrategia, datos y un equipo que las acompaña.
            </p>
          </div>
          {columns.map((col) => (
            <div key={col.title}>
              <h4 className="mb-4 text-[0.95rem] font-bold text-white">{col.title}</h4>
              {col.links.map(([href, label]) => (
                <a key={label} href={href} className="mb-2.5 block text-[0.92rem] text-white/70 transition-colors hover:text-white">
                  {label}
                </a>
              ))}
            </div>
          ))}
        </div>
        <div className="border-t border-white/10 pt-5.5 text-center text-sm text-white/55">
          © {new Date().getFullYear()} Nexo Consultores. Todos los derechos reservados.
        </div>
      </div>
    </footer>
  )
}
