"use client";

import React, { useCallback } from 'react';
import Image from 'next/image';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';

const processSteps = [
  {
    step: '01',
    title: 'Узгодження дизайну',
    description: 'Обираємо з клієнтом модель сумки, колір шкіри та композицію дизайну.',
    image: '/images/process/design.jpg'
  },
  {
    step: '02',
    title: 'Створення епоксидних деталей',
    description: 'Квіти та декоративні елементи заливаються епоксидною смолою.',
    image: '/images/process/epoxy.jpg'
  },
  {
    step: '03',
    title: 'Підготовка шкіри',
    description: 'Натуральна шкіра розкроюється та готується до створення сумки.',
    image: '/images/process/leather.jpg'
  },
  {
    step: '04',
    title: 'Фінальна збірка',
    description: 'На цьому етапі всі частини збираються, встановлюється фурнітура та прикріплюються ручки.',
    image: '/images/process/assembly.jpg'
  },
  {
    step: '05',
    title: 'Пакування та відправка',
    description: 'Готова сумка акуратно упаковується та готується до відправки новій власниці.',
    image: '/images/process/packaging.jpg'
  }
];

const Process = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, align: 'center' }, 
    [
      Autoplay({ 
        delay: 4000, 
        stopOnInteraction: false,
        breakpoints: {
          '(max-width: 767px)': { active: false }
        }
      })
    ]
  );

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const stopAutoplay = useCallback(() => {
    const autoplay = emblaApi?.plugins()?.autoplay;
    if (autoplay) autoplay.stop();
  }, [emblaApi]);

  const playAutoplay = useCallback(() => {
    if (typeof window !== 'undefined' && window.innerWidth < 768) return;
    const autoplay = emblaApi?.plugins()?.autoplay;
    if (autoplay) autoplay.play();
  }, [emblaApi]);

  return (
    // Змінено фон на bg-cream та додано scroll-mt для навігації
    <section id="process" className="scroll-mt-28 md:scroll-mt-44 py-12 md:py-20 bg-cream overflow-hidden relative">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 w-full">
        
        {/* ЗАГОЛОВОК СЕКЦІЇ (Компактніший mb-10) */}
        <div className="flex flex-col items-center text-center mb-10 md:mb-16">
          <h2 className="font-playfair text-2xl md:text-5xl text-burgundy font-bold mb-4 md:mb-6 uppercase tracking-widest drop-shadow-sm">
            Від ідеї до емоції
          </h2>
          <p className="font-sans text-sm md:text-lg text-dark-brown/80 max-w-2xl leading-relaxed">
            Процес створення вашої унікальної сумки займає до 14 днів.
          </p>
        </div>
      </div>

      {/* ОБГОРТКА ГАЛЕРЕЇ */}
      <div 
        className="relative w-full group/gallery max-w-[1920px] mx-auto"
        onMouseEnter={stopAutoplay}
        onMouseLeave={playAutoplay}
      >
        
        {/* Кнопка Вліво (Десктоп) - Зменшена */}
        <button 
          onClick={scrollPrev}
          className="hidden md:flex absolute left-4 lg:left-12 top-[35%] -translate-y-1/2 z-20 w-12 h-12 bg-cream/90 backdrop-blur shadow-lg rounded-full items-center justify-center text-dark-brown hover:bg-burgundy hover:text-cream hover:scale-105 transition-all duration-300 opacity-0 group-hover/gallery:opacity-100"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M15 18l-6-6 6-6"/>
          </svg>
        </button>

        {/* EMBLА CAROUSEL */}
        <div className="overflow-hidden w-full" ref={emblaRef}>
          <div className="flex touch-pan-y items-start">
            
            {processSteps.map((step, index) => (
              <div 
                key={index} 
                // flex-[0_0_85vw] дозволяє бачити краї сусідніх слайдів на мобілці
                className="flex-[0_0_85vw] md:flex-[0_0_700px] min-w-0 px-2 md:px-6 group flex flex-col items-center text-center"
              >
                {/* Фото (Зменшено mb-6) */}
                <div className="relative w-full aspect-[4/3] md:aspect-video mb-6 overflow-hidden rounded-sm shadow-md cursor-grab active:cursor-grabbing">
                  <Image 
                    src={step.image} 
                    alt={step.title}
                    fill
                    sizes="(max-width: 768px) 85vw, 700px"
                    className="object-cover transition-transform duration-1000 group-hover:scale-105"
                  />
                  {/* Номер етапу */}
                  <div className="absolute top-3 left-3 bg-cream/95 text-burgundy font-playfair font-bold text-lg px-3 py-1 rounded-sm shadow-sm">
                    {step.step}
                  </div>
                </div>

                {/* Текст */}
                <div className="flex flex-col items-center max-w-lg mx-auto px-2">
                  <h3 className="font-playfair text-lg md:text-2xl font-bold text-burgundy mb-2 tracking-wide uppercase">
                    {step.title}
                  </h3>
                  <p className="font-sans text-[13px] md:text-base text-dark-brown/70 leading-relaxed font-medium">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}

          </div>
        </div>

        {/* Кнопка Вправо */}
        <button 
          onClick={scrollNext}
          className="hidden md:flex absolute right-4 lg:right-12 top-[35%] -translate-y-1/2 z-20 w-12 h-12 bg-cream/90 backdrop-blur shadow-lg rounded-full items-center justify-center text-dark-brown hover:bg-burgundy hover:text-cream hover:scale-105 transition-all duration-300 opacity-0 group-hover/gallery:opacity-100"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 18l6-6-6-6"/>
          </svg>
        </button>

      </div>
    </section>
  );
};

export default Process;