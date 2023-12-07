'use client';
import { LoadingOutlined } from '@ant-design/icons';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';
export default function Home() {
  const router = useRouter();
  useEffect(() => {
    checkAuth();
  }, []);
  const checkAuth = () => {
    const storage_user: any = localStorage.getItem('user_info');
    console.log('storage_users', storage_user);
    if (storage_user) router.push('/dashboard/treatments');
    else {
      router.push('/login');
    }
  };
  return (
    <main className="w-full h-[100vh] flex items-center justify-center">
      <LoadingOutlined />
    </main>
  );
}
