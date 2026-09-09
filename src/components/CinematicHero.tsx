import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ParticleBackground } from './ParticleBackground'

gsap.registerPlugin(ScrollTrigger)

export function CinematicHero() {
  const containerRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const overlayRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    const video = videoRef.current
    const content = contentRef.current
    const overlay = overlayRef.current

    if (!container || !video || !content || !overlay) return

    let videoDuration = 1

    const onLoaded = () => {
      videoDuration = video.duration || 1
    }

    video.addEventListener('loadedmetadata', onLoaded)

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: 'top top',
        end: '+=150%',
        scrub: 1,
        pin: true,
        anticipatePin: 1,
      },
    })

    tl.fromTo(
      video,
      { currentTime: 0 },
      {
        currentTime: videoDuration,
        ease: 'none',
        duration: 1,
        onUpdate: function () {
          const progress = this.progress()
          const newTime = progress * videoDuration
          if (newTime >= 0 && newTime <= videoDuration && !isNaN(newTime)) {
            try {
              video.currentTime = newTime
            } catch (e) {
              console.warn('Failed to set currentTime:', e)
            }
          }
        },
      }
    )

    tl.fromTo(
      content,
      { opacity: 1, y: 0 },
      { opacity: 0, y: -100, ease: 'power2.in', duration: 0.4 },
      0
    )

    tl.fromTo(
      overlay,
      { opacity: 0 },
      { opacity: 1, ease: 'power2.inOut', duration: 0.3 },
      0.5
    )

    return () => {
      tl.scrollTrigger?.kill()
      video.removeEventListener('loadedmetadata', onLoaded)
    }
  }, [])

  return (
    <section ref={containerRef} className="relative h-screen overflow-hidden">
      <video
        ref={videoRef}
        src="https://videos.pexels.com/video-files/6151238/6151238-hd_1920_1080_30fps.mp4"
        muted
        playsInline
        preload="metadata"
        className="absolute inset-0 w-full h-full object-cover"
      />

      <div ref={overlayRef} className="absolute inset-0 bg-black/60 opacity-0" />

      <ParticleBackground />

      <div
        ref={contentRef}
        className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4"
      >
        <div className="flex items-center gap-4 mb-8">
          <div className="w-16 h-px bg-gradient-to-r from-transparent to-redora-red" />
          <span className="text-redora-red text-sm tracking-[0.3em] uppercase">
            Luxury Redefined
          </span>
          <div className="w-16 h-px bg-gradient-to-l from-transparent to-redora-red" />
        </div>

        <h1 className="text-6xl md:text-8xl lg:text-9xl font-bold tracking-wider mb-6">
          <span className="bg-gradient-to-r from-white via-white to-white/70 bg-clip-text text-transparent">
            REDORA
          </span>
        </h1>

        <p className="text-xl md:text-2xl tracking-[0.2em] uppercase text-white/60 mb-4">
          You&apos;ve seen the rest
        </p>

        <p className="text-3xl md:text-5xl font-light italic text-white/90 mb-12">
          now shop the{' '}
          <span className="text-redora-red font-medium">best</span>
        </p>

        <button className="group relative px-12 py-5 border border-white/30 text-white uppercase tracking-widest text-sm overflow-hidden transition-all duration-500 hover:border-redora-red">
          <span className="absolute inset-0 bg-redora-red transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500" />
          <span className="relative z-10">Explore Collection</span>
        </button>

        <div className="absolute bottom-12 left-1/2 -translate-x-1/2">
          <p className="text-white/40 text-xs tracking-widest uppercase mb-4">
            Scroll to explore
          </p>
          <div className="w-px h-12 bg-gradient-to-b from-white/40 to-transparent mx-auto" />
        </div>
      </div>
    </section>
  )
}
