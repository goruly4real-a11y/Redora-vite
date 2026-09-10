import { useRef, useEffect } from 'react'
import * as THREE from 'three'

interface BrandOrbsProps {
  className?: string
}

export function BrandOrbs({ className = '' }: BrandOrbsProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const sceneRef = useRef<{
    renderer: THREE.WebGLRenderer
    scene: THREE.Scene
    camera: THREE.PerspectiveCamera
    orbs: THREE.Mesh[]
    animationId: number
  } | null>(null)

  useEffect(() => {
    if (!containerRef.current) return

    const container = containerRef.current
    const width = container.clientWidth
    const height = container.clientHeight

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setSize(width, height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setClearColor(0x0a0a0a, 1)
    container.appendChild(renderer.domElement)

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 100)
    camera.position.z = 6

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.3)
    scene.add(ambientLight)

    const redLight = new THREE.PointLight(0xc41e3a, 2, 10)
    redLight.position.set(-3, 2, 3)
    scene.add(redLight)

    const goldLight = new THREE.PointLight(0xd4af37, 1.5, 8)
    goldLight.position.set(3, -2, 2)
    scene.add(goldLight)

    const whiteLight = new THREE.PointLight(0xffffff, 1.0, 12)
    whiteLight.position.set(0, 0, 5)
    scene.add(whiteLight)

    const orbs: THREE.Mesh[] = []
    const orbConfigs = [
      { color: 0xc41e3a, metalness: 0.8, roughness: 0.2, size: 0.8, position: new THREE.Vector3(-2, 1, 0) },
      { color: 0xd4af37, metalness: 0.9, roughness: 0.1, size: 0.6, position: new THREE.Vector3(2, -0.5, 0.5) },
      { color: 0xffffff, metalness: 0.7, roughness: 0.3, size: 0.5, position: new THREE.Vector3(0, -1, -0.5) },
      { color: 0x1a1a1a, metalness: 0.6, roughness: 0.4, size: 0.4, position: new THREE.Vector3(-1.5, -1.5, 0.3) },
    ]

    orbConfigs.forEach((config) => {
      const geometry = new THREE.SphereGeometry(config.size, 64, 64)
      const material = new THREE.MeshStandardMaterial({
        color: config.color,
        metalness: config.metalness,
        roughness: config.roughness,
      })

      const orb = new THREE.Mesh(geometry, material)
      orb.position.copy(config.position)

      const edgeGeometry = new THREE.EdgesGeometry(geometry)
      const edgeMaterial = new THREE.LineBasicMaterial({
        color: config.color === 0x1a1a1a ? 0xc41e3a : config.color,
        transparent: true,
        opacity: 0.2,
      })
      const edges = new THREE.LineSegments(edgeGeometry, edgeMaterial)
      orb.add(edges)

      scene.add(orb)
      orbs.push(orb)
    })

    sceneRef.current = { renderer, scene, camera, orbs, animationId: 0 }

    const clock = new THREE.Clock()

    const animate = () => {
      const elapsed = clock.getElapsedTime()

      orbs.forEach((orb, i) => {
        orb.position.y += Math.sin(elapsed * 0.5 + i * 1.5) * 0.005
        orb.position.x += Math.cos(elapsed * 0.3 + i * 1.2) * 0.003

        orb.rotation.x += 0.005
        orb.rotation.y += 0.008

        const pulse = 1 + Math.sin(elapsed * 2 + i) * 0.05
        orb.scale.set(pulse, pulse, pulse)
      })

      redLight.position.x = Math.sin(elapsed * 0.4) * 4
      redLight.position.y = Math.cos(elapsed * 0.3) * 3

      goldLight.position.x = Math.cos(elapsed * 0.5) * 3
      goldLight.position.y = Math.sin(elapsed * 0.4) * 2

      renderer.render(scene, camera)
      sceneRef.current!.animationId = requestAnimationFrame(animate)
    }

    animate()

    const handleResize = () => {
      const w = container.clientWidth
      const h = container.clientHeight
      camera.aspect = w / h
      camera.updateProjectionMatrix()
      renderer.setSize(w, h)
    }

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
      cancelAnimationFrame(sceneRef.current?.animationId ?? 0)
      renderer.dispose()
      container.removeChild(renderer.domElement)
    }
  }, [])

  return (
    <div
      ref={containerRef}
      className={`w-full h-full ${className}`}
    />
  )
}
