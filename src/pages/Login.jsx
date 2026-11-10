import { useState } from 'react'
import { Link, Navigate, useLocation, useNavigate } from 'react-router'
import Logo from '../components/Logo.jsx'
import { useAuth } from '../auth/useAuth.js'
import { DEMO_USER } from '../auth/authService.js'

const inputClass =
  'w-full rounded-[10px] border border-line bg-white px-4 py-3 text-[0.95rem] transition outline-none focus:border-accent focus:ring-3 focus:ring-accent/15'

export default function Login() {
  const { user, signIn } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const redirectTo = location.state?.from || '/panel'

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  if (user) return <Navigate to={redirectTo} replace />

  async function handleSubmit(e) {
    e.preventDefault()
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

  function fillDemo() {
    setEmail(DEMO_USER.email)
    setPassword(DEMO_USER.password)
    setError('')
  }

  return (
    <div className="flex min-h-svh flex-col bg-[radial-gradient(1000px_500px_at_80%_-10%,var(--color-accent-soft),transparent),linear-gradient(180deg,#fff_0%,var(--color-bg-alt)_100%)]">
      <div className="container-page flex h-[72px] items-center justify-between">
        <Logo />
        <Link to="/" className="text-[0.95rem] font-medium text-muted transition-colors hover:text-primary">
          ← Volver al sitio
        </Link>
      </div>

      <main className="flex flex-1 items-center justify-center px-4 py-10">
        <div className="w-full max-w-[420px]">
          <div className="rounded-[20px] border border-line bg-white p-6 shadow-lift sm:p-8">
            <h1 className="mb-1.5 text-[1.7rem] font-bold tracking-tight text-primary">Iniciar sesión</h1>
            <p className="mb-7 text-muted">Ingresá a tu panel de clientes.</p>

            <form onSubmit={handleSubmit} noValidate>
              <div className="mb-4.5">
                <label htmlFor="email" className="mb-1.5 block text-sm font-semibold text-primary">Email</label>
                <input
                  id="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="tu@email.com"
                  className={inputClass}
                />
              </div>

              <div className="mb-5">
                <label htmlFor="password" className="mb-1.5 block text-sm font-semibold text-primary">Contraseña</label>
                <div className="relative">
                  <input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    autoComplete="current-password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className={`${inputClass} pr-20`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((v) => !v)}
                    className="absolute inset-y-0 right-3 my-auto h-fit cursor-pointer text-sm font-semibold text-accent"
                  >
                    {showPassword ? 'Ocultar' : 'Mostrar'}
                  </button>
                </div>
              </div>

              {error && (
                <p role="alert" className="mb-4 rounded-[10px] bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
                  {error}
                </p>
              )}

              <button
                type="submit"
                disabled={loading || !email || !password}
                className="btn-primary w-full disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0"
              >
                {loading ? 'Ingresando…' : 'Ingresar'}
              </button>
            </form>
          </div>

          <div className="mt-5 rounded-[14px] border border-dashed border-accent/40 bg-accent-soft/60 px-5 py-4 text-sm">
            <p className="mb-1 font-semibold text-primary">Modo de prueba</p>
            <p className="mb-2.5 text-muted">
              Usá <span className="font-semibold text-ink">{DEMO_USER.email}</span> y contraseña{' '}
              <span className="font-semibold text-ink">{DEMO_USER.password}</span>.
            </p>
            <button type="button" onClick={fillDemo} className="cursor-pointer font-semibold text-accent hover:underline">
              Completar datos de prueba
            </button>
          </div>
        </div>
      </main>
    </div>
  )
}
