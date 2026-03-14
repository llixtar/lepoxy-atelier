"use client";

import React, { useCallback } from 'react';
import Image from 'next/image';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';

const collectionsData = [
  {
    title: `Спокій`,
    description: `Коли хочеться зупинитись, видихнути і просто бути. Ніжні квіти жасмину, застиглі в моменті — як нагадування, що все буде добре.`,
    image: `/images/collections/spokiy.jpg`
  },
  {
    title: `Тиша`,
    description: `Для моментів, коли не потрібні слова. Три стебла лаванди на білому — як чистий аркуш, на якому ти пишеш свою історію.`,
    image: `/images/collections/tysha.jpg`
  },
  {
    title: `Пристрасть`,
    description: `Те почуття, коли серце б'ється швидше. Глибока винна смола з трояндами всередині — як емоція, яку неможливо приховати.`,
    image: `/images/collections/prystrast.jpg`
  },
  {
    title: `Свобода`,
    description: `Хвилі океану та мерехтіння піску, застиглі в смолі — як нагадування про ту мить свободи, яку ти завжди носиш із собою.`,
    image: `/images/collections/svoboda.jpg`
  },
  {
    title: `Сила`,
    description: `Та внутрішня енергія, яка прокидається в найтемніший момент. Як магма — тихо горить всередині, поки не прорветься назовні.`,
    image: `/images/collections/syla.jpg`
  },
  {
    title: `Ніжність`,
    description: `Коли хтось обіймає тебе без слів і стає легше дихати. Рожеві стебла на світлій смолі — як дотик людини, яка розуміє.`,
    image: `/images/collections/nizhnist.jpg`
  },
  {
    title: `Легкість`,
    description: `Той рідкісний день, коли нічого не тисне. Ти просто йдеш, посміхаєшся, і все навколо — рожево-лавандове, як в дитинстві.`,
    image: `/images/collections/lehkist.jpg`
  },
  {
    title: `Тепло`,
    description: `Почуття дому, мамин голос у телефоні, кава вранці на сонці. Золоті колоски — як останні дні літа, які хочеться зупинити.`,
    image: `/images/collections/teplo.jpg`
  },
  {
    title: `Щастя`,
    description: `Життя не буває одного кольору. Найкращі моменти — коли все змішується і стає цілим.`,
    image: `/images/collections/shchastya.jpg`
  }
];

const Collections = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, align: 'center' }, 
    [
      Autoplay({ 
        delay: 3500, 
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
    <section id="collections" className="py-20 md:py-32 bg-cream overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 w-full">
        
        <div className="flex flex-col items-center text-center mb-8 md:mb-20">
          <h2 className="font-playfair text-3xl md:text-5xl text-burgundy font-bold mb-6 uppercase tracking-widest">
            Колекції
          </h2>
          <div className="font-playfair text-xl md:text-2xl text-dark-brown max-w-2xl leading-relaxed">
            <p>Настрій можна не лише відчувати — його можна носити.</p>
            <p className="italic text-dark-brown/80">Знайди той, який відчуваєш сьогодні.</p>
          </div>
        </div>

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

      <div 
        className="relative w-full group/gallery max-w-[1920px] mx-auto"
        onMouseEnter={stopAutoplay}
        onMouseLeave={playAutoplay}
      >
        <button 
          onClick={scrollPrev}
          className="hidden md:flex absolute left-8 top-[35%] -translate-y-1/2 z-20 w-14 h-14 bg-cream/90 backdrop-blur shadow-lg rounded-full items-center justify-center text-dark-brown hover:bg-burgundy hover:text-cream hover:scale-105 transition-all duration-300 opacity-0 group-hover/gallery:opacity-100"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M15 18l-6-6 6-6"/>
          </svg>
        </button>

        <div className="overflow-hidden w-full" ref={emblaRef}>
          <div className="flex touch-pan-y">
            {collectionsData.map((collection, index) => (
              <div 
                key={index} 
                className="flex-[0_0_80vw] sm:flex-[0_0_320px] md:flex-[0_0_400px] min-w-0 mr-8 md:mr-12 group flex flex-col items-center text-center"
              >
                <div className="relative w-full h-[350px] md:h-[450px] mb-8 overflow-hidden bg-transparent cursor-grab active:cursor-grabbing">
                  <Image 
                    src={collection.image} 
                    alt={collection.title}
                    fill
                    sizes="(max-width: 768px) 80vw, 400px"
                    className="object-contain transition-transform duration-700 group-hover:scale-105"
                  />
                </div>

                <div className="flex flex-col items-center px-2">
                  <h3 className="font-playfair text-2xl md:text-3xl font-bold text-burgundy mb-4 tracking-wider uppercase">
                    {collection.title}
                  </h3>
                  <p className="font-sans text-[13px] md:text-base text-dark-brown/80 leading-relaxed font-medium max-w-[320px]">
                    {collection.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <button 
          onClick={scrollNext}
          className="hidden md:flex absolute right-8 top-[35%] -translate-y-1/2 z-20 w-14 h-14 bg-cream/90 backdrop-blur shadow-lg rounded-full items-center justify-center text-dark-brown hover:bg-burgundy hover:text-cream hover:scale-105 transition-all duration-300 opacity-0 group-hover/gallery:opacity-100"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 18l6-6-6-6"/>
          </svg>
        </button>
      </div>
    </section>
  );
};

export default Collections;