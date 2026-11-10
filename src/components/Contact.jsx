import { useState } from 'react'
import SectionHead from './SectionHead.jsx'
import { contactItems } from '../data.js'

const inputClass =
  'w-full rounded-[10px] border border-line bg-white px-4 py-3 text-[0.95rem] transition outline-none focus:border-accent focus:ring-3 focus:ring-accent/15'

function Field({ id, label, textarea = false, ...props }) {
  const Tag = textarea ? 'textarea' : 'input'
  return (
    <div className="mb-4.5">
      <label htmlFor={id} className="mb-1.5 block text-sm font-semibold text-primary">{label}</label>
      <Tag id={id} name={id} required className={`${inputClass} ${textarea ? 'min-h-[110px] resize-y' : ''}`} {...props} />
    </div>
  )
}

export default function Contact() {
  const [sent, setSent] = useState(false)

  function handleSubmit(e) {
    e.preventDefault()
    // TODO: enviar los datos a un backend o servicio de email.
    e.currentTarget.reset()
    setSent(true)
  }

  return (
    <section id="contacto" className="section">
      <div className="container-page">
        <SectionHead eyebrow="Hablemos" title="Contanos sobre tu proyecto">
          Completá el formulario o escribinos por el chat. Te respondemos a la brevedad.
        </SectionHead>

        <div className="grid gap-12 md:grid-cols-2">
          <div>
            <h3 className="mb-4.5 text-[1.3rem] font-bold text-primary">Información de contacto</h3>
            {contactItems.map((c) => (
              <div key={c.label} className="mb-5 flex items-start gap-3.5">
                <div className="grid size-11 shrink-0 place-items-center rounded-[11px] bg-accent-soft text-xl">{c.icon}</div>
                <div>
                  <div className="text-[0.82rem] text-muted">{c.label}</div>
                  <div className="font-semibold text-primary">{c.value}</div>
                </div>
              </div>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="rounded-[14px] border border-line bg-bg-alt p-6 sm:p-8">
            <Field id="nombre" label="Nombre" type="text" placeholder="Tu nombre" />
            <Field id="email" label="Email" type="email" placeholder="tu@email.com" />
            <Field id="mensaje" label="Mensaje" textarea placeholder="Contanos qué necesitás..." onChange={() => setSent(false)} />
            <button type="submit" className="btn-primary w-full">Enviar mensaje</button>
            <p className="mt-3.5 text-center text-[0.82rem]" role="status">
              {sent
                ? <span className="font-semibold text-accent">¡Gracias! Te contactaremos pronto.</span>
                : <span className="text-muted">Nos comprometemos a proteger tus datos.</span>}
            </p>
          </form>
        </div>
      </div>
    </section>
  )
}
