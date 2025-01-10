'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

import { createClient } from '@/utils/supabase/server'

export async function login(formData: FormData) {
  const supabase = await createClient()

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  }

  const { error } = await supabase.auth.signInWithPassword(data)

  if (error) {
    redirect('/error')
  }

  revalidatePath('/', 'layout')
  redirect('/')
}

export async function signup(formData: FormData) {
  const supabase = await createClient();

  // Extract and validate form data
  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
    username: formData.get('username') as string,
  };

  if (!data.email || !data.password || !data.username) {
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

  const user = authData.user;

  if (!user) {
    throw new Error('User registration failed. Please try again.');
  }

  // Step 2: Create the profile
  const { error: profileError } = await supabase
    .from('profiles')
    .insert([
      {
        id: user.id, // Use the user ID from authentication
        username: data.username.trim(), // Trim any extra spaces
        avatar_url: null, // Optional: Set default avatar or leave null
      },
    ]);

  if (profileError) {
    console.error('[Signup] Error creating profile:', profileError);
    redirect('/error');
  }

  // Step 3: Redirect to the dashboard
  revalidatePath('/');
  redirect('/dashboard');
}