'use client'

import { useState, useEffect, useTransition, useCallback } from 'react'
import { createPortal } from 'react-dom'
import { Button, Input } from '@/components/ui'
import { cn } from '@/lib/utils'
import { createLesson } from '@/app/(dashboard)/mentoria/actions'

interface CreateLessonModalProps {
  moduleId: string
  open: boolean
  onClose: () => void
  onCreated?: (lessonId: string, title: string) => void
}

function toSlug(value: string): string {
  return value
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
}

export function CreateLessonModal({
  moduleId,
  open,
  onClose,
  onCreated,
}: CreateLessonModalProps) {
  const [title, setTitle] = useState('')
  const [slug, setSlug] = useState('')
  const [published, setPublished] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [isPending, startTransition] = useTransition()

  const reset = useCallback(() => {
    setTitle('')
    setSlug('')
    setPublished(false)
    setError(null)
  }, [])

  function handleClose() {
    if (isPending) return
    reset()
    onClose()
  }

  function handleSubmit() {
    if (!title.trim()) {
      setError('Titulo e obrigatorio.')
      return
    }
    if (!slug.trim()) {
      setError('Slug e obrigatorio.')
      return
    }

    setError(null)

    startTransition(async () => {
      const { id, error: createError } = await createLesson(
        moduleId,
        title.trim(),
        slug.trim(),
        published,
      )

      if (createError || !id) {
        setError(createError ?? 'Erro ao criar aula.')
        return
      }

      reset()
      onClose()
      onCreated?.(id, title.trim())
    })
  }

  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!open || !mounted) return null

  return createPortal(
    <div className="fixed inset-0 z-[100]">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-navy/60 backdrop-blur-sm"
        onClick={handleClose}
      />

      {/* Modal */}
      <div className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-[101] w-full max-w-md bg-ivory rounded-2xl p-8 shadow-2xl animate-modal-in">
        <h2 className="font-display text-xl text-navy mb-6">Nova aula</h2>

        <div className="space-y-5">
          {/* Title */}
          <Input
            label="Titulo"
            id="lesson-title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Nome da aula"
            className="bg-white border-navy/15 text-navy placeholder:text-navy/30 hover:border-navy/25"
          />

          {/* Slug */}
          <Input
            label="Slug"
            id="lesson-slug"
            value={slug}
            onChange={(e) => setSlug(toSlug(e.target.value))}
            placeholder="autoconhecimento-01"
            hint="ex: autoconhecimento-01"
            className="bg-white border-navy/15 text-navy placeholder:text-navy/30 hover:border-navy/25"
          />

          {/* Published toggle */}
          <div className="flex items-center justify-between">
            <span className="font-body text-sm text-navy/70">
              Publicar imediatamente
            </span>
            <button
              type="button"
              onClick={() => setPublished(!published)}
              className={cn(
                'relative w-10 h-6 rounded-full transition-colors duration-200',
                published ? 'bg-sage' : 'bg-navy/15',
              )}
            >
              <span
                className={cn(
                  'absolute top-1 left-1 w-4 h-4 rounded-full bg-white transition-transform duration-200',
                  published && 'translate-x-4',
                )}
              />
            </button>
          </div>

          {/* Error */}
          {error && (
            <p className="font-body text-xs text-coral">{error}</p>
          )}

          {/* Actions */}
          <div className="flex items-center gap-3 pt-2">
            <Button
              variant="primary"
              loading={isPending}
              onClick={handleSubmit}
              className="flex-1 focus:ring-offset-ivory"
            >
              Criar aula
            </Button>
            <Button
              variant="ghost"
              onClick={handleClose}
              disabled={isPending}
              className="text-navy/60 border-navy/15 hover:text-navy hover:border-navy/30 focus:ring-offset-ivory"
            >
              Cancelar
            </Button>
          </div>
        </div>
      </div>
    </div>,
    document.body,
  )
}
