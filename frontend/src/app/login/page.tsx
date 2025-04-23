'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
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
import { Sun, Moon, Loader2 } from 'lucide-react';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();
  const { login, user, isLoading } = useAuth();
  const { setTheme } = useTheme();

  useEffect(() => {
    if (user) {
      router.push('/dashboard');
    }
  }, [user, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      setError('이메일과 비밀번호를 모두 입력해주세요.');
      return;
    }
    
    setError('');
    
    try {
      const success = await login(email, password);
      
      if (success) {
        router.push('/dashboard');
      } else {
        setError('로그인에 실패했습니다. 다시 시도해주세요.');
      }
    } catch (err) {
      setError('로그인에 실패했습니다. 다시 시도해주세요.');
      console.error(err);
    }
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
            <Logo />
            <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
              FinSight 계정으로 로그인
            </h2>
            <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-300">
              아직 계정이 없으신가요?{' '}
              <Link 
                href="/signup" 
                className={`font-medium text-blue-600 hover:text-blue-500 dark:text-sky-400 dark:hover:text-sky-300 ${styles.bounce}`}
              >
                회원가입
              </Link>
            </p>
          </div>
          
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">이메일</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={`block w-full rounded-md px-4 py-3 text-gray-900 dark:text-gray-100 placeholder:text-gray-400 dark:placeholder:text-gray-500 border-0 bg-white/50 dark:bg-transparent backdrop-blur-sm focus:ring-2 focus:ring-blue-500 dark:focus:ring-sky-400 focus:outline-none ${styles.input}`}
                  placeholder="이메일을 입력하세요"
                />
              </div>
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">비밀번호</label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={`block w-full rounded-md px-4 py-3 text-gray-900 dark:text-gray-100 placeholder:text-gray-400 dark:placeholder:text-gray-500 border-0 bg-white/50 dark:bg-transparent backdrop-blur-sm focus:ring-2 focus:ring-blue-500 dark:focus:ring-sky-400 focus:outline-none ${styles.input}`}
                  placeholder="비밀번호를 입력하세요"
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-600 dark:border-gray-600 dark:bg-gray-700 dark:checked:bg-sky-500 dark:focus:ring-sky-500"
                />
                <Label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900 dark:text-gray-300">
                  로그인 상태 유지
                </Label>
              </div>

              <div className="text-sm">
                <Link href="/forgot-password" className={`font-medium text-blue-600 hover:text-blue-500 dark:text-sky-400 dark:hover:text-sky-300 ${styles.bounce}`}>
                  비밀번호 찾기
                </Link>
              </div>
            </div>

            {error && (
              <div className="text-red-500 dark:text-red-400 text-sm text-center bg-red-50 dark:bg-red-950/30 p-2 rounded-md border border-red-100 dark:border-red-900/50">{error}</div>
            )}

            <div>
              {isLoading ? (
                <Button disabled className="relative group w-full rounded-md px-3 py-3 text-sm font-semibold text-white dark:text-white bg-blue-600 dark:bg-sky-600" variant="default">
                  <Loader2 className="animate-spin mr-2" />
                  로그인 중...
                </Button>
              ) : (
                <Button
                  type="submit"
                  className="relative group w-full rounded-md px-3 py-3 text-sm font-semibold text-white dark:text-white bg-blue-600 dark:bg-sky-600 hover:bg-blue-500 dark:hover:bg-sky-500"
                  variant="default"
                >
                  로그인
                </Button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
} 
