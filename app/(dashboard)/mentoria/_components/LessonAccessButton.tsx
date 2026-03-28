'use client'

import { useState } from 'react'
import { ManageAccessModal } from '@/components/mentoria/ManageAccessModal'

export function LessonAccessButton({
  lessonId,
  lessonTitle,
}: {
  lessonId: string
  lessonTitle: string
}) {
  const [showModal, setShowModal] = useState(false)

  return (
    <>
      <button
        type="button"
        onClick={(e) => {
          e.preventDefault()
          e.stopPropagation()
          setShowModal(true)
        }}
        className="p-1.5 rounded-lg text-navy/30 hover:text-navy/60 hover:bg-navy/5 transition-colors"
        title="Gerenciar acesso"
      >
        <svg
          className="w-4 h-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"
          />
        </svg>
      </button>

      {showModal && (
        <ManageAccessModal
          lessonId={lessonId}
          lessonTitle={lessonTitle}
          onClose={() => setShowModal(false)}
        />
      )}
    </>
  )
}
