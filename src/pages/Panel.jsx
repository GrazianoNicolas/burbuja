import { useNavigate } from 'react-router'
import Logo from '../components/Logo.jsx'
import { useAuth } from '../auth/useAuth.js'

function initials(name) {
  return name.split(' ').map((p) => p[0]).slice(0, 2).join('').toUpperCase()
}

function formatDate(iso) {
  return new Date(iso).toLocaleString('es-AR', { dateStyle: 'long', timeStyle: 'short' })
}

export default function Panel() {
  const { user, signOut } = useAuth()
  const navigate = useNavigate()
  const firstName = user.name.split(' ')[0]

  async function handleSignOut() {
    await signOut()
    navigate('/login', { replace: true })
  }

  return (
    <div className="min-h-svh bg-bg-alt">
      <header className="sticky top-0 z-50 border-b border-line bg-white/90 backdrop-blur-md">
        <div className="container-page flex h-[72px] items-center justify-between gap-4">
          <Logo to="/panel" />
          <div className="flex items-center gap-3">
            <div className="hidden text-right sm:block">
              <div className="text-sm font-semibold text-primary">{user.name}</div>
              <div className="text-xs text-muted">{user.email}</div>
            </div>
            <div className="grid size-10 place-items-center rounded-full bg-linear-135 from-accent to-primary text-sm font-bold text-white">
              {initials(user.name)}
            </div>
            <button
              type="button"
              onClick={handleSignOut}
              className="btn-outline px-4 py-2 text-sm"
            >
              Salir
            </button>
          </div>
        </div>
      </header>

      <main className="container-page py-10 md:py-14">
        <h1 className="mb-1.5 text-[clamp(1.7rem,3vw,2.2rem)] font-bold tracking-tight text-primary">
          Hola, {firstName} 👋
        </h1>
        <p className="mb-9 text-muted">Este es tu panel. Desde acá vas a poder seguir tus proyectos con Nexo.</p>

        <div className="grid gap-6 md:grid-cols-[1fr_1.4fr]">
          <section className="rounded-[14px] border border-line bg-white p-6 sm:p-7">
            <h2 className="mb-5 text-lg font-bold text-primary">Mi cuenta</h2>
            <dl className="space-y-4 text-[0.95rem]">
              <div>
                <dt className="text-[0.82rem] text-muted">Nombre</dt>
                <dd className="font-semibold text-primary">{user.name}</dd>
              </div>
              <div>
                <dt className="text-[0.82rem] text-muted">Email</dt>
                <dd className="font-semibold break-all text-primary">{user.email}</dd>
              </div>
              <div>
                <dt className="text-[0.82rem] text-muted">Sesión iniciada</dt>
                <dd className="font-semibold text-primary">{formatDate(user.signedInAt)}</dd>
              </div>
            </dl>
          </section>

          <section className="flex flex-col items-center justify-center rounded-[14px] border border-dashed border-line bg-white p-8 text-center">
            <div className="mb-4 grid size-14 place-items-center rounded-[14px] bg-accent-soft text-2xl">📁</div>
            <h2 className="mb-1.5 text-lg font-bold text-primary">Todavía no hay proyectos</h2>
            <p className="max-w-[340px] text-sm text-muted">
              Cuando empecemos a trabajar juntos, acá vas a ver el avance, los reportes y los entregables.
            </p>
          </section>
        </div>
      </main>
    </div>
  )
}
