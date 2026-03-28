'use client'

import { useTransition } from 'react'
import { cn } from '@/lib/utils'
import { toggleLessonProgress } from '../actions'

export function LessonCheckbox({
  lessonId,
  completed,
}: {
  lessonId: string
  completed: boolean
}) {
  const [isPending, startTransition] = useTransition()

  return (
    <button
      type="button"
      onClick={(e) => {
        e.preventDefault()
        e.stopPropagation()
        startTransition(() => toggleLessonProgress(lessonId, !completed))
      }}
      disabled={isPending}
      className={cn(
        'w-6 h-6 rounded-full border-2 flex items-center justify-center',
        'transition-all duration-300 ease-expo-out shrink-0',
        completed
          ? 'bg-sage border-sage text-white'
          : 'border-navy/20 hover:border-sage/50',
        isPending && 'opacity-50',
      )}
      aria-label={completed ? 'Desmarcar aula' : 'Marcar aula como concluída'}
    >
      {completed && (
        <svg className="w-3.5 h-3.5" viewBox="0 0 14 14" fill="none">
          <path
            d="M2 7l3.5 3.5L12 4"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="animate-draw"
          />
        </svg>
      )}
    </button>
  )
}
