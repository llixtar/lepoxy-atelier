'use client';

import React, { useCallback, useEffect, useState } from 'react';
import Image from 'next/image';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';

const Reviews = () => {
  const [reviews, setReviews] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedIndex, setSelectedIndex] = useState(0);

  // 1. Ініціалізація каруселі з вбудованим розумним автоплеєм
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, align: 'center' },
    [
      Autoplay({ 
        delay: 5000, 
        stopOnInteraction: false, 
        stopOnMouseEnter: true // Автоматично зупиняє при наведенні мишки
      })
    ]
  );

  // 2. Завантаження відгуків з бази
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const res = await fetch('/api/reviews');
        if (res.ok) {
          const data = await res.json();
          setReviews(data);
        }
      } catch (error) {
        console.error('Помилка завантаження відгуків:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchReviews();
  }, []);

  // 3. Переініціалізація Embla, коли приходять дані (фікс для Autoplay)
  useEffect(() => {
    if (emblaApi && reviews.length > 0) {
      emblaApi.reInit();
    }
  }, [emblaApi, reviews]);

  // 4. Логіка вибору активного слайда для точок
  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on('select', onSelect);
    emblaApi.on('reInit', onSelect);
  }, [emblaApi, onSelect]);

  const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);
  const scrollTo = useCallback((index: number) => emblaApi && emblaApi.scrollTo(index), [emblaApi]);

  return (
    <section id="reviews" className="py-12 md:py-16 bg-cream overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 w-full">
        
        {/* ЗАГОЛОВОК */}
        <div className="flex flex-col items-center text-center mb-8 md:mb-10">
          <h2 className="font-playfair text-2xl md:text-3xl text-burgundy font-bold mb-3 uppercase tracking-widest">
            Відгуки наших клієнток
          </h2>
          <div className="w-12 h-0.5 bg-burgundy/20"></div>
        </div>

        {isLoading ? (
          <div className="flex justify-center py-20 text-burgundy animate-pulse uppercase tracking-widest text-sm font-bold">
            Завантаження відгуків...
          </div>
        ) : reviews.length === 0 ? (
          <div className="text-center py-10 text-dark-brown/40 italic">
            Відгуків поки немає.
          </div>
        ) : (
          <div className="relative group/reviews max-w-[700px] mx-auto">
            
            {/* Кнопка Вліво */}
            <button 
              onClick={scrollPrev}
              className="hidden md:flex absolute -left-8 lg:-left-16 top-[40%] -translate-y-1/2 z-20 w-10 h-10 md:w-12 md:h-12 bg-cream/90 backdrop-blur shadow-lg rounded-full items-center justify-center text-dark-brown hover:bg-burgundy hover:text-cream hover:scale-105 transition-all duration-300 opacity-0 group-hover/reviews:opacity-100"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6"/></svg>
            </button>

            <div className="overflow-hidden" ref={emblaRef}>
              <div className="flex touch-pan-y">
                {reviews.map((review) => (
                  <div key={review.id} className="flex-[0_0_100%] min-w-0 flex flex-col items-center px-4">
                    
                    {/* ФОТО */}
                    <div className="relative w-full max-w-[280px] md:max-w-[320px] aspect-[4/5] overflow-hidden rounded-xl shadow-xl mb-5 md:mb-6 border border-warm-beige/30 bg-white">
                      {review.image ? (
                        <Image 
                          src={review.image} 
                          alt={`Відгук від ${review.authorName}`}
                          fill
                          className="object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-neutral-300 bg-neutral-50">
                          Фото відсутнє
                        </div>
                      )}
                    </div>

                    {/* ТЕКСТОВИЙ БЛОК */}
                    <div className="relative bg-burgundy p-5 md:p-6 rounded-2xl shadow-lg max-w-[450px] w-full">
                      {/* "Хвостик" */}
                      <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[10px] border-l-transparent border-r-[10px] border-r-transparent border-b-[10px] border-b-burgundy"></div>
                      
                      {/* Декор лапки */}
                      <span className="absolute top-1 left-3 text-cream/10 font-serif text-5xl leading-none select-none">“</span>
                      
                      <div className="relative z-10 px-2 flex flex-col items-center">
                        <p className="font-playfair text-sm md:text-base text-cream text-center leading-relaxed italic mb-3">
                          {review.text}
                        </p>
                        <h4 className="font-sans text-[10px] md:text-xs uppercase tracking-widest text-cream/70 font-bold border-t border-cream/10 pt-2 w-full text-center">
                          — {review.authorName}
                        </h4>
                      </div>
                      
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
        )}

        {/* ПАГІНАЦІЯ (Активні точки) */}
        {!isLoading && reviews.length > 1 && (
          <div className="flex justify-center gap-3 mt-6 md:mt-8">
            {reviews.map((_, i) => (
              <button
                key={i}
                onClick={() => scrollTo(i)}
                className={`transition-all duration-300 rounded-full ${
                  selectedIndex === i ? 'w-6 h-1.5 bg-burgundy' : 'w-1.5 h-1.5 bg-burgundy/20'
                }`}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>
        )}

      </div>
    </section>
  );
};

export default Reviews;