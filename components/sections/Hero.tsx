import Link from 'next/link';
import Image from 'next/image';

const Hero = () => {
  return (
    <section className="relative w-full h-[100svh] overflow-hidden bg-cream">

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

      {/* 2. КОНТЕНТ */}
      <div className="relative z-10 w-full h-full">
        <div className="max-w-[1440px] mx-auto h-full px-6 md:px-12 flex flex-col justify-center md:justify-start">

          <div className="max-w-[280px] sm:max-w-lg md:max-w-xl md:pt-[200px] flex flex-col items-start">

            <div className="flex flex-col gap-3 md:gap-1">
              <h1 className="font-logo-main text-xl md:text-5xl uppercase tracking-wider md:tracking-[0.2em] font-bold text-burgundy drop-shadow-sm leading-tight whitespace-nowrap">
                Lépoxy <span className="font-logo-sub text-lg md:text-4xl inline">Atelier</span>
              </h1>

              <p className="font-playfair text-lg md:text-3xl leading-snug text-dark-brown drop-shadow-sm md:whitespace-nowrap">
                Сумка, створена природою і руками жінки.
              </p>

              <p className="font-sans text-[13px] md:text-lg text-dark-brown/90 leading-relaxed font-medium max-w-[250px] md:max-w-[400px]">
                Натуральна шкіра та справжні квіти, збережені в епоксидній смолі.
              </p>

              {/* Кнопка з ефектом алмазного блиску та підйому */}
              <div className="mt-4 md:mt-4">
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
        </div>
      </div>

    </section>
  );
};

export default Hero;