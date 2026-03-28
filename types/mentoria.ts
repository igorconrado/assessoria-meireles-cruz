export interface Module {
  id: string
  title: string
  description: string | null
  order: number
  created_at: string
  updated_at: string
  lessons?: Lesson[]
  progress?: number
}

export interface Lesson {
  id: string
  module_id: string
  title: string
  slug: string
  published: boolean
  order: number
  created_at: string
  updated_at: string
  completed?: boolean
}

export interface LessonAccess {
  id: string
  lesson_id: string
  user_id: string
  granted_at: string
}

export interface LessonProgress {
  id: string
  user_id: string
  lesson_id: string
  completed_at: string
}
