import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { useRef, ReactNode } from 'react'

interface FloatingElementProps {
  children: ReactNode
  speed?: number
  rotateRange?: number
  className?: string
}

export function FloatingElement({
  children,
  speed = 0.5,
  rotateRange = 5,
  className = '',
}: FloatingElementProps) {
  const ref = useRef<HTMLDivElement>(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)

  const springX = useSpring(x, { stiffness: 50, damping: 20 })
  const springY = useSpring(y, { stiffness: 50, damping: 20 })
  const rotate = useSpring(
    useTransform(x, [-200, 200], [-rotateRange, rotateRange]),
    { stiffness: 50, damping: 20 }
  )

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    x.set((e.clientX - centerX) * speed * 0.1)
    y.set((e.clientY - centerY) * speed * 0.1)
  }

  const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.div
      ref={ref}
      className={`cursor-pointer ${className}`}
      style={{
        x: springX,
        y: springY,
        rotate,
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      whileHover={{ scale: 1.05 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
    >
      {children}
    </motion.div>
  )
}
