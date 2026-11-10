import { Link } from 'react-router'
import Logo from '../Logo.jsx'

// Marco común de las pantallas de login, registro y recuperación.
export default function AuthLayout({ title, subtitle, children, below }) {
  return (
    <div className="flex min-h-svh flex-col bg-[radial-gradient(1000px_500px_at_80%_-10%,var(--color-accent-soft),transparent),linear-gradient(180deg,#fff_0%,var(--color-bg-alt)_100%)]">
      <div className="container-page flex h-[72px] items-center justify-between gap-4">
        <Logo />
        <Link to="/" className="text-[0.95rem] font-medium whitespace-nowrap text-muted transition-colors hover:text-primary">
          ← Volver<span className="hidden sm:inline"> al sitio</span>
        </Link>
      </div>

      <main className="flex flex-1 items-center justify-center px-4 py-10">
        <div className="w-full max-w-[420px]">
          <div className="rounded-[20px] border border-line bg-white p-6 shadow-lift sm:p-8">
            <h1 className="mb-1.5 text-[1.7rem] font-bold tracking-tight text-primary">{title}</h1>
            {subtitle && <p className="mb-7 text-muted">{subtitle}</p>}
            {children}
          </div>
          {below}
        </div>
      </main>
    </div>
  )
}
