'use client'; // 1. Обов'язково додаємо директиву клієнта

import { useEffect } from 'react'; // 2. Імпортуємо хук
import Hero from "@/components/sections/Hero";
import Values from "@/components/sections/Values";
import Collections from "@/components/sections/Collections";
import Order from "@/components/sections/Order";
import Process from "@/components/sections/Process";
import AvailableBags from "@/components/sections/AvailableBags";
import Reviews from "@/components/sections/Reviews";
import InstagramWidget from "@/components/sections/InstagramWidget";
import ComparisonSlider from '@/components/sections/ComparisonSlider';

export default function Home() {
  // 3. Переносимо useEffect СЮДИ (всередину компонента)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ctrl + Shift + A
      if (e.altKey && e.shiftKey && e.code === 'KeyA') {
        window.location.href = '/admin';
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    
    // Прибираємо слухач, коли людина йде зі сторінки
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <>
      <Hero />
      <Values />
      <ComparisonSlider />
      <Collections />
      <Order />
      <Process />
      <AvailableBags />
      <Reviews />
      <InstagramWidget />
    </>
  );
}