import { motion, useInView } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'

interface TextScrambleProps {
  text: string
  className?: string
  delay?: number
}

const chars = '!@#$%^&*()_+-=[]{}|;:,.<>?/~`ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'

function scrambleText(original: string, progress: number): string {
  return original
    .split('')
    .map((char, i) => {
      if (char === ' ') return ' '
      if (i < progress * original.length) return char
      return chars[Math.floor(Math.random() * chars.length)]
    })
    .join('')
}

export function TextScramble({ text, className = '', delay = 0 }: TextScrambleProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })
  const [displayedText, setDisplayedText] = useState(text.replace(/[a-zA-Z0-9]/g, ' '))

  useEffect(() => {
    if (!isInView) return

    let frame = 0
    const totalFrames = 30
    const interval = setInterval(() => {
      frame++
      const progress = frame / totalFrames
      setDisplayedText(scrambleText(text, progress))

      if (frame >= totalFrames) {
        clearInterval(interval)
        setDisplayedText(text)
      }
    }, 30)

    return () => clearInterval(interval)
  }, [isInView, text])

  return (
    <motion.span
      ref={ref}
      className={className}
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : {}}
      transition={{ duration: 0.5, delay }}
    >
      {displayedText}
    </motion.span>
  )
}
