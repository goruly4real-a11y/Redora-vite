import { useEffect, useMemo, useState } from 'react'
import Particles, { initParticlesEngine } from '@tsparticles/react'
import { loadSlim } from '@tsparticles/slim'
import type { Container, ISourceOptions } from '@tsparticles/engine'

export function ParticleBackground() {
  const [init, setInit] = useState(false)

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine)
    }).then(() => setInit(true))
  }, [])

  const particlesLoaded = (container?: Container) => {
    console.log(container)
  }

  const options: ISourceOptions = useMemo(
    () => ({
      fullScreen: { zIndex: 0 },
      fpsLimit: 60,
      interactivity: {
        events: {
          onHover: {
            enable: true,
            mode: 'grab',
          },
        },
        modes: {
          grab: {
            distance: 140,
            links: {
              opacity: 0.3,
              color: '#C41E3A',
            },
          },
        },
      },
      particles: {
        color: {
          value: ['#C41E3A', '#D4AF37', '#ffffff'],
        },
        links: {
          color: '#C41E3A',
          distance: 150,
          enable: true,
          opacity: 0.15,
          width: 1,
        },
        move: {
          direction: 'none' as const,
          enable: true,
          outModes: {
            default: 'bounce' as const,
          },
          random: true,
          speed: 0.4,
          straight: false,
        },
        number: {
          density: {
            enable: true,
          },
          value: 80,
        },
        opacity: {
          value: { min: 0.1, max: 0.4 },
          animation: {
            enable: true,
            speed: 0.5,
            minimumValue: 0.1,
          },
        },
        shape: {
          type: 'circle',
        },
        size: {
          value: { min: 1, max: 2.5 },
          animation: {
            enable: true,
            speed: 1,
            minimumValue: 0.5,
          },
        },
      },
      detectRetina: true,
    }),
    [],
  )

  if (!init) return null

  return (
    <Particles
      id="tsparticles"
      particlesLoaded={particlesLoaded}
      options={options}
      className="fixed inset-0 z-0"
      style={{ pointerEvents: 'auto' }}
    />
  )
}
