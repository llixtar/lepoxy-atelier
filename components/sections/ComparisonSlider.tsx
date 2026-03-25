"use client";

import React, { useState } from 'react';
import Image from 'next/image';

const ComparisonSlider = () => {
  // Стейт для позиції повзунка (від 0 до 100). Починаємо з 50% (рівно посередині)
  const [sliderPosition, setSliderPosition] = useState(50);

  const handleDrag = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSliderPosition(Number(e.target.value));
  };

  return (
    <section className="py-16 md:py-24 bg-cream overflow-hidden">
      <div className="max-w-[1200px] mx-auto px-6 md:px-12 w-full flex flex-col items-center">
        
        {/* Заголовок блоку */}
        <div className="text-center mb-10 md:mb-16">
          <h2 className="font-playfair text-3xl md:text-5xl text-burgundy font-bold mb-4 uppercase tracking-widest drop-shadow-sm">
            Магія Кольору
          </h2>
          <p className="font-sans text-sm md:text-lg text-dark-brown/80 max-w-2xl mx-auto leading-relaxed">
            Одна форма — різні характери. Потягніть повзунок, щоб побачити, як змінюється настрій сумки.
          </p>
        </div>

        {/* Контейнер слайдера */}
        <div className="relative w-full aspect-[4/3] md:aspect-video rounded-xl md:rounded-2xl overflow-hidden shadow-2xl group border-[6px] md:border-[12px] border-white select-none">
          
          {/* Нижнє фото (Світла сумка) */}
          <div className="absolute inset-0 z-0">
            <Image
              src="/images/bag-light.jpg"
              alt="Світла сумка Lépoxy Atelier"
              fill
              className="object-cover object-center"
              sizes="(max-width: 1200px) 100vw, 1200px"
              priority
            />
          </div>

          {/* Верхнє фото (Темна сумка) з ефектом обрізки (clip-path) */}
          <div 
            className="absolute inset-0 z-10"
            // Оце і є та сама магія! Показуємо зображення тільки від 0% до sliderPosition%
            style={{ clipPath: `polygon(0 0, ${sliderPosition}% 0, ${sliderPosition}% 100%, 0 100%)` }}
          >
            <Image
              src="/images/bag-dark.jpg"
              alt="Темна сумка Lépoxy Atelier"
              fill
              className="object-cover object-center"
              sizes="(max-width: 1200px) 100vw, 1200px"
              priority
            />
          </div>

          {/* Біла лінія-розділювач та кружечок-повзунок */}
          <div 
            className="absolute top-0 bottom-0 z-20 w-[2px] md:w-1 bg-white flex items-center justify-center pointer-events-none transition-transform duration-75"
            style={{ left: `${sliderPosition}%`, transform: 'translateX(-50%)' }}
          >
            {/* Сам кружечок-ручка */}
            <div className="w-10 h-10 md:w-14 md:h-14 bg-white rounded-full shadow-[0_0_15px_rgba(0,0,0,0.3)] flex items-center justify-center text-burgundy transition-transform duration-300 group-hover:scale-110">
              {/* Стрілка вліво */}
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="opacity-80">
                <path d="M15 18l-6-6 6-6" />
              </svg>
              {/* Стрілка вправо */}
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="rotate-180 opacity-80">
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </div>
          </div>

          {/* Невидимий повзунок, який збирає всі кліки та рухи пальцем */}
          <input
            type="range"
            min="0"
            max="100"
            value={sliderPosition}
            onChange={handleDrag}
            className="absolute inset-0 z-30 w-full h-full opacity-0 cursor-ew-resize m-0 p-0 touch-pan-y"
            aria-label="Порівняння світлої та темної сумки"
          />

        </div>
        
        {/* Підказка для користувачів */}
        <div className="mt-6 text-dark-brown/50 text-[10px] md:text-xs uppercase tracking-widest font-medium animate-pulse">
          Тягніть вліво або вправо
        </div>

      </div>
    </section>
  );
};

export default ComparisonSlider;