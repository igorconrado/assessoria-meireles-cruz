'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import type { Module } from '@/types/mentoria'

interface RawLesson {
  id: string
  module_id: string
  title: string
  slug: string
  published: boolean
  order: number
  created_at: string
  updated_at: string
}

interface RawModuleWithLessons {
  id: string
  title: string
  description: string | null
  order: number
  created_at: string
  updated_at: string
  lessons: RawLesson[]
}

export async function getModulesWithProgress(): Promise<Module[]> {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) return []

  const { data: modules } = await supabase
    .from('modules')
    .select('*, lessons(*)')
    .order('order')
    .order('order', { referencedTable: 'lessons' })
    .returns<RawModuleWithLessons[]>()

  const { data: progress } = await supabase
    .from('lesson_progress')
    .select('lesson_id')
    .eq('user_id', user.id)
    .returns<{ lesson_id: string }[]>()

  const completedIds = new Set(progress?.map((p) => p.lesson_id) ?? [])

  return (modules ?? []).map((mod) => ({
    ...mod,
    lessons: mod.lessons.map((lesson) => ({
      ...lesson,
      completed: completedIds.has(lesson.id),
    })),
    progress: mod.lessons.length
      ? Math.round(
          (mod.lessons.filter((l) => completedIds.has(l.id)).length /
            mod.lessons.length) *
            100,
        )
      : 0,
  }))
}

export async function logout() {
  const supabase = await createClient()
  await supabase.auth.signOut()
  redirect('/login')
}

export async function toggleLessonProgress(
  lessonId: string,
  completed: boolean,
) {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) return

  if (completed) {
    await supabase.from('lesson_progress').insert({
      user_id: user.id,
      lesson_id: lessonId,
    })
  } else {
    await supabase
      .from('lesson_progress')
      .delete()
      .eq('user_id', user.id)
      .eq('lesson_id', lessonId)
  }

  revalidatePath('/mentoria')
}

export async function createModule(title: string, description: string) {
  const supabase = await createClient()

  const { data: existing } = await supabase
    .from('modules')
    .select('order')
    .order('order', { ascending: false })
    .limit(1)
    .returns<{ order: number }[]>()

  const nextOrder = (existing?.[0]?.order ?? 0) + 1

  const { data, error } = await supabase
    .from('modules')
    .insert({ title, description, order: nextOrder })
    .select()
    .single()

  revalidatePath('/mentoria')
  return { data, error }
}

export async function createLesson(
  moduleId: string,
  title: string,
  slug: string,
  published: boolean,
): Promise<{ id: string | null; error: string | null }> {
  const supabase = await createClient()

  const { data: existing } = await supabase
    .from('lessons')
    .select('order')
    .eq('module_id', moduleId)
    .order('order', { ascending: false })
    .limit(1)
    .returns<{ order: number }[]>()

  const nextOrder = (existing?.[0]?.order ?? 0) + 1

  const { data, error } = await supabase
    .from('lessons')
    .insert({
      module_id: moduleId,
      title,
      slug,
      published,
      order: nextOrder,
    })
    .select('id')
    .single()

  revalidatePath('/mentoria')

  const result = data as unknown as { id: string } | null
  return { id: result?.id ?? null, error: error?.message ?? null }
}

export async function toggleLessonPublished(
  lessonId: string,
  published: boolean,
) {
  const supabase = await createClient()
  await supabase.from('lessons').update({ published }).eq('id', lessonId)
  revalidatePath('/mentoria')
}

export async function grantLessonAccess(
  lessonId: string,
  userId: string,
): Promise<{ error: string | null }> {
  const supabase = await createClient()

  const { error } = await supabase
    .from('lesson_access')
    .upsert({ lesson_id: lessonId, user_id: userId })

  return { error: error?.message ?? null }
}

export async function revokeLessonAccess(
  lessonId: string,
  userId: string,
): Promise<{ error: string | null }> {
  const supabase = await createClient()

  const { error } = await supabase
    .from('lesson_access')
    .delete()
    .eq('lesson_id', lessonId)
    .eq('user_id', userId)

  return { error: error?.message ?? null }
}

export async function getLessonAccess(lessonId: string): Promise<string[]> {
  const supabase = await createClient()

  const { data } = await supabase
    .from('lesson_access')
    .select('user_id')
    .eq('lesson_id', lessonId)
    .returns<{ user_id: string }[]>()

  return data?.map((row) => row.user_id) ?? []
}

export async function getUsers(): Promise<{ id: string; email: string }[]> {
  // Temporario ate ter service role key configurada
  return [
    { id: '', email: 'camila@email.com' },
    { id: '', email: 'vitor@email.com' },
    { id: '', email: 'raquel@email.com' },
  ]
}
