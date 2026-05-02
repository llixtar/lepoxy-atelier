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
        {/* 
            ДОДАНО: items-center (центрує блоки горизонтально на мобілці)
            md:items-start (повертає вліво на десктопі)
        */}
        <div className="w-full h-full px-6 min-[500px]:pl-8 min-[500px]:pr-0 flex flex-col items-center min-[500px]:items-start justify-start min-[500px]:justify-end pb-6 min-[500px]:pb-1">

          <div className="mt-[30svh] min-[500px]:mt-0 flex flex-col items-center min-[500px]:items-start text-center min-[500px]:text-left min-[500px]:max-w-fit min-[500px]:pt-9 min-[500px]:px-6 min-[500px]:pb-3 min-[500px]:rounded-2xl [@media(min-width:1400px)]:p-0">
            {/* ЗАГОЛОВОК (Залишається в основному контейнері на своєму місці) */}
            <h1 className="font-logo-main text-3xl min-[500px]:text-4xl uppercase tracking-wider min-[500px]:tracking-[0.2em] font-bold text-burgundy drop-shadow-sm leading-tight min-[500px]:whitespace-nowrap mb-4 min-[500px]:mb-2">
              Lépoxy <span className="font-logo-sub text-2xl min-[500px]:text-2xl inline">Atelier</span>
            </h1>

            {/* ПІДЛАДКА (Використовує негативні маржини, щоб розширити фон до країв контейнера, не зачіпаючи заголовок) */}
            <div className="flex flex-col items-center min-[500px]:items-start gap-1 min-[500px]:bg-cream/40 min-[500px]:backdrop-blur-md min-[500px]:-mx-6 min-[500px]:-mb-3 min-[500px]:px-6 min-[500px]:py-3 min-[500px]:rounded-b-2xl min-[500px]:shadow-sm [@media(min-width:1400px)]:bg-transparent [@media(min-width:1400px)]:backdrop-blur-none [@media(min-width:1400px)]:shadow-none [@media(min-width:1400px)]:p-0 [@media(min-width:1400px)]:m-0">
              <p className="font-playfair text-[4.2vw] sm:text-lg min-[500px]:text-xl leading-snug text-black drop-shadow-sm whitespace-nowrap">
                Сумка, створена природою і руками жінки.
              </p>

              <div className="mt-[205px] min-[500px]:mt-2">
                <p className="font-playfair text-[4.2vw] sm:text-lg min-[500px]:text-xl leading-snug text-black drop-shadow-sm min-[500px]:whitespace-nowrap">
                  Натуральна шкіра та справжні квіти, збережені в епоксидній смолі.
                </p>
              </div>
            </div>
          </div>

          {/* ГРУПА 3: КНОПКА */}
          <div className="mt-auto min-[500px]:mt-4 mb-1 min-[500px]:mb-0">
            <Link
              href="/#collections"
              className="
                relative overflow-hidden inline-block bg-burgundy text-cream px-6 py-3 min-[500px]:px-10 min-[500px]:py-4 
                uppercase text-[10px] min-[500px]:text-[12px] tracking-[0.2em] font-medium 
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