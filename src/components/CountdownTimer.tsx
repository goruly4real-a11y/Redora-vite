import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

interface CountdownTimerProps {
  targetDate: number
}

export function CountdownTimer({ targetDate }: CountdownTimerProps) {
  const [timeLeft, setTimeLeft] = useState({ hours: 0, minutes: 0, seconds: 0 })

  useEffect(() => {
    const timer = setInterval(() => {
      const now = Date.now()
      const diff = targetDate - now
      
      if (diff > 0) {
        setTimeLeft({
          hours: Math.floor(diff / (1000 * 60 * 60)),
          minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((diff % (1000 * 60)) / 1000),
        })
      }
    }, 1000)

    return () => clearInterval(timer)
  }, [targetDate])

  const formatNumber = (num: number) => num.toString().padStart(2, '0')

  return (
    <div className="flex items-center gap-3">
      {[
        { value: timeLeft.hours, label: 'HRS' },
        { value: timeLeft.minutes, label: 'MIN' },
        { value: timeLeft.seconds, label: 'SEC' },
      ].map((item, i) => (
        <motion.div 
          key={item.label}
          className="flex items-center gap-3"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: i * 0.1 }}
        >
          <div className="flex flex-col items-center">
            <span className="text-2xl md:text-3xl font-light text-white tabular-nums">
              {formatNumber(item.value)}
            </span>
            <span className="text-[9px] tracking-widest text-white/30 uppercase mt-1">
              {item.label}
            </span>
          </div>
          {i < 2 && (
            <span className="text-redora-red text-xl font-light mb-4">:</span>
          )}
        </motion.div>
      ))}
    </div>
  )
}
