'use client'

import { useEffect, useRef } from 'react'

interface Point {
  x: number
  y: number
  vx: number
  vy: number
}

const POINT_COUNT = 45
const CONNECTION_DISTANCE = 120
const MAX_SPEED = 0.3
const GOLD_R = 201
const GOLD_G = 168
const GOLD_B = 76

function createPoints(width: number, height: number): Point[] {
  return Array.from({ length: POINT_COUNT }, () => ({
    x: Math.random() * width,
    y: Math.random() * height,
    vx: (Math.random() - 0.5) * MAX_SPEED * 2,
    vy: (Math.random() - 0.5) * MAX_SPEED * 2,
  }))
}

export function GeometricCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animationId = 0
    let points = createPoints(canvas.offsetWidth, canvas.offsetHeight)

    function resize() {
      if (!canvas) return
      const dpr = window.devicePixelRatio || 1
      const rect = canvas.getBoundingClientRect()
      canvas.width = rect.width * dpr
      canvas.height = rect.height * dpr
      ctx!.scale(dpr, dpr)
      points = createPoints(rect.width, rect.height)
    }

    resize()

    function animate() {
      if (!canvas || !ctx) return

      const w = canvas.getBoundingClientRect().width
      const h = canvas.getBoundingClientRect().height

      ctx.clearRect(0, 0, w, h)

      for (const point of points) {
        point.x += point.vx
        point.y += point.vy

        if (point.x < 0 || point.x > w) point.vx *= -1
        if (point.y < 0 || point.y > h) point.vy *= -1

        point.x = Math.max(0, Math.min(w, point.x))
        point.y = Math.max(0, Math.min(h, point.y))
      }

      for (let i = 0; i < points.length; i++) {
        for (let j = i + 1; j < points.length; j++) {
          const dx = points[i]!.x - points[j]!.x
          const dy = points[i]!.y - points[j]!.y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < CONNECTION_DISTANCE) {
            const proximity = 1 - distance / CONNECTION_DISTANCE
            const opacity = 0.06 + proximity * 0.09

            ctx.beginPath()
            ctx.moveTo(points[i]!.x, points[i]!.y)
            ctx.lineTo(points[j]!.x, points[j]!.y)
            ctx.strokeStyle = `rgba(${GOLD_R},${GOLD_G},${GOLD_B},${opacity})`
            ctx.lineWidth = 1
            ctx.stroke()
          }
        }
      }

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
