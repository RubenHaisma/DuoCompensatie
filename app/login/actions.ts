'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { createClient } from '@/utils/supabase/server';

export async function login(formData: FormData) {
  const supabase = await createClient();

  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  };

  // Validate input
  if (!data.email || !data.password) {
    return { error: 'Missing required fields' };
  }

  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(data.email)) {
    return { error: 'Invalid email format' };
  }

  // Password validation
  if (data.password.length < 6) {
    return { error: 'Password must be at least 6 characters' };
  }

  const { error } = await supabase.auth.signInWithPassword(data);

  if (error) {
    return { error: error.message };
  }

  revalidatePath('/', 'layout');
  redirect('/dashboard');
}

export async function signup(formData: FormData) {
  const supabase = await createClient();

  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
    username: formData.get('username') as string,
  };

  // Validate input
  if (!data.email || !data.password || !data.username) {
    return { error: 'Missing required fields' };
  }

  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(data.email)) {
    return { error: 'Invalid email format' };
  }

  // Password validation
  if (data.password.length < 6) {
    return { error: 'Password must be at least 6 characters' };
  }

  // Username validation
  if (data.username.length < 3) {
    return { error: 'Username must be at least 3 characters' };
  }

  const { data: { user }, error: signUpError } = await supabase.auth.signUp({
    email: data.email,
    password: data.password,
    options: {
      data: {
        full_name: data.username,
      },
    },
  });

  if (signUpError) {
    return { error: signUpError.message };
  }

  if (!user) {
    return { error: 'Failed to create user' };
  }

  // Create profile
  const { error: profileError } = await supabase
    .from('profiles')
    .insert({
      id: user.id,
      email: data.email.trim(),
      full_name: data.username.trim(),
    });

  if (profileError) {
    return { error: profileError.message };
  }

  revalidatePath('/', 'layout');
  redirect('/dashboard/setup');
}