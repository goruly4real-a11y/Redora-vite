import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { ParticleBackground } from './ParticleBackground'
import { TextRotate } from './TextRotate'

export function HeroBanner() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  })

  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
  const y = useTransform(scrollYProgress, [0, 0.5], [0, -100])
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.95])

  return (
    <section 
      ref={ref}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-[#0a0a0a] via-[#111111] to-[#1a1a1a]"
    >
      {/* tsParticles Background */}
      <ParticleBackground />

      {/* Radial glow */}
      <div className="absolute inset-0 z-[1]">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-redora-red/10 rounded-full blur-[150px]" />
      </div>

      {/* Decorative lines */}
      <div className="absolute inset-0 z-[2] pointer-events-none overflow-hidden">
        <motion.div 
          className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-transparent via-redora-red/20 to-transparent"
          initial={{ scaleY: 0 }}
          animate={{ scaleY: 1 }}
          transition={{ duration: 2, ease: 'easeInOut' }}
        />
        <motion.div 
          className="absolute top-0 right-1/4 w-px h-full bg-gradient-to-b from-transparent via-white/10 to-transparent"
          initial={{ scaleY: 0 }}
          animate={{ scaleY: 1 }}
          transition={{ duration: 2, delay: 0.5, ease: 'easeInOut' }}
        />
      </div>

      {/* Content */}
      <motion.div 
        className="relative z-10 text-center px-4 max-w-5xl mx-auto"
        style={{ opacity, y, scale }}
      >
        {/* Decorative element */}
        <motion.div 
          className="flex items-center justify-center gap-4 mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5, delay: 0.3 }}
        >
          <div className="w-16 h-px bg-gradient-to-r from-transparent to-redora-red" />
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-redora-red">
            <path d="M12 2L15 9L22 9.5L17 14.5L18.5 22L12 18.5L5.5 22L7 14.5L2 9.5L9 9L12 2Z" fill="currentColor" opacity="0.8" />
          </svg>
          <div className="w-16 h-px bg-gradient-to-l from-transparent to-redora-red" />
        </motion.div>

        {/* Brand name with text rotate effect */}
        <motion.div 
          className="mb-6"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          <TextRotate text="REDORA" className="text-7xl md:text-9xl font-bold tracking-wider" />
        </motion.div>

        {/* Decorative divider */}
        <motion.div 
          className="flex items-center justify-center gap-3 mb-8"
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
        >
          <div className="w-24 h-px bg-gradient-to-r from-transparent to-redora-red/50" />
          <div className="w-2 h-2 rotate-45 bg-redora-red" />
          <div className="w-24 h-px bg-gradient-to-l from-transparent to-redora-red/50" />
        </motion.div>

        {/* Motto */}
        <motion.p 
          className="text-xl md:text-2xl tracking-[0.3em] uppercase mb-4 text-white/60 font-light"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1 }}
        >
          You&apos;ve seen the rest
        </motion.p>

        <motion.p 
          className="text-3xl md:text-5xl font-light italic text-white/90 mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.3 }}
        >
          now shop the{' '}
          <span className="text-redora-red font-medium">best</span>
        </motion.p>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.6 }}
        >
          <motion.button 
            className="group relative px-10 py-4 border border-redora-red/50 text-white uppercase tracking-widest text-sm overflow-hidden transition-all duration-500 hover:border-redora-red"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <span className="absolute inset-0 bg-redora-red transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500" />
            <span className="relative z-10">Explore Collection</span>
          </motion.button>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div 
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
      >
        <motion.div 
          className="w-6 h-10 border border-white/30 rounded-full flex justify-center"
          animate={{ opacity: [0.3, 1, 0.3] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <motion.div 
            className="w-1 h-2 bg-white/60 rounded-full mt-2"
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          />
        </motion.div>
      </motion.div>
    </section>
  )
}
