import { Link } from 'react-router'

export default function Logo({ light = false, to = '/' }) {
  return (
    <Link
      to={to}
      className={`flex items-center gap-2.5 whitespace-nowrap text-xl font-extrabold tracking-tight ${light ? 'text-white' : 'text-primary'}`}
    >
      <span className="grid size-[34px] place-items-center rounded-[9px] bg-linear-135 from-accent to-primary font-extrabold text-white">
        N
      </span>
      Nexo Consultores
    </Link>
  )
}
