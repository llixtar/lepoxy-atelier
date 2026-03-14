"use client";

import React, { useCallback } from 'react';
import Image from 'next/image';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';

const reviewsData = [
  {
    id: 1,
    image: '/images/reviews/review1.jpg',
    text: "Вона ще гарніша, ніж на фото! Кожна деталь пропитана любов'ю. Тепер це моя улюблена сумка для особливих подій."
  },
  {
    id: 2,
    image: '/images/reviews/review2.jpg',
    text: "Неймовірна робота! Квіти всередині смоли виглядають як живі. Дякую за таку оперативну доставку!"
  },
  {
    id: 3,
    image: '/images/reviews/review3.jpg',
    text: "Отримала стільки компліментів за один вечір! Сумка привертає увагу всіх навколо. Якість шкіри — просто космос."
  },
  {
    id: 4,
    image: '/images/reviews/review4.jpg',
    text: "Це справжній витвір мистецтва. Навіть пакування викликає захват. Обов'язково повернуся до вас за подарунками для подруг."
  }
];

const Reviews = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, align: 'center' },
    [Autoplay({ delay: 5000, stopOnInteraction: false })]
  );

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  // Функції для керування автоплеєм при наведенні
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
    // Зменшили відступи та змінили фон на bg-cream
    <section id="reviews" className="py-12 md:py-16 bg-cream overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 w-full">
        
        {/* ЗАГОЛОВОК (Зменшений mb) */}
        <div className="flex flex-col items-center text-center mb-8 md:mb-10">
          <h2 className="font-playfair text-2xl md:text-3xl text-burgundy font-bold mb-3 uppercase tracking-widest">
            Відгуки наших клієнток
          </h2>
          <div className="w-12 h-0.5 bg-burgundy/20"></div>
        </div>

        {/* СЛАЙДЕР З ОБРОБНИКАМИ МИШКИ */}
        <div 
          className="relative group/reviews max-w-[700px] mx-auto"
          onMouseEnter={stopAutoplay}
          onMouseLeave={playAutoplay}
        >
          
          {/* Кнопка Вліво (трохи піднята top-[40%]) */}
          <button 
            onClick={scrollPrev}
            className="hidden md:flex absolute -left-8 lg:-left-16 top-[40%] -translate-y-1/2 z-20 w-10 h-10 md:w-12 md:h-12 bg-cream/90 backdrop-blur shadow-lg rounded-full items-center justify-center text-dark-brown hover:bg-burgundy hover:text-cream hover:scale-105 transition-all duration-300 opacity-0 group-hover/reviews:opacity-100"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6"/></svg>
          </button>

          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex touch-pan-y">
              {reviewsData.map((review) => (
                <div key={review.id} className="flex-[0_0_100%] min-w-0 flex flex-col items-center px-4">
                  
                  {/* ФОТО (Зменшене до 280px/320px max, mb-5/6) */}
                  <div className="relative w-full max-w-[280px] md:max-w-[320px] aspect-[4/5] overflow-hidden rounded-xl shadow-xl mb-5 md:mb-6 border border-warm-beige/30">
                    <Image 
                      src={review.image} 
                      alt="Відгук клієнтки Lépoxy"
                      fill
                      className="object-cover"
                    />
                  </div>

                  {/* ВІЗУАЛЬНЕ ВІКОНЕЧКО (Компактніше: p-5/p-6, max-w-450) */}
                  <div className="relative bg-burgundy p-5 md:p-6 rounded-2xl shadow-lg max-w-[450px]">
                    {/* "Хвостик" */}
                    <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[10px] border-l-transparent border-r-[10px] border-r-transparent border-b-[10px] border-b-burgundy"></div>
                    
                    {/* Декор лапки (зменшені) */}
                    <span className="absolute top-1 left-3 text-cream/10 font-serif text-5xl leading-none select-none">“</span>
                    
                    {/* Текст (Зменшений до text-sm/base) */}
                    <p className="font-playfair text-sm md:text-base text-cream text-center leading-relaxed italic relative z-10 px-2">
                      {review.text}
                    </p>
                    
                    <span className="absolute bottom-[-5px] right-3 text-cream/10 font-serif text-5xl leading-none select-none rotate-180">“</span>
                  </div>

                </div>
              ))}
            </div>
          </div>

          {/* Кнопка Вправо */}
          <button 
            onClick={scrollNext}
            className="hidden md:flex absolute -right-8 lg:-right-16 top-[40%] -translate-y-1/2 z-20 w-10 h-10 md:w-12 md:h-12 bg-cream/90 backdrop-blur shadow-lg rounded-full items-center justify-center text-dark-brown hover:bg-burgundy hover:text-cream hover:scale-105 transition-all duration-300 opacity-0 group-hover/reviews:opacity-100"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18l6-6-6-6"/></svg>
          </button>

        </div>

        {/* ПАГІНАЦІЯ (Зменшено відступ до mt-6/8) */}
        <div className="flex justify-center gap-2 mt-6 md:mt-8">
          {reviewsData.map((_, i) => (
            <div key={i} className="w-1.5 h-1.5 rounded-full bg-burgundy/20"></div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Reviews;