import { motion } from 'framer-motion'

export function Logo() {
  return (
    <motion.div 
      className="flex items-center gap-3"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
    >
      <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
        <motion.circle 
          cx="18" cy="18" r="16" 
          stroke="#C41E3A" strokeWidth="1"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
        />
        <motion.path 
          d="M12 18 L18 24 L24 12" 
          stroke="#C41E3A" strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        />
      </svg>
      <span className="text-xl font-semibold tracking-[0.2em] text-white">
        REDORA
      </span>
    </motion.div>
  )
}
