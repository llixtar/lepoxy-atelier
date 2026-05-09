"use client";

import React, { useCallback, useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
const AvailableBags = () => {
  // Стейт для сумок з бази
  const [bags, setBags] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Завантажуємо сумки з API
  useEffect(() => {
    const fetchBags = async () => {
      try {
        const res = await fetch('/api/bags');
        if (res.ok) {
          const data = await res.json();
          // Залишаємо тільки ті, що в наявності
          const available = data.filter((bag: any) => bag.isAvailable === true);
          setBags(available);
        }
      } catch (error) {
        console.error('Помилка завантаження сумок:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBags();
  }, []);
  const telegramUsername = "lepoxyatelier";

  return (
    <section id="available" className="py-12 md:py-16 bg-cream overflow-hidden">

      {/* ЗАГОЛОВОК СЕКЦІЇ */}
      <div className="max-w-[1440px] mx-auto px-4 md:px-12 w-full mb-8 md:mb-10">
        <div className="flex flex-col items-center text-center">
          <h2 className="font-playfair text-2xl md:text-4xl text-burgundy font-bold mb-3 md:mb-4 tracking-widest uppercase drop-shadow-sm">
            Готові до відправки
          </h2>
          <p className="font-sans text-[13px] md:text-base text-dark-brown/80 max-w-2xl leading-relaxed">
            Ці сумки вже готові та чекають на свою власницю. <br className="hidden md:block" />
            <span className="font-semibold text-burgundy/80">Відправка протягом 1-2 днів.</span>
          </p>
        </div>
      </div>

      {/* ГАЛЕРЕЯ (СІТКА) */}
      <div className="max-w-[1440px] mx-auto px-4 md:px-12">
        {isLoading ? (
          <div className="flex justify-center py-12">
            <div className="text-burgundy animate-pulse font-semibold tracking-widest uppercase text-sm">
              Завантаження сумок...
            </div>
          </div>
        ) : bags.length === 0 ? (
          <div className="flex justify-center py-12">
            <div className="text-dark-brown/60 font-medium text-center">
              Наразі всі сумки з наявності розпродані.
            </div>
          </div>
        ) : (
          <div className="flex flex-wrap justify-center gap-x-3 gap-y-8 md:gap-x-8 md:gap-y-12">
            {bags.map((bag) => (
              <div
                key={bag.id}
                className="w-[calc(50%-6px)] sm:w-[calc(50%-8px)] md:w-[300px] lg:w-[320px] shrink-0 group"
              >
                  <div className="flex flex-col bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 border border-dark-brown/5 hover:border-burgundy/30 h-full">

                    {/* ФОТО БЕЗ ОБРІЗАННЯ КРАЇВ */}
                    <div className="relative w-full aspect-[4/5] overflow-hidden bg-transparent flex items-center justify-center">
                      {bag.images && bag.images.length > 0 ? (
                        <Image
                          src={bag.images[0]}
                          alt={bag.name}
                          fill
                          className="object-contain transition-transform duration-700 scale-90 group-hover:scale-99"
                        />
                      ) : (
                        <div className="w-full h-full bg-gray-100 flex items-center justify-center text-gray-400 text-xs">
                          Фото відсутнє
                        </div>
                      )}
                      
                      <div className="absolute top-3 left-3 z-10 bg-cream/95 text-burgundy text-[9px] md:text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-sm shadow-sm">
                        В наявності
                      </div>
                    </div>

                    {/* ІНФОРМАЦІЯ */}
                    <div className="p-3 md:p-5 flex flex-col flex-grow relative z-10 bg-white">
                      <h3 className="font-playfair text-sm md:text-xl font-bold text-dark-brown mb-1 md:mb-2 line-clamp-1 md:line-clamp-none">{bag.name}</h3>
                      <p className="font-sans text-sm md:text-lg text-burgundy font-semibold mb-3 md:mb-4">
                        {bag.price} ₴
                      </p>

                      <a
                        href={`https://t.me/${telegramUsername}?text=${encodeURIComponent(`Доброго дня! Хочу придбати сумку з наявності:\nМодель: ${bag.name}\nЦіна: ${bag.price} ₴`)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-auto w-full py-2 md:py-3 border border-burgundy text-burgundy text-center uppercase text-[9px] md:text-[11px] font-bold tracking-[0.1em] md:tracking-[0.15em] transition-all duration-300 hover:bg-burgundy hover:text-cream active:scale-95 rounded-sm"
                      >
                        Купити
                      </a>
                    </div>

                  </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* КНОПКА ПЕРЕХОДУ НА СТОРІНКУ */}
      <div className="mt-8 md:mt-10 flex justify-center">
        <Link
          href="/bags"
          className="group flex items-center gap-2 md:gap-3 text-xs md:text-sm uppercase tracking-widest text-dark-brown/70 hover:text-burgundy transition-colors font-semibold"
        >
          <span className="border-b border-transparent group-hover:border-burgundy transition-colors pb-0.5 md:pb-1">
            Переглянути всі сумки
          </span>
          <svg className="transition-transform duration-300 group-hover:translate-x-2" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
        </Link>
      </div>

    </section>
  );
};

export default AvailableBags;