'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from "next-themes"

// shadcn/ui
import { Button } from '@/components/ui/button';

export default function Dashboard() {
  const { user, logout, isLoading } = useAuth();
  const router = useRouter();
  
  useEffect(() => {
    if (!isLoading && !user) {
      router.push('/login');
    }
  }, [user, isLoading, router]);

  const handleLogout = () => {
    logout();
    router.push('/login');
  };

  if (isLoading || !user) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p>로딩 중...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-10">
          <div className="flex items-center">
            <Image 
              src="/logoAndTitle.png" 
              alt="FinSight" 
              width={200} 
              height={50} 
              className="h-auto"
            />
          </div>
          <Button
            onClick={handleLogout}
          >
            로그아웃
          </Button>
        </div>
      </div>
    </div>
  );
} 
