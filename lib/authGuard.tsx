'use client';

import React from 'react'; // ✅ Required for JSX types
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from './supabaseClient';
import { access } from 'fs';
type Props = {
  children: React.ReactNode;
  role?: 'admin' | 'intern';
};

export default function AuthGuard({ children, role }: Props) {
  const router = useRouter();
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        router.push('/login');
        return;
      }

      const { data, error } = await supabase
        .from('users')
        .select('role')
        .eq('id', user.id)
        .single();

      if (error || !data) {
        router.push('/login');
        return;
      }

      if (role && data.role !== role) {
        router.push('/');
        return;
      }

      setAuthorized(true);
    };

    checkAuth();
  }, [router, role]);

  if (!authorized) return <div className="p-8">Checking access...</div>;

  return <>{children}</>;
}

