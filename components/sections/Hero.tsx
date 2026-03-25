import Link from 'next/link';
import Image from 'next/image';

const Hero = () => {
  return (
    <section className="relative w-full h-[100svh] overflow-hidden bg-cream">

      {/* 1. ФОНОВІ ФОТО */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/hero-desktop_new.jpg"
          alt="Колекція сумок Lépoxy Atelier"
          fill
          priority
          className="hidden md:block object-cover object-center"
        />
        <Image
          src="/images/hero-mobile_new.jpg"
          alt="Сумки Lépoxy Atelier"
          fill
          priority
          className="block md:hidden object-cover object-center"
        />
      </div>

      {/* 2. КОНТЕНТ */}
      <div className="relative z-10 w-full h-full">
        {/* 
            ДОДАНО: items-center (центрує блоки горизонтально на мобілці)
            md:items-start (повертає вліво на десктопі)
        */}
        <div className="w-full h-full px-6 md:pl-8 md:pr-0 flex flex-col items-center md:items-start justify-start md:justify-end md:pb-1">

          {/* ГРУПА 1: ЗАГОЛОВОК + ПІДЗАГОЛОВОК 
              ДОДАНО: text-center (текст по центру на мобілці)
          */}
          <div className="mt-[30svh] md:mt-0 flex flex-col items-center md:items-start gap-1 md:gap-1 text-center md:text-left">
            <h1 className="font-logo-main text-3xl md:text-4xl uppercase tracking-wider md:tracking-[0.2em] font-bold text-burgundy drop-shadow-sm leading-tight md:whitespace-nowrap">
              Lépoxy <span className="font-logo-sub text-2xl md:text-2xl inline">Atelier</span>
            </h1>

            <p className="font-playfair text-[4.2vw] sm:text-lg md:text-xl leading-snug text-dark-brown drop-shadow-sm whitespace-nowrap">
              Сумка, створена природою і руками жінки.
            </p>
          </div>

          {/* ГРУПА 2: ОПИС (ТЕКСТ)
              ДОДАНО: text-center
          */}
          <div className="mt-auto md:mt-4 mb-[24svh] md:mb-4 text-center md:text-left">
            <p className="font-sans text-[14px] md:text-base text-dark-brown/90 leading-relaxed font-medium max-w-[280px] md:max-w-[400px]">
              Натуральна шкіра та справжні квіти, збережені в епоксидній смолі.
            </p>
          </div>

          {/* ГРУПА 3: КНОПКА */}
          <div className="mb-1 md:mb-6">
            <Link
              href="/#collections"
              className="
                relative overflow-hidden inline-block bg-burgundy text-cream px-6 py-3 md:px-10 md:py-4 
                uppercase text-[10px] md:text-[12px] tracking-[0.2em] font-medium 
                shadow-xl transition-all duration-300
                hover:bg-dark-brown hover:-translate-y-1 active:scale-95
                after:content-[''] after:absolute after:top-0 after:-left-[100%] 
                after:w-1/2 after:h-full after:bg-gradient-to-r 
                after:from-transparent after:via-white/20 after:to-transparent 
                after:skew-x-[-20deg] after:animate-[shine_5s_infinite_linear]
              "
            >
              Переглянути колекції
            </Link>
          </div>

        </div>
      </div>

    </section>
  );
};

export default Hero;