'use client';
import { LoadingOutlined } from '@ant-design/icons';
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
    <main className="w-full h-[100vh] flex items-center justify-center">
      <LoadingOutlined />
    </main>
  );
}
