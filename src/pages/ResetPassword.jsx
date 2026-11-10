import { useState } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router'
import AuthLayout from '../components/auth/AuthLayout.jsx'
import { Alert, BelowLink, PasswordField, SubmitButton } from '../components/auth/FormControls.jsx'
import { isResetTokenValid, resetPassword } from '../auth/authService.js'
import { MIN_PASSWORD, validateConfirm, validatePassword } from '../auth/validation.js'

export default function ResetPassword() {
  const [params] = useSearchParams()
  const token = params.get('token')
  const navigate = useNavigate()

  const [valid] = useState(() => isResetTokenValid(token))
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [errors, setErrors] = useState({})
  const [serverError, setServerError] = useState('')
  const [loading, setLoading] = useState(false)

  if (!valid) {
    return (
      <AuthLayout
        title="Enlace no válido"
        below={
          <BelowLink>
            <Link to="/login" className="font-semibold text-accent hover:underline">← Volver a iniciar sesión</Link>
          </BelowLink>
        }
      >
        <p className="mb-6 text-muted">
          Este enlace para restablecer la contraseña venció o ya fue usado. Pedí uno nuevo y probá otra vez.
        </p>
        <Link to="/recuperar" className="btn-primary block w-full text-center">Pedir un enlace nuevo</Link>
      </AuthLayout>
    )
  }

  async function handleSubmit(e) {
    e.preventDefault()
    const found = { password: validatePassword(password), confirm: validateConfirm(password, confirm) }
    setErrors(found)
    if (found.password || found.confirm) return

    setServerError('')
    setLoading(true)
    try {
      await resetPassword(token, password)
      navigate('/login', { replace: true, state: { notice: 'Listo, actualizamos tu contraseña. Ya podés ingresar.' } })
    } catch (err) {
      setServerError(err.message)
      setLoading(false)
    }
  }

  return (
    <AuthLayout title="Nueva contraseña" subtitle="Elegí una contraseña nueva para tu cuenta.">
      <form onSubmit={handleSubmit} noValidate>
        <PasswordField
          label="Contraseña nueva"
          autoComplete="new-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="••••••••"
          hint={`Mínimo ${MIN_PASSWORD} caracteres, con letras y números.`}
          error={errors.password}
        />
        <PasswordField
          label="Repetir contraseña"
          autoComplete="new-password"
          value={confirm}
          onChange={(e) => setConfirm(e.target.value)}
          placeholder="••••••••"
          error={errors.confirm}
        />
        {serverError && <Alert>{serverError}</Alert>}
        <SubmitButton loading={loading} loadingText="Guardando…">Guardar contraseña</SubmitButton>
      </form>
    </AuthLayout>
  )
}
