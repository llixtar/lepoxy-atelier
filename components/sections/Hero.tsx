import Link from 'next/link';
import Image from 'next/image';

const Hero = () => {
  return (
    <section className="relative w-full h-[calc(100svh-6rem)] md:h-auto md:aspect-[1920/1072] mt-24 md:mt-0 overflow-hidden bg-cream">

      {/* 1. ФОНОВІ ФОТО */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/hero-desktop.jpg"
          alt="Колекція сумок Lépoxy Atelier"
          fill
          priority
          className="hidden md:block object-cover object-center"
        />
        <Image
          src="/images/hero-mobile.jpg"
          alt="Сумки Lépoxy Atelier"
          fill
          priority
          className="block md:hidden object-cover object-center"
        />
      </div>

      {/* 2. КОНТЕНТ (ДЛЯ ДЕСКТОПА ТА ПЛАНШЕТІВ - ПРОПОРЦІЙНИЙ) */}
      <div className="absolute inset-0 z-10 hidden md:block pointer-events-none">
        {/* ТЕКСТОВИЙ БЛОК: тепер координати будуть ідеальними на всіх екранах */}
        <div className="absolute left-[22%] top-[22%] lg:left-[25%] lg:top-[22%] pointer-events-auto">
          <div className="max-w-none">
            {/* <h1 className="font-logo-main text-[clamp(1.5rem,3.5vw,4.5rem)] uppercase tracking-[0.2em] font-bold text-burgundy drop-shadow-sm leading-tight mb-2 whitespace-nowrap">
              Lépoxy <span className="font-logo-sub text-[clamp(1rem,2.5vw,3rem)] inline">Atelier</span>
            </h1> */}
            <p className="font-sans uppercase tracking-[0.2em] text-[clamp(0.6rem,0.9vw,1rem)] font-medium text-burgundy/80 drop-shadow-sm">
              Натуральна шкіра та справжні квіти,<br /> збережені в епоксидній смолі.
            </p>
          </div>
        </div>

        {/* КНОПКА: прибита до низу */}
        <div className="absolute bottom-[4%] left-1/2 -translate-x-1/2 pointer-events-auto">
          <Link
            href="/#collections"
            className="relative overflow-hidden inline-block bg-burgundy text-cream px-10 py-4 uppercase text-[12px] tracking-[0.2em] font-medium shadow-xl transition-all duration-300 hover:bg-dark-brown hover:-translate-y-1 active:scale-95 after:content-[''] after:absolute after:top-0 after:-left-[100%] after:w-1/2 after:h-full after:bg-gradient-to-r after:from-transparent after:via-white/20 after:to-transparent after:skew-x-[-20deg] after:animate-[shine_5s_infinite_linear]"
          >
            Переглянути колекції
          </Link>
        </div>
      </div>

      {/* 3. КОНТЕНТ ДЛЯ МОБІЛКИ */}
      <div className="relative z-20 md:hidden w-full h-full flex flex-col justify-end items-center text-center px-6 pb-6">
        <div className="mb-8">
          {/* <h1 className="font-logo-main text-3xl min-[500px]:text-4xl uppercase tracking-[0.2em] font-bold text-burgundy drop-shadow-sm leading-tight mb-3">
            Lépoxy <span className="font-logo-sub text-2xl min-[500px]:text-3xl inline">Atelier</span>
          </h1> */}
          <p className="font-sans uppercase tracking-[0.2em] text-[10px] min-[500px]:text-xs font-medium text-black/80 drop-shadow-sm">
            Натуральна шкіра та справжні квіти,<br /> збережені в епоксидній смолі.
          </p>
        </div>
        <Link
          href="/#collections"
          className="relative overflow-hidden inline-block bg-burgundy text-cream px-10 py-4 uppercase text-[12px] tracking-[0.2em] font-medium shadow-xl transition-all duration-300 hover:bg-dark-brown hover:-translate-y-1 active:scale-95"
        >
          Переглянути колекції
        </Link>
      </div>

    </section>
  );
};

export default Hero;
