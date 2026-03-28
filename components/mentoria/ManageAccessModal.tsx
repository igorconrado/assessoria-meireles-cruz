'use client'

import { useState, useEffect, useTransition, useCallback } from 'react'
import { createPortal } from 'react-dom'
import { Button } from '@/components/ui'
import { cn } from '@/lib/utils'
import {
  getUsers,
  getLessonAccess,
  grantLessonAccess,
  revokeLessonAccess,
} from '@/app/(dashboard)/mentoria/actions'

interface ManageAccessModalProps {
  lessonId: string
  lessonTitle: string
  onClose: () => void
}

interface UserAccess {
  id: string
  email: string
  hasAccess: boolean
}

export function ManageAccessModal({
  lessonId,
  lessonTitle,
  onClose,
}: ManageAccessModalProps) {
  const [mounted, setMounted] = useState(false)
  const [users, setUsers] = useState<UserAccess[]>([])
  const [loading, setLoading] = useState(true)
  const [togglingUser, setTogglingUser] = useState<string | null>(null)
  const [, startTransition] = useTransition()

  const loadAccess = useCallback(async () => {
    setLoading(true)
    const [allUsers, accessIds] = await Promise.all([
      getUsers(),
      getLessonAccess(lessonId),
    ])
    setUsers(
      allUsers.map((u) => ({
        ...u,
        hasAccess: accessIds.includes(u.id),
      })),
    )
    setLoading(false)
  }, [lessonId])

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (mounted) {
      loadAccess()
    }
  }, [mounted, loadAccess])

  function handleToggle(user: UserAccess) {
    setTogglingUser(user.id)
    startTransition(async () => {
      if (user.hasAccess) {
        await revokeLessonAccess(lessonId, user.id)
      } else {
        await grantLessonAccess(lessonId, user.id)
      }
      setUsers((prev) =>
        prev.map((u) =>
          u.id === user.id ? { ...u, hasAccess: !u.hasAccess } : u,
        ),
      )
      setTogglingUser(null)
    })
  }

  function getInitial(email: string): string {
    return email.charAt(0).toUpperCase()
  }

  if (!mounted) return null

  return createPortal(
    <div className="fixed inset-0 z-[100]">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-navy/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-[101] w-full max-w-md bg-ivory rounded-2xl p-8 shadow-2xl animate-modal-in">
        <h2 className="font-display text-xl text-navy mb-1">
          Acesso a aula
        </h2>
        <p className="font-body text-sm text-navy/50 mb-6 truncate">
          {lessonTitle}
        </p>

        {loading ? (
          <div className="flex justify-center py-8">
            <div className="w-6 h-6 border-2 border-navy/20 border-t-gold rounded-full animate-spin" />
          </div>
        ) : (
          <div className="space-y-3">
            {users.map((user) => (
              <div
                key={user.email}
                className="flex items-center gap-3 p-3 bg-white border border-navy/8 rounded-xl"
              >
                {/* Avatar */}
                <div className="w-9 h-9 rounded-full bg-navy/10 flex items-center justify-center shrink-0">
                  <span className="font-display text-sm text-navy/60">
                    {getInitial(user.email)}
                  </span>
                </div>

                {/* Email */}
                <span className="flex-1 font-body text-sm text-navy truncate">
                  {user.email}
                </span>

                {/* Toggle */}
                <button
                  type="button"
                  disabled={togglingUser === user.id}
                  onClick={() => handleToggle(user)}
                  className={cn(
                    'relative w-10 h-6 rounded-full transition-colors duration-200',
                    togglingUser === user.id && 'opacity-50',
                    user.hasAccess ? 'bg-gold' : 'bg-navy/15',
                  )}
                >
                  <span
                    className={cn(
                      'absolute top-1 left-1 w-4 h-4 rounded-full bg-white transition-transform duration-200',
                      user.hasAccess && 'translate-x-4',
                    )}
                  />
                </button>
              </div>
            ))}
          </div>
        )}

        <div className="mt-6">
          <Button
            variant="ghost"
            onClick={onClose}
            className="w-full text-navy/60 border-navy/15 hover:text-navy hover:border-navy/30 focus:ring-offset-ivory"
          >
            Fechar
          </Button>
        </div>
      </div>
    </div>,
    document.body,
  )
}
