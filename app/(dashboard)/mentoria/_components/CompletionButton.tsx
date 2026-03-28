'use client'

import { useTransition } from 'react'
import { Button } from '@/components/ui'
import { cn } from '@/lib/utils'
import { toggleLessonProgress } from '../actions'

export function CompletionButton({
  lessonId,
  completed,
}: {
  lessonId: string
  completed: boolean
}) {
  const [isPending, startTransition] = useTransition()

  return (
    <Button
      variant={completed ? 'ghost' : 'primary'}
      loading={isPending}
      onClick={() =>
        startTransition(() => toggleLessonProgress(lessonId, !completed))
      }
      className={cn(
        'focus:ring-offset-ivory',
        completed &&
          'text-sage border-sage/30 hover:text-sage hover:border-sage/50',
      )}
    >
      {completed ? 'Concluída \u2713' : 'Marcar como concluída'}
    </Button>
  )
}
