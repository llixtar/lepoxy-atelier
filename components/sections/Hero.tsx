import Link from 'next/link';
import Image from 'next/image';

const Hero = () => {
  return (
    <section className="relative w-full h-[160vw] min-[500px]:h-[100svh] overflow-hidden bg-cream">

      {/* 1. ФОНОВІ ФОТО */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/hero-desktop_new.jpg"
          alt="Колекція сумок Lépoxy Atelier"
          fill
          priority
          className="hidden min-[500px]:block object-cover object-center"
        />
        <Image
          src="/images/hero-mobile_new.jpg"
          alt="Сумки Lépoxy Atelier"
          fill
          priority
          className="block min-[500px]:hidden object-cover object-center"
        />
      </div>

      {/* 2. КОНТЕНТ */}
      <div className="relative z-10 w-full h-full">
        {/* КОНТЕНТ ДЛЯ ДЕСКТОПА (min-width: 500px) */}
        <div className="hidden min-[500px]:flex w-full h-full px-6 min-[500px]:pl-8 min-[500px]:pr-0 flex-col items-start justify-end pb-6 min-[500px]:pb-1">
          <div className="min-[890px]:max-w-fit min-[500px]:pt-9 min-[500px]:px-6 min-[500px]:pb-3 min-[500px]:rounded-2xl [@media(min-width:1400px)]:p-0">
            <h1 className="font-logo-main text-4xl uppercase tracking-[0.2em] font-bold text-burgundy drop-shadow-sm leading-tight whitespace-nowrap mb-2">
              Lépoxy <span className="font-logo-sub text-2xl inline">Atelier</span>
            </h1>
            <p className="font-playfair text-xl leading-snug text-black drop-shadow-sm whitespace-nowrap">
              Сумка, створена природою і руками жінки.
            </p>
            <div className="mt-2">
              <p className="font-playfair text-xl leading-snug text-black drop-shadow-sm whitespace-nowrap">
                Натуральна шкіра та справжні квіти, збережені в епоксидній смолі.
              </p>
            </div>
          </div>
          <div className="mt-4 mb-0">
            <Link href="/#collections" className="relative overflow-hidden inline-block bg-burgundy text-cream px-10 py-4 uppercase text-[12px] tracking-[0.2em] font-medium shadow-xl transition-all duration-300 hover:bg-dark-brown hover:-translate-y-1 active:scale-95 after:content-[''] after:absolute after:top-0 after:-left-[100%] after:w-1/2 after:h-full after:bg-gradient-to-r after:from-transparent after:via-white/20 after:to-transparent after:skew-x-[-20deg] after:animate-[shine_5s_infinite_linear]">
              Переглянути колекції
            </Link>
          </div>
        </div>

        {/* КОНТЕНТ ДЛЯ МОБІЛКИ (max-width: 499px) */}
        <div className="min-[500px]:hidden absolute inset-0">
          {/* ЗАГОЛОВОК */}
          <div className="absolute top-[45vw] left-0 w-full text-center">
            <h1 className="font-logo-main text-3xl uppercase tracking-wider font-bold text-burgundy drop-shadow-sm leading-tight">
              Lépoxy <span className="font-logo-sub text-2xl inline">Atelier</span>
            </h1>
          </div>

          {/* ПЕРШИЙ РЯДОК */}
          <div className="absolute top-[55vw] left-0 w-full text-center px-4">
            <p className="font-playfair text-[3.8vw] leading-snug text-black drop-shadow-md whitespace-nowrap">
              Сумка, створена природою і руками жінки.
            </p>
          </div>

          {/* ДРУГИЙ РЯДОК */}
          <div className="absolute top-[102vw] left-0 w-full text-center px-6">
            <p className="font-playfair text-[3.8vw] leading-snug text-black drop-shadow-md">
              Натуральна шкіра та справжні квіти, збережені в епоксидній смолі.
            </p>
          </div>

          {/* КНОПКА */}
          <div className="absolute bottom-[8vw] left-0 w-full text-center px-6 z-20">
            <Link 
              href="/#collections" 
              className="
                relative overflow-hidden inline-block bg-burgundy text-cream px-8 py-4 
                uppercase text-[11px] tracking-[0.2em] font-medium 
                shadow-xl transition-all duration-300
                hover:bg-dark-brown active:scale-95
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