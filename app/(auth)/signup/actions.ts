'use server';

import { createClient } from '@/utils/supabase/server';
import prisma from '@/lib/prisma';
import { redirect } from 'next/navigation';

export async function signup(formData: FormData) {
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;
  const name = formData.get('name') as string;

  if (!email || !password || !name) {
    return redirect('/signup?error=All fields are required');
  }

  const supabase = await createClient();

  // 1. Sign up the user in Supabase Auth
  const { data, error: authError } = await supabase.auth.signUp({
    email,
    password,
  });

  if (authError) {
    return redirect(`/signup?error=${encodeURIComponent(authError.message)}`);
  }

  // 2. If Supabase auth succeeds, mirror the user into our Prisma database
  if (data?.user?.id) {
    try {
      await prisma.user.create({
        data: {
          id: data.user.id, // Match the exact UUID from Supabase
          email: email,
          name: name,
          role: 'ADMIN', // Defaulting to ADMIN for now so you can test the dashboard
        },
      });
  } catch (dbError: any) {
      console.error('Failed to sync user to Prisma:', dbError);
      
      // Pull the exact error message from Prisma or the Node-Postgres driver
      const databaseMessage = dbError?.message || 'Unknown database exception';
      
      return redirect(`/signup?error=${encodeURIComponent(databaseMessage)}`);
    }
  }

  // Send them straight to the admin dashboard after successful registration
  return redirect('/admin');
}