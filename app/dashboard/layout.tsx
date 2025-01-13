import { redirect } from 'next/navigation';
import { createClient } from '@/utils/supabase/server';
import { Sidebar } from '@/components/dashboard/Sidebar';

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const { data: { session } } = await supabase.auth.getSession();

  if (!session) {
    redirect('/login');
  }

  // Check if user has completed setup
  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', session.user.id)
    .single();

  const { data: loanDetails } = await supabase
    .from('loan_details')
    .select('*')
    .eq('user_id', session.user.id)
    .single();

  if (!profile?.full_name || !loanDetails) {
    redirect('/dashboard/setup');
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex">
        <Sidebar />
        <main className="flex-1 p-8">
          {children}
        </main>
      </div>
    </div>
  );
}