import { redirect } from 'next/navigation'
import { createServiceClient } from '@/lib/supabase/server'

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createServiceClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) redirect('/admin/login')

  const { data: adminUser } = await supabase
    .from('admin_users')
    .select('role')
    .eq('id', user.id)
    .single()

  if (!adminUser) redirect('/')

  return (
    <div className="min-h-screen bg-surface">
      <div className="bg-brand-slate border-b border-brand-slate-dark px-4 sm:px-6 lg:px-8 py-3">
        <span className="text-white font-semibold text-sm">Admin — ElderLawyerDirectory.com</span>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </div>
    </div>
  )
}
