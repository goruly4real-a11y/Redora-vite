import { useEffect, useRef } from 'react'

export function ParticleWave() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let animationId: number
    let scene: any
    let camera: any
    let renderer: any
    let particles: any
    let count = 0
    let mouseX = 0
    let mouseY = 0
    let time = 0

    const init = async () => {
      const THREE = await import('three')
      
      if (!containerRef.current) return

      const SEPARATION = 60
      const AMOUNTX = 80
      const AMOUNTY = 50
      const numParticles = AMOUNTX * AMOUNTY

      scene = new THREE.Scene()
      camera = new THREE.PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        1,
        10000
      )
      camera.position.z = 800

      const geometry = new THREE.BufferGeometry()
      const positions = new Float32Array(numParticles * 3)
      const scales = new Float32Array(numParticles)

      let i = 0
      let j = 0

      for (let ix = 0; ix < AMOUNTX; ix++) {
        for (let iy = 0; iy < AMOUNTY; iy++) {
          positions[i] = ix * SEPARATION - (AMOUNTX * SEPARATION) / 2
          positions[i + 1] = 0
          positions[i + 2] = iy * SEPARATION - (AMOUNTY * SEPARATION) / 2
          scales[j] = 1
          i += 3
          j++
        }
      }

      geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
      geometry.setAttribute('scale', new THREE.BufferAttribute(scales, 1))

      const material = new THREE.ShaderMaterial({
        uniforms: {
          color: { value: new THREE.Color(0xC41E3A) },
          colorSecondary: { value: new THREE.Color(0xD4AF37) },
          time: { value: 0 },
        },
        vertexShader: `
          attribute float scale;
          varying float vY;
          varying float vX;
          uniform float time;
          
          void main() {
            vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
            gl_PointSize = scale * (200.0 / -mvPosition.z);
            gl_Position = projectionMatrix * mvPosition;
            vY = position.y;
            vX = position.x;
          }
        `,
        fragmentShader: `
          uniform vec3 color;
          uniform vec3 colorSecondary;
          uniform float time;
          varying float vY;
          varying float vX;
          
          void main() {
            float dist = length(gl_PointCoord - vec2(0.5));
            if (dist > 0.475) discard;
            
            // Soft glow effect
            float alpha = 1.0 - smoothstep(0.2, 0.5, dist);
            
            // Height-based color gradient (red at bottom, white at peaks)
            float heightFactor = smoothstep(-80.0, 150.0, vY);
            
            // Horizontal position for secondary color mixing
            float horizontalFactor = smoothstep(-2000.0, 2000.0, vX);
            
            // Mix colors: base red -> white at peaks, with subtle gold at edges
            vec3 finalColor = mix(color, vec3(1.0, 1.0, 1.0), heightFactor * 0.6);
            finalColor = mix(finalColor, colorSecondary, horizontalFactor * heightFactor * 0.2);
            
            gl_FragColor = vec4(finalColor, alpha * 0.9);
          }
        `,
        transparent: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
      })

      particles = new THREE.Points(geometry, material)
      scene.add(particles)

      renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
        powerPreference: 'high-performance',
      })
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
      renderer.setSize(window.innerWidth, window.innerHeight)
      renderer.setClearColor(0x000000, 0)
      containerRef.current.appendChild(renderer.domElement)

      const onMouseMove = (event: MouseEvent) => {
        mouseX = event.clientX - window.innerWidth / 2
        mouseY = event.clientY - window.innerHeight / 2
      }

      const onResize = () => {
        camera.aspect = window.innerWidth / window.innerHeight
        camera.updateProjectionMatrix()
        renderer.setSize(window.innerWidth, window.innerHeight)
      }

      window.addEventListener('mousemove', onMouseMove)
      window.addEventListener('resize', onResize)

      const animate = () => {
        animationId = requestAnimationFrame(animate)
        
        time += 0.005
        
        // Smooth camera follow with damping
        camera.position.x += (mouseX * 0.2 - camera.position.x) * 0.02
        camera.position.y += (-mouseY * 0.15 - camera.position.y) * 0.02
        camera.lookAt(scene.position)

        const positions = particles.geometry.attributes.position.array as Float32Array
        const scales = particles.geometry.attributes.scale.array as Float32Array

        let idx = 0
        let sIdx = 0

        for (let ix = 0; ix < AMOUNTX; ix++) {
          for (let iy = 0; iy < AMOUNTY; iy++) {
            const x = positions[idx]
            const z = positions[idx + 2]
            
            // Primary wave - large sweeping motion from left to right
            const wave1 = Math.sin((ix * 0.12) + (iy * 0.08) + time * 1.5) * 60
            
            // Secondary wave - opposite direction, slower
            const wave2 = Math.sin((ix * 0.08) - (iy * 0.1) + time * 0.8) * 40
            
            // Tertiary wave - vertical ripple
            const wave3 = Math.sin((ix + iy) * 0.06 + time * 1.2) * 30
            
            // Radial wave from center
            const dist = Math.sqrt(x * x + z * z)
            const radialWave = Math.sin(dist * 0.008 - time * 2) * 25
            
            // Combine all waves
            positions[idx + 1] = wave1 + wave2 + wave3 + radialWave

            // Scale based on wave height for visual emphasis
            const height = positions[idx + 1]
            scales[sIdx] = 
              (Math.sin((ix * 0.12) + (iy * 0.08) + time * 1.5) + 1.5) * 12 +
              Math.abs(height) * 0.15

            idx += 3
            sIdx++
          }
        }

        particles.geometry.attributes.position.needsUpdate = true
        particles.geometry.attributes.scale.needsUpdate = true

        // Rotate particles slightly for depth
        particles.rotation.y = time * 0.1

        renderer.render(scene, camera)
      }

      animate()
    }

    init()

    return () => {
      cancelAnimationFrame(animationId)
      renderer?.dispose()
      particles?.geometry?.dispose()
      particles?.material?.dispose()
    }
  }, [])

  return (
    <div 
      ref={containerRef} 
      className="absolute inset-0 z-0"
      style={{ pointerEvents: 'none' }}
    />
  )
}
