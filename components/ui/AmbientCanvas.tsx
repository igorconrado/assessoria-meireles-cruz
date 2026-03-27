'use client'

import { useEffect, useRef } from 'react'

const PARTICLE_COUNT = 60
const CONNECTION_DISTANCE = 100
const GOLD_R = 201
const GOLD_G = 168
const GOLD_B = 76
const NAVY_R = 13
const NAVY_G = 27
const NAVY_B = 42

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  opacity: number
  angle: number
  angleSpeed: number
  speed: number
}

function createParticles(width: number, height: number): Particle[] {
  return Array.from({ length: PARTICLE_COUNT }, () => {
    const angle = Math.random() * Math.PI * 2
    const speed = 0.15 + Math.random() * 0.25
    return {
      x: Math.random() * width,
      y: Math.random() * height,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed,
      opacity: 0.2 + Math.random() * 0.4,
      angle,
      angleSpeed: (Math.random() - 0.5) * 0.02,
      speed,
    }
  })
}

export function AmbientCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animationId = 0
    let w = 0
    let h = 0
    let particles: Particle[] = []

    function resize() {
      if (!canvas) return
      const dpr = window.devicePixelRatio || 1
      const rect = canvas.getBoundingClientRect()
      w = rect.width
      h = rect.height
      canvas.width = w * dpr
      canvas.height = h * dpr
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0)
      particles = createParticles(w, h)
    }

    resize()

    function animate(time: number) {
      if (!ctx) return

      ctx.clearRect(0, 0, w, h)

      // Layer 2 — ambient pulse (rendered first, underneath)
      const pulsePhase = Math.sin(time * 0.0004)
      const pulseRadius = 275 + pulsePhase * 75
      const pulseOpacity = 0.05 + pulsePhase * 0.02
      const gradient = ctx.createRadialGradient(
        w / 2, h / 2, 0,
        w / 2, h / 2, pulseRadius,
      )
      gradient.addColorStop(0, `rgba(${GOLD_R},${GOLD_G},${GOLD_B},${pulseOpacity})`)
      gradient.addColorStop(1, `rgba(${GOLD_R},${GOLD_G},${GOLD_B},0)`)
      ctx.fillStyle = gradient
      ctx.fillRect(0, 0, w, h)

      // Layer 1 — particles + connections
      for (const p of particles) {
        // Brownian drift: gradually shift direction
        p.angle += p.angleSpeed
        p.vx = Math.cos(p.angle) * p.speed
        p.vy = Math.sin(p.angle) * p.speed

        p.x += p.vx
        p.y += p.vy

        // Wrap around edges
        if (p.x < 0) p.x += w
        if (p.x > w) p.x -= w
        if (p.y < 0) p.y += h
        if (p.y > h) p.y -= h
      }

      // Draw connections
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const a = particles[i]!
          const b = particles[j]!
          const dx = a.x - b.x
          const dy = a.y - b.y
          const dist = Math.sqrt(dx * dx + dy * dy)

          if (dist < CONNECTION_DISTANCE) {
            const opacity = (1 - dist / CONNECTION_DISTANCE) * 0.12
            ctx.beginPath()
            ctx.moveTo(a.x, a.y)
            ctx.lineTo(b.x, b.y)
            ctx.strokeStyle = `rgba(${GOLD_R},${GOLD_G},${GOLD_B},${opacity})`
            ctx.lineWidth = 1
            ctx.stroke()
          }
        }
      }

      // Draw particles (tiny dots)
      for (const p of particles) {
        ctx.beginPath()
        ctx.arc(p.x, p.y, 1, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${GOLD_R},${GOLD_G},${GOLD_B},${p.opacity})`
        ctx.fill()
      }

      // Layer 3 — vignette overlay (rendered last, on top)
      const vignette = ctx.createRadialGradient(
        w / 2, h / 2, w * 0.2,
        w / 2, h / 2, w * 0.8,
      )
      vignette.addColorStop(0, 'transparent')
      vignette.addColorStop(1, `rgba(${NAVY_R},${NAVY_G},${NAVY_B},0.6)`)
      ctx.fillStyle = vignette
      ctx.fillRect(0, 0, w, h)

      animationId = requestAnimationFrame(animate)
    }

    animationId = requestAnimationFrame(animate)
    window.addEventListener('resize', resize)

    return () => {
      cancelAnimationFrame(animationId)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{ pointerEvents: 'none' }}
    />
  )
}
