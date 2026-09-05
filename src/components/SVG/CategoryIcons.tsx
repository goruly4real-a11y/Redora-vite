import { motion } from 'framer-motion'

interface CategoryIconProps {
  type: 'electronics' | 'fashion' | 'home' | 'sports' | 'beauty' | 'toys'
}

export function CategoryIcon({ type }: CategoryIconProps) {
  const icons = {
    electronics: (
      <path d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    ),
    fashion: (
      <path d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
    ),
    home: (
      <path d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
    ),
    sports: (
      <path d="M13 10V3L4 14h7v7l9-11h-7z" />
    ),
    beauty: (
      <path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
    ),
    toys: (
      <path d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    ),
  }

  return (
    <motion.svg 
      className="w-10 h-10 text-white/50 group-hover:text-redora-red transition-colors duration-500"
      fill="none" 
      stroke="currentColor" 
      viewBox="0 0 24 24"
      strokeWidth={1}
      whileHover={{ scale: 1.1, rotate: 5 }}
    >
      {icons[type]}
    </motion.svg>
  )
}
