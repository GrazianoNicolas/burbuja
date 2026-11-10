import { useState } from 'react'
import { Link, Navigate, useNavigate } from 'react-router'
import AuthLayout from '../components/auth/AuthLayout.jsx'
import { Alert, BelowLink, PasswordField, SubmitButton, TextField } from '../components/auth/FormControls.jsx'
import { useAuth } from '../auth/useAuth.js'
import { MIN_PASSWORD, validateConfirm, validateEmail, validatePassword } from '../auth/validation.js'

function validate(form) {
  const errors = {
    name: form.name.trim().length < 2 ? 'Ingresá tu nombre.' : '',
    email: validateEmail(form.email),
    password: validatePassword(form.password),
    confirm: validateConfirm(form.password, form.confirm),
    terms: form.terms ? '' : 'Tenés que aceptar los términos para continuar.',
  }
  return Object.fromEntries(Object.entries(errors).filter(([, v]) => v))
}

export default function Register() {
  const { user, signUp } = useAuth()
  const navigate = useNavigate()

  const [form, setForm] = useState({ name: '', email: '', password: '', confirm: '', terms: false })
  const [errors, setErrors] = useState({})
  const [submitted, setSubmitted] = useState(false)
  const [serverError, setServerError] = useState('')
  const [loading, setLoading] = useState(false)

  // Mientras se crea la cuenta, la navegación la hace handleSubmit (para mostrar la bienvenida).
  if (user && !loading) return <Navigate to="/panel" replace />

  function update(field, value) {
    const next = { ...form, [field]: value }
    setForm(next)
    // Después del primer intento, los errores se corrigen mientras escribís.
    if (submitted) setErrors(validate(next))
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setSubmitted(true)
    setServerError('')
    const found = validate(form)
    setErrors(found)
    if (Object.keys(found).length) return

    setLoading(true)
    try {
      await signUp({ name: form.name, email: form.email, password: form.password })
      navigate('/panel', { replace: true, state: { welcome: true } })
    } catch (err) {
      setServerError(err.message)
      setLoading(false)
    }
  }

  return (
    <AuthLayout
      title="Crear cuenta"
      subtitle="Registrate para seguir tus proyectos con Nexo."
      below={
        <BelowLink>
          ¿Ya tenés cuenta?{' '}
          <Link to="/login" className="font-semibold text-accent hover:underline">Iniciá sesión</Link>
        </BelowLink>
      }
    >
      <form onSubmit={handleSubmit} noValidate>
        <TextField
          label="Nombre y apellido"
          autoComplete="name"
          value={form.name}
          onChange={(e) => update('name', e.target.value)}
          placeholder="Tu nombre"
          error={errors.name}
        />
        <TextField
          label="Email"
          type="email"
          autoComplete="email"
          value={form.email}
          onChange={(e) => update('email', e.target.value)}
          placeholder="tu@email.com"
          error={errors.email}
        />
        <PasswordField
          label="Contraseña"
          autoComplete="new-password"
          value={form.password}
          onChange={(e) => update('password', e.target.value)}
          placeholder="••••••••"
          hint={`Mínimo ${MIN_PASSWORD} caracteres, con letras y números.`}
          error={errors.password}
        />
        <PasswordField
          label="Repetir contraseña"
          autoComplete="new-password"
          value={form.confirm}
          onChange={(e) => update('confirm', e.target.value)}
          placeholder="••••••••"
          error={errors.confirm}
        />

        <div className="mb-5">
          <label className="flex cursor-pointer items-start gap-2.5 text-sm text-muted">
            <input
              type="checkbox"
              checked={form.terms}
              onChange={(e) => update('terms', e.target.checked)}
              className="mt-0.5 size-4 shrink-0 accent-accent"
            />
            <span>Acepto los términos y condiciones y la política de privacidad.</span>
          </label>
          {errors.terms && <p className="mt-1.5 text-[0.82rem] font-medium text-red-600">{errors.terms}</p>}
        </div>

        {serverError && <Alert>{serverError}</Alert>}

        <SubmitButton loading={loading} loadingText="Creando cuenta…">Crear cuenta</SubmitButton>
      </form>
    </AuthLayout>
  )
}
