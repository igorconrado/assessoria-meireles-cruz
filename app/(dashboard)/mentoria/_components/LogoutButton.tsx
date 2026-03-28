'use client'

import { useTransition } from 'react'
import { Button } from '@/components/ui'
import { logout } from '../actions'

export function LogoutButton() {
  const [isPending, startTransition] = useTransition()

  return (
    <Button
      variant="ghost"
      size="sm"
      loading={isPending}
      onClick={() => startTransition(() => logout())}
      className="text-navy/60 border-navy/15 hover:text-navy hover:border-navy/30 focus:ring-offset-ivory"
    >
      Sair
    </Button>
  )
}
