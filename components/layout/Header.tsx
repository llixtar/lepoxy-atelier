"use client";

import { useState } from 'react';
import Link from 'next/link';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => setIsOpen(!isOpen);

  const LogoImage = ({ className }: { className: string }) => (
    <img
      src="/logo/logo_transparent_red.svg"
      alt="Lépoxy Atelier Logo"
      className={`w-auto object-contain ${className}`}
    />
  );

  // Спільні класи для десктопних посилань, щоб не дублювати код
  const navLinkStyles = "relative group transition-all duration-500 hover:text-burgundy hover:tracking-[0.25em]";

  return (
    <>
      <header className="fixed top-0 left-0 w-full z-50 bg-cream/80 backdrop-blur-md border-b border-dark-brown/5 h-24 md:h-40">
        <div className="max-w-7xl mx-auto px-4 h-full flex items-center justify-between relative">

          {/* 1. ЛІВА ЧАСТИНА (Десктоп меню) */}
          <div className="flex-1 hidden md:flex space-x-10 text-[16px] uppercase tracking-[0.2em] font-semibold text-dark-brown">
            <Link href="/#collections" className={navLinkStyles}>
              <span>Колекції</span>
              <span className="absolute -bottom-1 left-0 w-0 h-px bg-burgundy transition-all duration-500 group-hover:w-full"></span>
            </Link>
            <Link href="/#process" className={navLinkStyles}>
              <span>Ательє</span>
              <span className="absolute -bottom-1 left-0 w-0 h-px bg-burgundy transition-all duration-500 group-hover:w-full"></span>
            </Link>
          </div>

          <div className="md:hidden flex-1"></div>

          {/* 2. ЦЕНТР: ЛОГОТИП */}
          <Link href="/" className="flex justify-center items-center px-4">
            <LogoImage className="h-50 md:h-70" />
          </Link>

          {/* 3. ПРАВА ЧАСТИНА (Десктоп меню + Бургер) */}
          <div className="flex-1 flex justify-end items-center">
            <nav className="hidden md:flex space-x-10 text-[16px] uppercase tracking-[0.2em] font-semibold text-dark-brown">
              {/* ТУТ БУЛА ПРАВКА: /shop змінено на /bags */}
              <Link href="/bags" className={navLinkStyles}>
                <span>Сумки</span>
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-burgundy transition-all duration-500 group-hover:w-full"></span>
              </Link>
              <Link href="/#order" className={navLinkStyles}>
                <span>Як замовити</span>
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-burgundy transition-all duration-500 group-hover:w-full"></span>
              </Link>
            </nav>

            {/* Бургер (тільки мобайл) */}
            <button
              onClick={toggleMenu}
              className="md:hidden p-2 relative z-[60] outline-none"
              aria-label="Toggle Menu"
            >
              <div className={`w-6 h-0.5 bg-dark-brown transition-all duration-300 ${isOpen ? 'rotate-45 translate-y-1' : 'mb-1.5'}`}></div>
              <div className={`w-6 h-0.5 bg-dark-brown transition-all duration-300 ${isOpen ? '-rotate-45 -translate-y-0.5' : ''}`}></div>
            </button>
          </div>
        </div>
      </header>

      {/* МОБІЛЬНЕ МЕНЮ (Overlay) */}
      <div className={`fixed inset-0 z-[100] bg-cream transition-transform duration-500 ease-in-out ${isOpen ? 'translate-y-0' : '-translate-y-full'}`}>
        <button
          onClick={toggleMenu}
          className="absolute top-12 right-6 p-2 text-dark-brown hover:text-burgundy transition-all duration-300 active:scale-90"
        >
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>

        <div className="flex flex-col h-full pt+10">
          {/* Лого тепер зверху, на рівні хрестика завдяки pt-8 */}
          <Link href="/" onClick={() => setIsOpen(false)}>
            <div className="w-full flex justify-center">
              <LogoImage className="h-50" />
            </div>
          </Link>

          <nav className="flex-grow flex flex-col items-center space-y-10 text-base uppercase tracking-[0.3em] font-semibold text-dark-brown">
            {[
              { name: 'Колекції', href: '/#collections' },
              { name: 'Ательє', href: '/#atelier' },
              { name: 'Сумки', href: '/bags' }, // ТУТ БУЛА ПРАВКА: /shop змінено на /bags
              { name: 'Як замовити', href: '/#order' },
            ].map((item) => (
              <Link
                key={item.name}
                href={item.href}
                onClick={toggleMenu}
                className="relative group transition-all duration-300 hover:text-burgundy hover:translate-x-2 active:scale-95"
              >
                <span>{item.name}</span>
                <span className="absolute -bottom-2 left-0 w-0 h-px bg-burgundy transition-all duration-300 group-hover:w-full"></span>
              </Link>
            ))}
          </nav>

          <div className="pb-12 text-[10px] tracking-widest text-dark-brown/40 uppercase">
            Lépoxy Atelier © 2026
          </div>
        </div>
      </div >
    </>
  );
};

export default Header;