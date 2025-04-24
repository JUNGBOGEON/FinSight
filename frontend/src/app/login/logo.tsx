'use client';

import Image from 'next/image';
import styles from './login.module.css';

export default function Logo() {
  return (
    <div className={styles.logo}>
      <div className="relative flex items-center justify-center">
        <div className="absolute w-20 h-20 rounded-full bg-blue-100 blur-md opacity-70"></div>
        <Image 
          src="/logo.png" 
          alt="FinSight Logo" 
          width={80} 
          height={80} 
          className="h-auto w-auto relative z-10"
          priority
          unoptimized
        />
      </div>
      <span className="sr-only">FinSight</span>
    </div>
  );
} 
