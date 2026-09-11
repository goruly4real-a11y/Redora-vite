import Particles from '@tsparticles/react'
import { loadSlim } from '@tsparticles/slim'
import type { ISourceOptions } from '@tsparticles/engine'
import { useEffect, useMemo, useState } from 'react'

let initPromise: Promise<void> | null = null

async function initEngine() {
  if (!initPromise) {
    const { initParticlesEngine } = await import('@tsparticles/react')
    initPromise = initParticlesEngine(async (engine: unknown) => {
      await loadSlim(engine as Parameters<typeof loadSlim>[0])
    })
  }
  return initPromise
}

export function ParticleBackground() {
  const [init, setInit] = useState(false)

  useEffect(() => {
    initEngine().then(() => setInit(true))
  }, [])

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
          onClick: {
            enable: true,
            mode: 'push',
          },
        },
        modes: {
          grab: {
            distance: 120,
            links: {
              opacity: 0.25,
              color: '#C41E3A',
            },
          },
          push: {
            quantity: 3,
          },
        },
      },
      particles: {
        color: {
          value: ['#C41E3A', '#D4AF37', '#ffffff'],
        },
        links: {
          color: '#C41E3A',
          distance: 120,
          enable: true,
          opacity: 0.1,
          width: 0.5,
        },
        move: {
          direction: 'none' as const,
          enable: true,
          outModes: {
            default: 'bounce' as const,
          },
          random: true,
          speed: 0.3,
          straight: false,
        },
        number: {
          density: {
            enable: true,
          },
          value: 60,
        },
        opacity: {
          value: { min: 0.15, max: 0.5 },
          animation: {
            enable: true,
            speed: 0.3,
            minimumValue: 0.1,
            sync: false,
          },
        },
        shape: {
          type: 'circle',
        },
        size: {
          value: { min: 0.8, max: 2.5 },
          animation: {
            enable: true,
            speed: 0.8,
            minimumValue: 0.5,
            sync: false,
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
      options={options}
      className="fixed inset-0 z-0"
      style={{ pointerEvents: 'auto' }}
    />
  )
}
