"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import { PRIVACY_POLICY, PUBLIC_OFFER } from '@/constants/legal';

// Компонент модального вікна
const Modal = ({ isOpen, onClose, title, children }: { isOpen: boolean, onClose: () => void, title: string, children: React.ReactNode }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-dark-brown/60 backdrop-blur-sm" onClick={onClose}>
      <div className="bg-cream w-full max-w-2xl rounded-2xl shadow-2xl relative animate-in fade-in zoom-in-95 duration-300" onClick={(e) => e.stopPropagation()}>
        <button onClick={onClose} className="absolute top-6 right-6 p-2 text-dark-brown/50 hover:text-burgundy transition-colors">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
        </button>
        <div className="p-8 md:p-12 max-h-[80vh] overflow-y-auto">
          <h3 className="font-playfair text-2xl text-burgundy font-bold mb-6 uppercase tracking-widest">{title}</h3>
          <div className="font-sans text-sm text-dark-brown/80 leading-relaxed space-y-4">{children}</div>
        </div>
      </div>
    </div>
  );
};

const Footer = () => {
  const [activeModal, setActiveModal] = useState<'privacy' | 'offer' | null>(null);
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-burgundy text-cream pt-20 pb-10">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 w-full">
        
        {/* Додав items-start, щоб підняти все до однієї лінії */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-8 mb-20 items-start">
          
          {/* 1. ЛОГОТИП */}
          <div className="flex flex-col items-center text-center">
            {/* РОЗМІР: міняй w-64 та h-32 нижче (Tailwind кроки по 4px, w-64 = 256px)
               ВИРІВНЮВАННЯ: -mt-6 піднімає логотип вгору 
            */}
            <div className="relative w-80 h-40 mb-4 -mt-13">
              <Image 
                src="/logo/logo_transparent_beige.svg" 
                alt="Lépoxy Atelier Logo" 
                fill 
                className="object-contain"
              />
            </div>
            <p className="font-sans text-sm opacity-70 max-w-[280px] leading-relaxed">
              Створюємо не просто аксесуари, а застиглі моменти природи для вашого натхнення.
            </p>
          </div>

          {/* 2. ЗВ'ЯЗОК */}
          <div className="flex flex-col items-center text-center">
            <h3 className="font-playfair text-xl font-semibold mb-8 uppercase tracking-widest">Зв’язок</h3>
            <div className="flex flex-col items-center gap-5 font-sans text-sm tracking-wide">
              <a href="https://instagram.com/llixtar" target="_blank" className="flex items-center gap-3 hover:text-warm-beige transition-colors">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
                Instagram
              </a>
              <a href="https://t.me/llixtar" target="_blank" className="flex items-center gap-3 hover:text-warm-beige transition-colors">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 2L11 13"></path><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
                Telegram
              </a>
              <a href="mailto:hello@lepoxy.com.ua" className="flex items-center gap-3 hover:text-warm-beige transition-colors">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
                lepoxyatelier@gmail.com
              </a>
            </div>
          </div>

          {/* 3. ЛОКАЦІЯ */}
          <div className="flex flex-col items-center text-center">
            <h3 className="font-playfair text-xl font-semibold mb-8 uppercase tracking-widest">Локація</h3>
            <p className="font-sans text-sm opacity-70 leading-relaxed">
              Ручна робота — зроблено в Україні 🇺🇦<br />
              Львів, доставка по всьому світу
            </p>
          </div>
        </div>

        {/* НИЖНЯ ПАНЕЛЬ */}
        <div className="pt-8 border-t border-cream/10 flex flex-col md:flex-row justify-between items-center gap-6 text-[10px] uppercase tracking-[0.2em] opacity-50">
          <div className="flex gap-8">
            <button onClick={() => setActiveModal('privacy')} className="hover:opacity-100">Політика конфіденційності</button>
            <button onClick={() => setActiveModal('offer')} className="hover:opacity-100">Публічна оферта</button>
          </div>
          <div>© {currentYear} Lépoxy Atelier. Всі права захищені.</div>
        </div>
      </div>

      {/* МОДАЛКИ */}
      <Modal 
        isOpen={activeModal === 'privacy'} 
        onClose={() => setActiveModal(null)} 
        title="Політика конфіденційності"
      >
        {PRIVACY_POLICY}
      </Modal>

      <Modal 
        isOpen={activeModal === 'offer'} 
        onClose={() => setActiveModal(null)} 
        title="Публічна оферта"
      >
        {PUBLIC_OFFER}
      </Modal>
    </footer>
  );
};

export default Footer;