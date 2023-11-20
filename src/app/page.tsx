'use client';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';
export default function Home() {
  const router = useRouter();
  useEffect(() => {
    checkAuthRole();
  }, []);
  const checkAuthRole = () => {
    router.push('/dashboard/treatments');
  };
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      this is main page no auth
    </main>
  );
}
