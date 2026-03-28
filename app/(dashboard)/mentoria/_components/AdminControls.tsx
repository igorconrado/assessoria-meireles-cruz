'use client'

import { useState } from 'react'
import { Button } from '@/components/ui'
import { CreateLessonModal } from '@/components/mentoria/CreateLessonModal'
import { ManageAccessModal } from '@/components/mentoria/ManageAccessModal'

export function AdminControls({ moduleId }: { moduleId: string }) {
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [accessModal, setAccessModal] = useState<{
    lessonId: string
    title: string
  } | null>(null)

  return (
    <>
      <Button
        variant="primary"
        size="sm"
        onClick={() => setShowCreateModal(true)}
        className="focus:ring-offset-ivory"
      >
        Nova aula
      </Button>

      <CreateLessonModal
        moduleId={moduleId}
        open={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        onCreated={(lessonId, title) => {
          setAccessModal({ lessonId, title })
        }}
      />

      {accessModal && (
        <ManageAccessModal
          lessonId={accessModal.lessonId}
          lessonTitle={accessModal.title}
          onClose={() => setAccessModal(null)}
        />
      )}
    </>
  )
}
