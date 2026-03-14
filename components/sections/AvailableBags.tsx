"use client";

import React, { useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import useEmblaCarousel from 'embla-carousel-react';

const availableBags = [
  { id: 1, name: 'Сумка 1 (Classic)', price: '4 500 ₴', image: '/images/available/bag1.jpg' },
  { id: 2, name: 'Сумка 2 (Minimalism)', price: '5 200 ₴', image: '/images/available/bag2.jpg' },
  { id: 3, name: 'Сумка 3 (Asymmetry)', price: '4 800 ₴', image: '/images/available/bag3.jpg' },
  { id: 4, name: 'Сумка 4 (Old School)', price: '6 100 ₴', image: '/images/available/bag4.jpg' },
  { id: 5, name: 'Сумка 5 (Classic)', price: '4 300 ₴', image: '/images/available/bag5.jpg' },
  { id: 6, name: 'Сумка 6 (Minimalism)', price: '5 500 ₴', image: '/images/available/bag6.jpg' }
];

const AvailableBags = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: 'start' });

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const telegramUsername = "llixtar";

  return (
    // Зменшили py-20/py-32 до py-12/py-16
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

      {/* ОБГОРТКА ГАЛЕРЕЇ */}
      <div className="relative w-full group/gallery max-w-[1920px] mx-auto px-4 md:px-12">
        
        {/* Стрілка Вліво (Зменшено до w-10/w-12) */}
        <button 
          onClick={scrollPrev}
          className="hidden md:flex absolute left-4 lg:left-8 top-[40%] -translate-y-1/2 z-20 w-10 h-10 md:w-12 md:h-12 bg-cream/90 backdrop-blur shadow-lg rounded-full items-center justify-center text-dark-brown hover:bg-burgundy hover:text-cream hover:scale-105 transition-all duration-300 opacity-0 group-hover/gallery:opacity-100"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6"/></svg>
        </button>

        {/* EMBLA CAROUSEL */}
        <div className="overflow-hidden w-full" ref={emblaRef}>
          <div className="flex touch-pan-y py-2 md:py-4">
            
            {availableBags.map((bag) => (
              <div 
                key={bag.id} 
                className="flex-[0_0_80%] sm:flex-[0_0_45%] lg:flex-[0_0_28%] xl:flex-[0_0_24%] min-w-0 pr-4 md:pr-6 group"
              >
                <div className="flex flex-col bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 border border-dark-brown/5 hover:border-burgundy/30 h-full">
                  
                  {/* ФОТО (Прибрали зайвий бежевий фон) */}
                  <div className="relative w-full aspect-[4/5] overflow-hidden bg-transparent">
                    <Image 
                      src={bag.image} 
                      alt={bag.name}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute top-3 left-3 bg-cream/95 text-burgundy text-[9px] md:text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-sm shadow-sm">
                      В наявності
                    </div>
                  </div>

                  {/* ІНФОРМАЦІЯ (Зменшено падінги до p-4/p-5) */}
                  <div className="p-4 md:p-5 flex flex-col flex-grow">
                    <h3 className="font-playfair text-lg md:text-xl font-bold text-dark-brown mb-1 md:mb-2">{bag.name}</h3>
                    <p className="font-sans text-base md:text-lg text-burgundy font-semibold mb-4">{bag.price}</p>
                    
                    <a 
                      href={`https://t.me/${telegramUsername}?text=${encodeURIComponent(`Доброго дня! Хочу придбати сумку з наявності:\nМодель: ${bag.name}\nЦіна: ${bag.price}`)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-auto w-full py-2.5 md:py-3 border border-burgundy text-burgundy text-center uppercase text-[10px] md:text-[11px] font-bold tracking-[0.15em] transition-all duration-300 hover:bg-burgundy hover:text-cream active:scale-95 rounded-sm"
                    >
                      Купити зараз
                    </a>
                  </div>

                </div>
              </div>
            ))}

          </div>
        </div>

        {/* Стрілка Вправо */}
        <button 
          onClick={scrollNext}
          className="hidden md:flex absolute right-4 lg:right-8 top-[40%] -translate-y-1/2 z-20 w-10 h-10 md:w-12 md:h-12 bg-cream/90 backdrop-blur shadow-lg rounded-full items-center justify-center text-dark-brown hover:bg-burgundy hover:text-cream hover:scale-105 transition-all duration-300 opacity-0 group-hover/gallery:opacity-100"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18l6-6-6-6"/></svg>
        </button>

      </div>

      {/* КНОПКА ПЕРЕХОДУ НА СТОРІНКУ (Підтягнуто вище mt-8/mt-10) */}
      <div className="mt-8 md:mt-10 flex justify-center">
        <Link 
          href="/bags" 
          className="group flex items-center gap-2 md:gap-3 text-xs md:text-sm uppercase tracking-widest text-dark-brown/70 hover:text-burgundy transition-colors font-semibold"
        >
          <span className="border-b border-transparent group-hover:border-burgundy transition-colors pb-0.5 md:pb-1">
            Переглянути всі сумки
          </span>
          <svg className="transition-transform duration-300 group-hover:translate-x-2" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
        </Link>
      </div>

    </section>
  );
};

export default AvailableBags;