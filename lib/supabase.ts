import { createClient } from '@supabase/supabase-js';
import { Database } from '@/types/supabase';

// Create Supabase client with typed Database
export const supabase = createClient<Database>(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

// Export typed row definitions for easy reuse in your project
export type Profile = Database['public']['Tables']['profiles']['Row'];
export type LoanDetail = Database['public']['Tables']['loan_details']['Row'];
export type Payment = Database['public']['Tables']['payments']['Row'];
export type Subscription = Database['public']['Tables']['subscriptions']['Row'];

// Example: Export insert and update types if needed
export type ProfileInsert = Database['public']['Tables']['profiles']['Insert'];
export type LoanDetailInsert = Database['public']['Tables']['loan_details']['Insert'];
export type PaymentInsert = Database['public']['Tables']['payments']['Insert'];
export type SubscriptionInsert = Database['public']['Tables']['subscriptions']['Insert'];

export type ProfileUpdate = Database['public']['Tables']['profiles']['Update'];
export type LoanDetailUpdate = Database['public']['Tables']['loan_details']['Update'];
export type PaymentUpdate = Database['public']['Tables']['payments']['Update'];
export type SubscriptionUpdate = Database['public']['Tables']['subscriptions']['Update'];