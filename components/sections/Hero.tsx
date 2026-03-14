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
          
          {/* md:pt-[220px] — залишаємо для десктопа (верхня позиція)
              На мобілці воно тепер центроване завдяки justify-center у батька
          */}
          <div className="max-w-[280px] sm:max-w-lg md:max-w-xl md:pt-[200px] flex flex-col items-start">
            
            <div className="flex flex-col gap-3 md:gap-1">
              {/* Заголовок: зменшили на мобілці до text-2xl */}
              <h1 className="font-logo-main text-2xl md:text-5xl uppercase tracking-[0.2em] font-bold text-burgundy drop-shadow-sm leading-tight">
                Lépoxy <span className="font-logo-sub text-xl md:text-4xl block md:inline">Atelier</span>
              </h1>
              
              {/* Слоган: зменшили на мобілці до text-lg */}
              <p className="font-playfair text-lg md:text-3xl leading-snug text-dark-brown drop-shadow-sm">
                Сумка, створена природою і руками жінки.
              </p>
              
              {/* Опис: зменшили на мобілці до text-[13px] */}
              <p className="font-sans text-[13px] md:text-lg text-dark-brown/90 leading-relaxed font-medium max-w-[250px] md:max-w-[400px]">
                Натуральна шкіра та справжні квіти, збережені в епоксидній смолі.
              </p>

              {/* Кнопка: зменшили падінги та текст */}
              <div className="mt-4 md:mt-8">
                <Link 
                  href="#collections" 
                  className="inline-block bg-burgundy text-cream px-6 py-3 md:px-10 md:py-4 uppercase text-[10px] md:text-[12px] tracking-[0.2em] font-medium hover:bg-dark-brown transition-all duration-300 shadow-xl"
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