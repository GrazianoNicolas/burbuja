import { useId, useState } from 'react'

const inputBase =
  'w-full rounded-[10px] border bg-white px-4 py-3 text-[0.95rem] transition outline-none focus:ring-3'
const inputOk = 'border-line focus:border-accent focus:ring-accent/15'
const inputBad = 'border-red-400 focus:border-red-500 focus:ring-red-500/15'

function FieldShell({ id, label, labelAside, hint, error, children }) {
  return (
    <div className="mb-4.5">
      <div className="mb-1.5 flex items-baseline justify-between gap-3">
        <label htmlFor={id} className="block text-sm font-semibold text-primary">{label}</label>
        {labelAside}
      </div>
      {children}
      {error ? (
        <p id={`${id}-msg`} className="mt-1.5 text-[0.82rem] font-medium text-red-600">{error}</p>
      ) : hint ? (
        <p id={`${id}-msg`} className="mt-1.5 text-[0.82rem] text-muted">{hint}</p>
      ) : null}
    </div>
  )
}

export function TextField({ label, labelAside, hint, error, ...props }) {
  const id = useId()
  return (
    <FieldShell id={id} label={label} labelAside={labelAside} hint={hint} error={error}>
      <input
        id={id}
        aria-invalid={Boolean(error)}
        aria-describedby={error || hint ? `${id}-msg` : undefined}
        className={`${inputBase} ${error ? inputBad : inputOk}`}
        {...props}
      />
    </FieldShell>
  )
}

export function PasswordField({ label, labelAside, hint, error, ...props }) {
  const id = useId()
  const [visible, setVisible] = useState(false)
  return (
    <FieldShell id={id} label={label} labelAside={labelAside} hint={hint} error={error}>
      <div className="relative">
        <input
          id={id}
          type={visible ? 'text' : 'password'}
          aria-invalid={Boolean(error)}
          aria-describedby={error || hint ? `${id}-msg` : undefined}
          className={`${inputBase} ${error ? inputBad : inputOk} pr-20`}
          {...props}
        />
        <button
          type="button"
          onClick={() => setVisible((v) => !v)}
          className="absolute inset-y-0 right-3 my-auto h-fit cursor-pointer text-sm font-semibold text-accent"
        >
          {visible ? 'Ocultar' : 'Mostrar'}
        </button>
      </div>
    </FieldShell>
  )
}

export function Alert({ type = 'error', children }) {
  const styles = type === 'success' ? 'bg-emerald-50 text-emerald-800' : 'bg-red-50 text-red-700'
  return (
    <p role={type === 'error' ? 'alert' : 'status'} className={`mb-4 rounded-[10px] px-4 py-3 text-sm font-medium ${styles}`}>
      {children}
    </p>
  )
}

export function SubmitButton({ loading, loadingText, children, ...props }) {
  return (
    <button
      type="submit"
      disabled={loading}
      className="btn-primary w-full disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0"
      {...props}
    >
      {loading ? loadingText : children}
    </button>
  )
}

export function DemoNote({ children }) {
  return (
    <div className="mt-5 rounded-[14px] border border-dashed border-accent/40 bg-accent-soft/60 px-5 py-4 text-sm">
      <p className="mb-1 font-semibold text-primary">Modo de prueba</p>
      <div className="text-muted">{children}</div>
    </div>
  )
}

export function BelowLink({ children }) {
  return <p className="mt-5 text-center text-[0.95rem] text-muted">{children}</p>
}
