import { useEffect, useRef, ReactNode } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

interface HorizontalScrollProps {
  children: ReactNode
  className?: string
}

export function HorizontalScroll({ children, className = '' }: HorizontalScrollProps) {
  const wrapperRef = useRef<HTMLDivElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const wrapper = wrapperRef.current
    const container = containerRef.current
    if (!wrapper || !container) return

    const isMobile = window.innerWidth < 768
    if (isMobile) return

    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches
    if (prefersReducedMotion) return

    const getScrollAmount = () => -(container.scrollWidth - window.innerWidth)

    const st = gsap.to(container, {
      x: getScrollAmount,
      ease: 'none',
      scrollTrigger: {
        trigger: wrapper,
        start: 'top top',
        end: () => `+=${container.scrollWidth - window.innerWidth}`,
        pin: true,
        scrub: 1,
        anticipatePin: 1,
        invalidateOnRefresh: true,
      },
    })

    return () => {
      st.scrollTrigger?.kill()
      gsap.set(container, { clearProps: 'x' })
    }
  }, [])

  return (
    <div ref={wrapperRef} className="overflow-hidden">
      <div
        ref={containerRef}
        className={`flex will-change-transform ${className}`}
        style={{ width: 'max-content' }}
      >
        {children}
      </div>
    </div>
  )
}
