import { useRef, useEffect } from 'react'
import * as THREE from 'three'

interface WovenClothHeroProps {
  className?: string
}

export function WovenClothHero({ className = '' }: WovenClothHeroProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const sceneRef = useRef<{
    renderer: THREE.WebGLRenderer
    scene: THREE.Scene
    camera: THREE.PerspectiveCamera
    cloth: THREE.Mesh
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
    scene.fog = new THREE.Fog(0x0a0a0a, 5, 15)

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100)
    camera.position.set(0, 0, 5)

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.4)
    scene.add(ambientLight)

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8)
    directionalLight.position.set(5, 5, 5)
    scene.add(directionalLight)

    const pointLight = new THREE.PointLight(0xc41e3a, 1.5, 10)
    pointLight.position.set(-2, 2, 3)
    scene.add(pointLight)

    const goldLight = new THREE.PointLight(0xd4af37, 1.0, 8)
    goldLight.position.set(2, -1, 2)
    scene.add(goldLight)

    const clothGeometry = new THREE.PlaneGeometry(8, 6, 64, 64)
    const clothMaterial = new THREE.MeshStandardMaterial({
      color: 0x1a1a1a,
      metalness: 0.3,
      roughness: 0.7,
      side: THREE.DoubleSide,
    })

    const cloth = new THREE.Mesh(clothGeometry, clothMaterial)
    scene.add(cloth)

    const edgeGeometry = new THREE.EdgesGeometry(clothGeometry)
    const edgeMaterial = new THREE.LineBasicMaterial({ color: 0xc41e3a, transparent: true, opacity: 0.15 })
    const edgeLines = new THREE.LineSegments(edgeGeometry, edgeMaterial)
    cloth.add(edgeLines)

    sceneRef.current = { renderer, scene, camera, cloth, animationId: 0 }

    const clock = new THREE.Clock()

    const animate = () => {
      const elapsed = clock.getElapsedTime()
      const positions = clothGeometry.attributes.position

      for (let i = 0; i < positions.count; i++) {
        const x = positions.getX(i)
        const y = positions.getY(i)

        const wave1 = Math.sin(x * 1.5 + elapsed * 0.8) * 0.15
        const wave2 = Math.cos(y * 2.0 + elapsed * 0.6) * 0.1
        const wave3 = Math.sin((x + y) * 1.0 + elapsed * 0.4) * 0.08

        positions.setZ(i, wave1 + wave2 + wave3)
      }

      positions.needsUpdate = true
      clothGeometry.computeVertexNormals()

      cloth.rotation.x = Math.sin(elapsed * 0.2) * 0.05
      cloth.rotation.y = Math.sin(elapsed * 0.15) * 0.08

      pointLight.position.x = Math.sin(elapsed * 0.5) * 3
      pointLight.position.y = Math.cos(elapsed * 0.3) * 2

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
      style={{ minHeight: '100%' }}
    />
  )
}
