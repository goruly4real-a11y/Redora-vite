import { useRef, useEffect } from 'react'
import * as THREE from 'three'

interface PortalBackgroundProps {
  className?: string
}

export function PortalBackground({ className = '' }: PortalBackgroundProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const sceneRef = useRef<{
    renderer: THREE.WebGLRenderer
    scene: THREE.Scene
    camera: THREE.PerspectiveCamera
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
    const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 100)
    camera.position.z = 5

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.2)
    scene.add(ambientLight)

    const portals: THREE.Mesh[] = []
    const portalCount = 5

    for (let i = 0; i < portalCount; i++) {
      const radius = 1.5 + Math.random() * 2
      const tubeRadius = 0.02 + Math.random() * 0.03
      const geometry = new THREE.TorusGeometry(radius, tubeRadius, 16, 100)

      const isRed = Math.random() > 0.5
      const color = isRed ? 0xc41e3a : 0xd4af37

      const material = new THREE.MeshBasicMaterial({
        color,
        transparent: true,
        opacity: 0.3 + Math.random() * 0.4,
      })

      const portal = new THREE.Mesh(geometry, material)
      portal.position.set(
        (Math.random() - 0.5) * 4,
        (Math.random() - 0.5) * 3,
        (Math.random() - 0.5) * 2
      )
      portal.rotation.set(
        Math.random() * Math.PI,
        Math.random() * Math.PI,
        Math.random() * Math.PI
      )

      scene.add(portal)
      portals.push(portal)
    }

    const particles: THREE.Points[] = []
    const particleCount = 200

    const particleGeometry = new THREE.BufferGeometry()
    const positions = new Float32Array(particleCount * 3)
    const colors = new Float32Array(particleCount * 3)

    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 15
      positions[i * 3 + 1] = (Math.random() - 0.5) * 10
      positions[i * 3 + 2] = (Math.random() - 0.5) * 5

      const isGold = Math.random() > 0.6
      colors[i * 3] = isGold ? 0.83 : 0.77
      colors[i * 3 + 1] = isGold ? 0.69 : 0.12
      colors[i * 3 + 2] = isGold ? 0.22 : 0.23
    }

    particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    particleGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3))

    const particleMaterial = new THREE.PointsMaterial({
      size: 0.03,
      vertexColors: true,
      transparent: true,
      opacity: 0.6,
      blending: THREE.AdditiveBlending,
    })

    const particleSystem = new THREE.Points(particleGeometry, particleMaterial)
    scene.add(particleSystem)
    particles.push(particleSystem)

    sceneRef.current = { renderer, scene, camera, animationId: 0 }

    const clock = new THREE.Clock()
    let mouseX = 0
    let mouseY = 0

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = (e.clientX / window.innerWidth) * 2 - 1
      mouseY = -(e.clientY / window.innerHeight) * 2 + 1
    }

    window.addEventListener('mousemove', handleMouseMove)

    const animate = () => {
      const elapsed = clock.getElapsedTime()

      portals.forEach((portal, i) => {
        portal.rotation.x += 0.002 * (i + 1)
        portal.rotation.y += 0.003 * (i + 1)

        const scale = 1 + Math.sin(elapsed * 0.5 + i) * 0.1
        portal.scale.set(scale, scale, scale)

        portal.position.y += Math.sin(elapsed * 0.3 + i * 0.5) * 0.002
      })

      particleSystem.rotation.y += 0.001
      particleSystem.rotation.x += 0.0005

      camera.position.x += (mouseX * 0.5 - camera.position.x) * 0.02
      camera.position.y += (mouseY * 0.3 - camera.position.y) * 0.02
      camera.lookAt(scene.position)

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
      window.removeEventListener('mousemove', handleMouseMove)
      cancelAnimationFrame(sceneRef.current?.animationId ?? 0)
      renderer.dispose()
      container.removeChild(renderer.domElement)
    }
  }, [])

  return (
    <div
      ref={containerRef}
      className={`absolute inset-0 ${className}`}
    />
  )
}
