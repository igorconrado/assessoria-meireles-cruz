import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import { Badge } from '@/components/ui'
import { cn } from '@/lib/utils'
import { getModulesWithProgress } from './actions'
import { LessonCheckbox } from './_components/LessonCheckbox'
import { LogoutButton } from './_components/LogoutButton'
import { AdminControls } from './_components/AdminControls'
import { LessonAccessButton } from './_components/LessonAccessButton'

export default async function MentoriaPage({
  searchParams,
}: {
  searchParams: { modulo?: string }
}) {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  const modules = await getModulesWithProgress()
  const selectedId = searchParams.modulo
  const selectedModule = selectedId
    ? modules.find((m) => m.id === selectedId)
    : undefined
  const isAdmin = user?.email === process.env.ADMIN_EMAIL

  return (
    <>
      {/* Header */}
      <header className="sticky top-0 z-10 h-16 bg-ivory/95 backdrop-blur-sm border-b border-navy/10 flex items-center justify-between px-8">
        <h1 className="font-display text-xl text-navy">Mentoria</h1>
        <div className="flex items-center gap-4">
          <span className="font-body text-sm text-navy/60">
            {user?.user_metadata?.name ?? user?.email}
          </span>
          <LogoutButton />
        </div>
      </header>

      {/* Layout */}
      <div className="flex">
        {/* Sidebar */}
        <aside className="w-[280px] shrink-0 border-r border-navy/10 h-[calc(100vh-64px)] sticky top-16 overflow-y-auto py-6">
          <p className="px-4 mb-4 font-body text-xs uppercase tracking-wider text-navy/40">
            Módulos
          </p>
          <nav>
            {modules.map((mod) => (
              <Link
                key={mod.id}
                href={`/mentoria?modulo=${mod.id}`}
                className={cn(
                  'block px-4 py-3 border-l-2 transition-colors duration-200',
                  selectedId === mod.id
                    ? 'border-l-gold bg-gold/5'
                    : 'border-l-transparent hover:bg-navy/5',
                )}
              >
                <p className="font-body text-sm font-medium text-navy">
                  {mod.title}
                </p>
                <div className="mt-2 h-1 bg-navy/10 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-sage rounded-full transition-all duration-500 ease-expo-out"
                    style={{ width: `${mod.progress ?? 0}%` }}
                  />
                </div>
                <p className="mt-1 font-mono text-xs text-gray-muted">
                  {mod.progress ?? 0}%
                </p>
              </Link>
            ))}
          </nav>
        </aside>

        {/* Content */}
        <main className="flex-1 p-8 min-h-[calc(100vh-64px)]">
          {selectedModule ? (
            <div className="max-w-3xl">
              <div className="flex items-center justify-between mb-2 opacity-0 animate-fade-up">
                <h2 className="font-display text-2xl text-navy">
                  {selectedModule.title}
                </h2>
                {isAdmin && <AdminControls moduleId={selectedModule.id} />}
              </div>
              {selectedModule.description && (
                <p className="font-body text-sm text-navy/50 mb-8 opacity-0 animate-fade-up stagger-2">
                  {selectedModule.description}
                </p>
              )}

              <div className="space-y-3">
                {selectedModule.lessons?.map((lesson, i) => {
                  const isNew =
                    Date.now() - new Date(lesson.created_at).getTime() <
                    48 * 60 * 60 * 1000
                  const isDraft = !lesson.published

                  return (
                    <div
                      key={lesson.id}
                      className={cn(
                        'group flex items-center gap-4 p-4',
                        'bg-white border border-navy/8 rounded-xl',
                        'transition-all duration-300 ease-expo-out',
                        'hover:shadow-card-light hover:border-navy/15',
                        'opacity-0 animate-fade-up',
                      )}
                      style={{ animationDelay: `${i * 80}ms` }}
                    >
                      <LessonCheckbox
                        lessonId={lesson.id}
                        completed={lesson.completed ?? false}
                      />

                      <Link
                        href={`/mentoria/${lesson.id}`}
                        className="flex-1 flex items-center justify-between min-w-0"
                      >
                        <div className="flex items-center gap-2 min-w-0">
                          <span
                            className={cn(
                              'font-body text-sm font-medium truncate',
                              lesson.completed
                                ? 'text-navy/40 line-through'
                                : 'text-navy',
                            )}
                          >
                            {lesson.title}
                          </span>
                          {isNew && !lesson.completed && (
                            <Badge variant="new">Novo</Badge>
                          )}
                          {isDraft && isAdmin && (
                            <Badge variant="coral">Rascunho</Badge>
                          )}
                        </div>

                        <svg
                          className="w-4 h-4 text-navy/20 group-hover:text-navy/40 transition-colors shrink-0 ml-2"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={2}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M9 5l7 7-7 7"
                          />
                        </svg>
                      </Link>

                      {isAdmin && (
                        <LessonAccessButton
                          lessonId={lesson.id}
                          lessonTitle={lesson.title}
                        />
                      )}
                    </div>
                  )
                })}

                {selectedModule.lessons?.length === 0 && (
                  <p className="font-body text-sm text-navy/30 text-center py-12">
                    Nenhuma aula disponível neste módulo ainda.
                  </p>
                )}
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-full min-h-[60vh]">
              <div className="w-16 h-16 rounded-full bg-navy/5 flex items-center justify-center mb-4">
                <svg
                  className="w-7 h-7 text-navy/20"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25"
                  />
                </svg>
              </div>
              <p className="font-display text-lg text-navy/30">
                Selecione um módulo
              </p>
              <p className="font-body text-sm text-navy/20 mt-1">
                Escolha um módulo na barra lateral para ver as aulas
              </p>
            </div>
          )}
        </main>
      </div>
    </>
  )
}
