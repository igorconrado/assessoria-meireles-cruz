import { createClient } from '@/lib/supabase/server'
import { redirect, notFound } from 'next/navigation'

export default async function LessonRedirectPage({
  params,
}: {
  params: { lessonId: string }
}) {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const { data: lesson } = await supabase
    .from('lessons')
    .select('slug')
    .eq('id', params.lessonId)
    .single()

  if (!lesson?.slug) notFound()
  redirect(`/mentoria/aulas/${lesson.slug}`)
}
