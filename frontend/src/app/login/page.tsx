'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import styles from './login.module.css';
import Logo from './logo';
import { useAuth } from '../contexts/AuthContext';

// shadcn/ui
import { Button } from '@/components/ui/button';
import { Label } from "@/components/ui/label"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useTheme } from "next-themes"
import { Sun, Moon } from 'lucide-react';
import LogoImage from '../../../public/logo.png';

export default function LoginPage() {
  const router = useRouter();
  const { user } = useAuth();
  const { setTheme } = useTheme();

  useEffect(() => {
    if (user) {
      router.push('/dashboard');
    }
  }, [user, router]);

  const handleGoogleLogin = () => {
    console.log('Google login clicked');
  };

  return (
    <div className={`flex min-h-screen flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8 ${styles.loginContainer} ${styles.fadeIn}`}>
      <div className="absolute top-4 right-4">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="icon" className="border border-gray-200 dark:border-gray-700 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm">
              <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0 text-amber-500" />
              <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100 text-sky-400" />
              <span className="sr-only">테마 변경</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="dark:bg-gray-800 dark:border-gray-700">
            <DropdownMenuItem onClick={() => setTheme("light")} className="dark:hover:bg-gray-700 dark:focus:bg-gray-700">
              <Sun className="mr-2 h-4 w-4 text-amber-500" />
              <span>라이트</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setTheme("dark")} className="dark:hover:bg-gray-700 dark:focus:bg-gray-700">
              <Moon className="mr-2 h-4 w-4 text-sky-400" />
              <span>다크</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setTheme("system")} className="dark:hover:bg-gray-700 dark:focus:bg-gray-700">
              <span className="mr-2">💻</span>
              <span>시스템</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      
      <div className="w-full max-w-md space-y-8">
        <div className={`p-8 rounded-xl ${styles.formContainer}`}>
          <div className="mb-8">
            <div className={styles.logo}>
              <div className="relative flex items-center justify-center">
                <div className="absolute w-20 h-20 rounded-full bg-blue-100 blur-md opacity-70"></div>
                <Image 
                  src={LogoImage} 
                  alt="FinSight Logo" 
                  width={80} 
                  height={80} 
                  className="h-auto w-auto relative z-10"
                  priority
                />
              </div>
              <span className="sr-only">FinSight</span>
            </div>
            <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
              FinSight에 로그인하기
            </h2>
          </div>
          
          <div className="mt-8 space-y-6">
            <Button
              onClick={handleGoogleLogin}
              className="w-full h-12 px-4 py-2 flex items-center justify-center space-x-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-800 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              variant="outline"
            >
              <Image 
                src="/google.png" 
                alt="Google logo" 
                width={24} 
                height={24} 
                className="mr-2"
              />
              <span className="font-medium">구글 계정으로 로그인</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
} 
