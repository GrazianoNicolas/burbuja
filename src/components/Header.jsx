import { useState } from 'react'
import { Link } from 'react-router'
import { useAuth } from '../auth/useAuth.js'
import Logo from './Logo.jsx'
import { navLinks } from '../data.js'

export default function Header() {
  const [open, setOpen] = useState(false)
  const { user } = useAuth()

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-white/90 backdrop-blur-md">
      <div className="container-page relative flex h-[72px] items-center justify-between">
        <Logo />

        <nav
          className={`${open ? 'flex' : 'hidden'} absolute inset-x-0 top-[72px] flex-col gap-4.5 border-b border-line bg-white p-6
            md:static md:flex md:flex-row md:gap-8 md:border-0 md:bg-transparent md:p-0`}
        >
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="text-[0.95rem] font-medium text-muted transition-colors hover:text-primary"
            >
              {link.label}
            </a>
          ))}
          <Link to={user ? '/panel' : '/login'} className="text-[0.95rem] font-semibold text-accent sm:hidden">
            {user ? 'Mi panel' : 'Ingresar'}
          </Link>
        </nav>

        <div className="flex items-center gap-3.5">
          <Link
            to={user ? '/panel' : '/login'}
            className="hidden text-[0.95rem] font-semibold text-primary transition-colors hover:text-accent sm:inline-block"
          >
            {user ? 'Mi panel' : 'Ingresar'}
          </Link>
          <a href="#contacto" className="btn-primary hidden sm:inline-block">Agendar consulta</a>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
            aria-expanded={open}
            className="cursor-pointer text-2xl text-primary md:hidden"
          >
            {open ? '✕' : '☰'}
          </button>
        </div>
      </div>
    </header>
  )
}
