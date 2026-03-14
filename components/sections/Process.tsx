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
    description: 'На цьому етапі всі частини збираються, встановлюється фурнітура та прикріплюються ручки, формуючи готову сумку.',
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
  // Налаштування каруселі: по центру, циклічна, автоплей вимикається на мобільних
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, align: 'center' }, 
    [
      Autoplay({ 
        delay: 4000, // Даємо трохи більше часу на прочитання тексту (4 секунди)
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
    <section id="process" className="py-20 md:py-32 bg-warm-beige/30 overflow-hidden relative">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 w-full">
        
        {/* ЗАГОЛОВОК СЕКЦІЇ */}
        <div className="flex flex-col items-center text-center mb-12 md:mb-20">
          <h2 className="font-playfair text-3xl md:text-5xl text-burgundy font-bold mb-6 tracking-[0.1em] drop-shadow-sm">
            « Від ідеї до емоції — 14 днів »
          </h2>
          <p className="font-sans text-base md:text-xl text-dark-brown/90 max-w-2xl leading-relaxed">
            Кожна сумка Lépoxy Atelier створюється вручну та проходить кілька етапів, щоб стати унікальним аксесуаром.
          </p>
        </div>

        {/* ПІДКАЗКА ДЛЯ МОБІЛЬНИХ */}
        <div className="md:hidden flex items-center justify-center gap-3 text-dark-brown/50 text-[10px] uppercase tracking-widest font-medium mb-8 animate-pulse">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 12H5M12 19l-7-7 7-7"/>
          </svg>
          <span>Гортайте</span>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 12h14M12 5l7 7-7 7"/>
          </svg>
        </div>

      </div>

      {/* ОБГОРТКА ГАЛЕРЕЇ З КНОПКАМИ */}
      <div 
        className="relative w-full group/gallery max-w-[1920px] mx-auto"
        onMouseEnter={stopAutoplay}
        onMouseLeave={playAutoplay}
      >
        
        {/* Кнопка Вліво (Десктоп) */}
        <button 
          onClick={scrollPrev}
          className="hidden md:flex absolute left-8 lg:left-24 top-[40%] -translate-y-1/2 z-20 w-14 h-14 bg-cream/90 backdrop-blur shadow-lg rounded-full items-center justify-center text-dark-brown hover:bg-burgundy hover:text-cream hover:scale-105 transition-all duration-300 opacity-0 group-hover/gallery:opacity-100"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M15 18l-6-6 6-6"/>
          </svg>
        </button>

        {/* EMBLА CAROUSEL */}
        <div className="overflow-hidden w-full" ref={emblaRef}>
          <div className="flex touch-pan-y items-center">
            
            {processSteps.map((step, index) => (
              <div 
                key={index} 
                // flex-[0_0_100%] робить 1 слайд на весь екран мобілки, а на компі обмежуємо до 800px
                className="flex-[0_0_100%] md:flex-[0_0_800px] min-w-0 px-4 md:px-8 group flex flex-col items-center text-center"
              >
                {/* Фото */}
                <div className="relative w-full aspect-[4/3] md:aspect-video mb-8 overflow-hidden rounded-sm shadow-xl cursor-grab active:cursor-grabbing">
                  <Image 
                    src={step.image} 
                    alt={step.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 800px"
                    className="object-cover transition-transform duration-1000 group-hover:scale-105"
                  />
                  {/* Номер етапу поверх фотографії */}
                  <div className="absolute top-4 left-4 bg-cream/90 text-burgundy font-playfair font-bold text-xl px-4 py-2 rounded-sm shadow-md">
                    {step.step}
                  </div>
                </div>

                {/* Текст */}
                <div className="flex flex-col items-center max-w-2xl mx-auto">
                  <h3 className="font-playfair text-2xl md:text-3xl font-bold text-burgundy mb-4 tracking-wide">
                    {step.title}
                  </h3>
                  <p className="font-sans text-sm md:text-base text-dark-brown/80 leading-relaxed font-medium">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}

          </div>
        </div>

        {/* Кнопка Вправо (Десктоп) */}
        <button 
          onClick={scrollNext}
          className="hidden md:flex absolute right-8 lg:right-24 top-[40%] -translate-y-1/2 z-20 w-14 h-14 bg-cream/90 backdrop-blur shadow-lg rounded-full items-center justify-center text-dark-brown hover:bg-burgundy hover:text-cream hover:scale-105 transition-all duration-300 opacity-0 group-hover/gallery:opacity-100"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 18l6-6-6-6"/>
          </svg>
        </button>

      </div>
    </section>
  );
};

export default Process;