import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'

export default async function DashboardPage() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) redirect('/login')

  return (
    <main className="min-h-screen bg-navy flex items-center justify-center">
      <div className="text-center">
        <h1 className="font-display text-4xl text-ivory mb-2">Dashboard</h1>
        <p className="font-body text-sm text-gray-muted">Em construção</p>
      </div>
    </main>
  )
}
