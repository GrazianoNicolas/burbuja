import { useState } from 'react'
import { Link, Navigate, useLocation, useNavigate } from 'react-router'
import AuthLayout from '../components/auth/AuthLayout.jsx'
import { Alert, BelowLink, DemoNote, PasswordField, SubmitButton, TextField } from '../components/auth/FormControls.jsx'
import { useAuth } from '../auth/useAuth.js'
import { DEMO_USER } from '../auth/authService.js'

export default function Login() {
  const { user, signIn } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const redirectTo = location.state?.from || '/panel'
  const notice = location.state?.notice

  const [email, setEmail] = useState(location.state?.email || '')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  if (user) return <Navigate to={redirectTo} replace />

  async function handleSubmit(e) {
    e.preventDefault()
    if (!email || !password) {
      setError('Completá tu email y contraseña.')
      return
    }
    setError('')
    setLoading(true)
    try {
      await signIn(email, password)
      navigate(redirectTo, { replace: true })
    } catch (err) {
      setError(err.message)
      setLoading(false)
    }
  }

  return (
    <AuthLayout
      title="Iniciar sesión"
      subtitle="Ingresá a tu panel de clientes."
      below={
        <>
          <BelowLink>
            ¿No tenés cuenta?{' '}
            <Link to="/registro" className="font-semibold text-accent hover:underline">Creá una</Link>
          </BelowLink>
          <DemoNote>
            <p className="mb-2.5">
              Usá <span className="font-semibold text-ink">{DEMO_USER.email}</span> y contraseña{' '}
              <span className="font-semibold text-ink">{DEMO_USER.password}</span>.
            </p>
            <button
              type="button"
              onClick={() => { setEmail(DEMO_USER.email); setPassword(DEMO_USER.password); setError('') }}
              className="cursor-pointer font-semibold text-accent hover:underline"
            >
              Completar datos de prueba
            </button>
          </DemoNote>
        </>
      }
    >
      {notice && !error && <Alert type="success">{notice}</Alert>}

      <form onSubmit={handleSubmit} noValidate>
        <TextField
          label="Email"
          type="email"
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="tu@email.com"
        />
        <PasswordField
          label="Contraseña"
          labelAside={
            <Link to="/recuperar" state={{ email }} className="text-[0.82rem] font-semibold text-accent hover:underline">
              ¿Olvidaste tu contraseña?
            </Link>
          }
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="••••••••"
        />

        {error && <Alert>{error}</Alert>}

        <SubmitButton loading={loading} loadingText="Ingresando…">Ingresar</SubmitButton>
      </form>
    </AuthLayout>
  )
}
