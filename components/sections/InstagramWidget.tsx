import React from 'react';
import Script from 'next/script';

const InstagramWidget = () => {
  const instagramHandle = "llixtar";
  const instagramLink = `https://instagram.com/${instagramHandle}`;

  return (
    <section id="instagram-widget" className="py-12 md:py-16 bg-cream">
      <div className="max-w-[1440px] mx-auto px-4 md:px-12 w-full">
        
        {/* ЗАГОЛОВОК */}
        <div className="flex flex-col items-center text-center mb-8 md:mb-10">
          <h2 className="font-playfair text-2xl md:text-4xl text-burgundy font-bold mb-2 md:mb-3 uppercase tracking-widest">
            Слідкуйте за нами
          </h2>
          <a 
            href={instagramLink}
            target="_blank"
            rel="noopener noreferrer"
            className="font-sans text-base md:text-lg text-dark-brown/70 hover:text-burgundy transition-colors font-medium flex items-center gap-2"
          >
            @{instagramHandle}
          </a>
        </div>

        {/* КОНТЕЙНЕР ДЛЯ ВІДЖЕТА ELFSIGHT */}
        <div className="w-full min-h-[250px] md:min-h-[300px] flex justify-center items-center mb-8 md:mb-10">
          
          {/* Асинхронне завантаження скрипта, щоб не блокувати рендер сторінки */}
          <Script 
            src="https://elfsightcdn.com/platform.js" 
            strategy="lazyOnload" 
          />
          
          {/* Сам віджет із твоїм ID */}
          <div 
            className="elfsight-app-3dbc75c6-816b-4fe1-923d-0993f89b8de7 w-full" 
            data-elfsight-app-lazy
          ></div>

        </div>

        {/* КНОПКА ПІДПИСАТИСЯ */}
        <div className="flex justify-center relative z-20">
          <a 
            href={instagramLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 md:gap-3 px-6 py-3 md:px-8 md:py-4 bg-burgundy text-cream uppercase text-[11px] md:text-[13px] font-bold tracking-[0.2em] transition-transform duration-300 hover:scale-105 active:scale-95 shadow-lg rounded-sm"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="md:w-5 md:h-5">
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
              <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
              <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
            </svg>
            Підписатися
          </a>
        </div>

      </div>
    </section>
  );
};

export default InstagramWidget;