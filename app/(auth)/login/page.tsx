'use client'

import { useFormState, useFormStatus } from 'react-dom'
import { login } from './actions'
import { Button, Input } from '@/components/ui'

function SubmitButton() {
  const { pending } = useFormStatus()

  return (
    <div className="mt-8 opacity-0 animate-fade-up stagger-4">
      <Button
        type="submit"
        variant="primary"
        size="lg"
        loading={pending}
        className="w-full"
      >
        Entrar
      </Button>
    </div>
  )
}

function FormFields() {
  const { pending } = useFormStatus()

  return (
    <div className="mt-10 flex flex-col gap-5 opacity-0 animate-fade-up stagger-3">
      <Input
        id="email"
        name="email"
        type="email"
        label="Email"
        placeholder="seu@email.com"
        required
        autoComplete="email"
        disabled={pending}
      />

      <Input
        id="password"
        name="password"
        type="password"
        label="Senha"
        placeholder="••••••••"
        required
        autoComplete="current-password"
        disabled={pending}
      />
    </div>
  )
}

export default function LoginPage() {
  const [state, formAction] = useFormState(login, null)

  return (
    <div className="min-h-screen flex">
      {/* Left column — visual branding (desktop only) */}
      <div className="hidden lg:flex lg:w-1/2 bg-slate border-r border-gray-muted/10 flex-col items-center justify-between py-16 px-12">
        <div />

        <div className="flex flex-col items-center text-center max-w-md">
          <span className="font-display text-7xl text-gold select-none">A</span>
          <p className="mt-4 font-body text-sm text-gray-muted tracking-wide">
            Assessoria Meireles Cruz
          </p>

          <blockquote className="mt-20 font-display italic text-lg text-ivory/80 leading-relaxed">
            &ldquo;Disciplina é a ponte entre metas e conquistas.&rdquo;
          </blockquote>
        </div>

        <p className="font-body text-xs text-gray-muted/40">
          Plataforma privada · Acesso restrito
        </p>
      </div>

      {/* Right column — login form */}
      <div className="flex w-full lg:w-1/2 bg-navy items-center justify-center px-6 sm:px-12">
        <form action={formAction} className="w-full max-w-[380px]">
          <h1 className="font-display text-3xl text-ivory opacity-0 animate-fade-up stagger-1">
            Bem-vindo
          </h1>

          <p className="mt-2 font-body text-sm text-gray-muted opacity-0 animate-fade-up stagger-2">
            Acesse sua plataforma de assessoria
          </p>

          <FormFields />

          {state?.error && (
            <div className="mt-4 flex items-center gap-2 text-coral">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="w-4 h-4 shrink-0"
              >
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-5a.75.75 0 01.75.75v4.5a.75.75 0 01-1.5 0v-4.5A.75.75 0 0110 5zm0 10a1 1 0 100-2 1 1 0 000 2z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="font-body text-xs">{state.error}</span>
            </div>
          )}

          <SubmitButton />

          <p className="mt-8 text-center font-body text-xs text-gray-muted/40 opacity-0 animate-fade-up stagger-5">
            Acesso restrito. Não é possível criar uma conta.
          </p>
        </form>
      </div>
    </div>
  )
}
