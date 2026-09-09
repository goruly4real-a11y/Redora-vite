import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { useRef, useState } from 'react'

interface InteractiveAvatarProps {
  name: string
  role: string
  image?: string
  color?: string
}

export function InteractiveAvatar({
  name,
  role,
  image,
  color = '#C41E3A',
}: InteractiveAvatarProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [isHovered, setIsHovered] = useState(false)
  const x = useMotionValue(0)
  const y = useMotionValue(0)

  const springX = useSpring(x, { stiffness: 150, damping: 15 })
  const springY = useSpring(y, { stiffness: 150, damping: 15 })

  const rotateX = useSpring(useTransform(y, [-50, 50], [10, -10]), {
    stiffness: 300,
    damping: 30,
  })
  const rotateY = useSpring(useTransform(x, [-50, 50], [-10, 10]), {
    stiffness: 300,
    damping: 30,
  })

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    x.set(e.clientX - centerX)
    y.set(e.clientY - centerY)
  }

  const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
    setIsHovered(false)
  }

  return (
    <motion.div
      ref={ref}
      className="relative cursor-pointer"
      style={{
        rotateX,
        rotateY,
        transformPerspective: 800,
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
    >
      <div className="relative w-32 h-32">
        {image ? (
          <img
            src={image}
            alt={name}
            className="w-full h-full object-cover rounded-full"
          />
        ) : (
          <div
            className="w-full h-full rounded-full flex items-center justify-center text-4xl font-bold text-white"
            style={{ backgroundColor: color }}
          >
            {name.charAt(0)}
          </div>
        )}

        <motion.div
          className="absolute inset-0 rounded-full border-2"
          style={{ borderColor: color }}
          animate={{
            scale: isHovered ? 1.1 : 1,
            opacity: isHovered ? 1 : 0.5,
          }}
          transition={{ duration: 0.3 }}
        />

        <motion.div
          className="absolute -inset-2 rounded-full"
          style={{
            background: `radial-gradient(circle, ${color}20 0%, transparent 70%)`,
          }}
          animate={{
            scale: isHovered ? 1.2 : 0.8,
            opacity: isHovered ? 1 : 0,
          }}
          transition={{ duration: 0.3 }}
        />
      </div>

      <motion.div
        className="mt-4 text-center"
        animate={{
          y: isHovered ? -5 : 0,
        }}
        transition={{ duration: 0.3 }}
      >
        <p className="text-white font-medium text-sm">{name}</p>
        <p className="text-white/50 text-xs">{role}</p>
      </motion.div>
    </motion.div>
  )
}
