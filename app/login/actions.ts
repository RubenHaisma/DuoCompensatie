'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { createClient } from '@/utils/supabase/server';

export async function login(formData: FormData) {
  const supabase = await createClient();

  console.log('[Login] Starting login process');
  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  };
  console.log('[Login] Form data:', data);

  const { data: session, error } = await supabase.auth.signInWithPassword(data);

  if (error) {
    console.error('[Login] Error logging in:', error.message);
    redirect('/error');
  }

  if (!session) {
    console.error('[Login] Session not created. Something went wrong.');
    redirect('/error');
  }

  console.log('[Login] Login successful, redirecting to dashboard');
  redirect('/dashboard');
}


export async function signup(formData: FormData) {
  console.log('[Signup] Starting signup process');
  const supabase = await createClient();

  // Extract and validate form data
  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
    username: formData.get('username') as string,
  };

  console.log('[Signup] Form data:', data);

  if (!data.email || !data.password || !data.username) {
    console.error('[Signup] Validation error: All fields are required');
    throw new Error('All fields are required');
  }

  // Step 1: Sign up the user
  const { data: authData, error: signUpError } = await supabase.auth.signUp({
    email: data.email,
    password: data.password,
  });

  if (signUpError) {
    console.error('[Signup] Error signing up:', signUpError);
    redirect('/error');
  }

  console.log('[Signup] User signed up successfully:', authData);

  const user = authData.user;

  if (!user) {
    console.error('[Signup] User registration failed');
    throw new Error('User registration failed. Please try again.');
  }

  // Step 2: Add the user to the `profiles` table
  const { error: profileError } = await supabase
    .from('profiles')
    .insert({
      id: user.id, // Use the user ID from authentication
      email: data.email.trim(),
      full_name: data.username.trim(),
    });

  if (profileError) {
    console.error('[Signup] Error creating profile:', profileError);
    redirect('/error');
  }

  console.log('[Signup] Profile created successfully for user:', user.id);

  // Step 3: Redirect to the dashboard
  revalidatePath('/');
  console.log('[Signup] Redirecting to dashboard');
  redirect('/dashboard');
}
