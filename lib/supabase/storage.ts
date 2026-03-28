'use server'

// @deprecated — Upload de HTML sera substituido pelo novo sistema de aulas baseado em slug.
// Mantido para referencia futura.

import { createClient } from '@/lib/supabase/server'

/** @deprecated Usar o novo sistema de aulas baseado em slug */
export async function uploadLessonHtml(
  file: File,
  lessonId: string,
): Promise<{ url: string | null; error: string | null }> {
  const supabase = await createClient()

  const filename = `lessons/${lessonId}/content.html`

  const { error } = await supabase.storage
    .from('lesson-content')
    .upload(filename, file, {
      contentType: 'text/html',
      upsert: true,
    })

  if (error) return { url: null, error: error.message }

  const { data } = supabase.storage
    .from('lesson-content')
    .getPublicUrl(filename)

  return { url: data.publicUrl, error: null }
}
