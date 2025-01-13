import { createClient } from './client'; // Import the Supabase client
import { notFound } from 'next/navigation';

/**
 * Fetch loan data for the authenticated user.
 */
export async function getLoanData() {
  const supabase = await createClient();

  // Retrieve the user's session
  const { data: sessionData } = await supabase.auth.getSession();
  const session = sessionData?.session;

  if (!session) {
    notFound(); // Redirect to a 404 page if the user is not authenticated
  }

  // Fetch loan details for the authenticated user
  const { data: loanDetails, error: loanError } = await supabase
    .from('loan_details')
    .select('*')
    .eq('user_id', session.user.id)
    .single();

  if (loanError || !loanDetails) {
    notFound(); // Handle missing loan details
  }

  // Fetch payment details for the authenticated user
  const { data: payments, error: paymentsError } = await supabase
    .from('payments')
    .select('*')
    .eq('user_id', session.user.id)
    .order('payment_date', { ascending: true });

  if (paymentsError) {
    console.error('Error fetching payments:', paymentsError);
  }

  return { loanDetails, payments: payments || [] };
}
