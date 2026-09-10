import { Link } from 'react-router-dom'

interface TryOnButtonProps {
  productId: string
  className?: string
}

export function TryOnButton({ productId, className = '' }: TryOnButtonProps) {
  return (
    <Link
      to={`/tryon/${productId}`}
      className={`
        inline-flex items-center justify-center gap-2 px-6 py-3
        border border-white/30 text-white text-sm tracking-widest uppercase
        hover:bg-white hover:text-black transition-all duration-300
        ${className}
      `}
    >
      <svg
        className="w-4 h-4"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
        />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
        />
      </svg>
      Try On Virtually
    </Link>
  )
}
