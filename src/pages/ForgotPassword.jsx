import { useState } from 'react'
import { Link, Navigate, useLocation } from 'react-router'
import AuthLayout from '../components/auth/AuthLayout.jsx'
import { BelowLink, DemoNote, SubmitButton, TextField } from '../components/auth/FormControls.jsx'
import { useAuth } from '../auth/useAuth.js'
import { IS_DEMO, requestPasswordReset } from '../auth/authService.js'
import { validateEmail } from '../auth/validation.js'

export default function ForgotPassword() {
  const { user } = useAuth()
  const location = useLocation()

  const [email, setEmail] = useState(location.state?.email || '')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [sentTo, setSentTo] = useState('')
  const [demoLink, setDemoLink] = useState(null)

  if (user) return <Navigate to="/panel" replace />

  async function handleSubmit(e) {
    e.preventDefault()
    const problem = validateEmail(email)
    setError(problem)
    if (problem) return

    setLoading(true)
    const { demoLink } = await requestPasswordReset(email)
    setDemoLink(demoLink)
    setSentTo(email.trim())
    setLoading(false)
  }

  const backToLogin = (
    <BelowLink>
      <Link to="/login" className="font-semibold text-accent hover:underline">← Volver a iniciar sesión</Link>
    </BelowLink>
  )

  if (sentTo) {
    return (
      <AuthLayout
        title="Revisá tu email"
        below={
          <>
            {backToLogin}
            {IS_DEMO && (
              <DemoNote>
                {demoLink ? (
                  <>
                    <p className="mb-2.5">No se mandan emails de verdad. Este es el enlace que llegaría:</p>
                    <Link to={demoLink} className="font-semibold text-accent hover:underline">
                      Abrir enlace para restablecer →
                    </Link>
                  </>
                ) : (
                  <p>Ese email no tiene cuenta, así que no se generó ningún enlace. Probá con {' '}
                    <span className="font-semibold text-ink">demo@nexo.com</span> o con una cuenta que hayas creado.</p>
                )}
              </DemoNote>
            )}
          </>
        }
      >
        <div className="mb-5 grid size-14 place-items-center rounded-[14px] bg-accent-soft text-2xl">✉️</div>
        <p className="mb-3 text-muted">
          Si existe una cuenta con <span className="font-semibold break-all text-ink">{sentTo}</span>, te enviamos un
          enlace para crear una contraseña nueva.
        </p>
        <p className="mb-6 text-sm text-muted">El enlace vence en 30 minutos. Si no lo ves, revisá la carpeta de spam.</p>
        <button
          type="button"
          onClick={() => { setSentTo(''); setDemoLink(null) }}
          className="btn-outline w-full"
        >
          Usar otro email
        </button>
      </AuthLayout>
    )
  }

  return (
    <AuthLayout
      title="¿Olvidaste tu contraseña?"
      subtitle="Ingresá tu email y te mandamos un enlace para crear una nueva."
      below={backToLogin}
    >
      <form onSubmit={handleSubmit} noValidate>
        <TextField
          label="Email"
          type="email"
          autoComplete="email"
          value={email}
          onChange={(e) => { setEmail(e.target.value); if (error) setError('') }}
          placeholder="tu@email.com"
          error={error}
        />
        <SubmitButton loading={loading} loadingText="Enviando…">Enviar enlace</SubmitButton>
      </form>
    </AuthLayout>
  )
}
