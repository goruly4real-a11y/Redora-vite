import { motion } from 'framer-motion'

interface TextRotateProps {
  text: string
  className?: string
}

export function TextRotate({ text, className = '' }: TextRotateProps) {
  const letters = text.split('')

  return (
    <div className={`inline-flex ${className}`}>
      {letters.map((letter, index) => (
        <motion.span
          key={index}
          className="inline-block bg-gradient-to-r from-white via-white to-white/70 bg-clip-text text-transparent"
          initial={{ rotateX: -90, opacity: 0 }}
          animate={{ rotateX: 0, opacity: 1 }}
          transition={{
            duration: 0.6,
            delay: index * 0.1,
            ease: [0.16, 1, 0.3, 1],
          }}
          style={{
            transformOrigin: 'center bottom',
            perspective: '1000px',
          }}
        >
          {letter}
        </motion.span>
      ))}
    </div>
  )
}
