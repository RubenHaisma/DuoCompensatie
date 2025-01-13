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
    return { error: 'Invalid email' };
  }

  // Password validation
  if (data.password.length < 6) {
    return { error: 'Password is too short' };
  }

  const { error } = await supabase.auth.signInWithPassword(data);

  if (error) {
    if (error.message.includes('Email not confirmed')) {
      return { error: 'Email not confirmed' };
    }
    if (error.message.includes('Invalid login credentials')) {
      return { error: 'Invalid login credentials' };
    }
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
    return { error: 'Invalid email' };
  }

  // Password validation
  if (data.password.length < 6) {
    return { error: 'Password is too short' };
  }

  // Username validation
  if (data.username.length < 3) {
    return { error: 'Username is too short' };
  }

  const { error: signUpError } = await supabase.auth.signUp({
    email: data.email,
    password: data.password,
  });

  if (signUpError) {
    if (signUpError.message.includes('already registered')) {
      return { error: 'User already registered' };
    }
    return { error: signUpError.message };
  }

  const { error: profileError } = await supabase
    .from('profiles')
    .insert({
      id: (await supabase.auth.getUser()).data.user?.id,
      email: data.email.trim(),
      full_name: data.username.trim(),
    });

  if (profileError) {
    return { error: profileError.message };
  }

  revalidatePath('/', 'layout');
  redirect('/dashboard');
}