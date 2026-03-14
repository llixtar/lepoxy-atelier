"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link'; // Додано імпорт Link

// --- ДАНІ ДЛЯ КОНФІГУРАТОРА ---
const modelsData = [
  { id: 'Classic', name: 'Classic', img: '/images/sketches/Classic_sketch.jpg' },
  { id: 'Minimalism', name: 'Minimalism', img: '/images/sketches/Minimalism_sketch.jpg' },
  { id: 'Asymmetry', name: 'Asymmetry', img: '/images/sketches/Asymmetry_sketch.jpg' },
  { id: 'Old School', name: 'Old School', img: '/images/sketches/Old_School_sketch.jpg' }
];

const colorsData = [
  { id: 'White', name: 'White', hex: '#FDFDFD', border: '#E5E5E5' },
  { id: 'Black', name: 'Black', hex: '#1A1A1A', border: '#000000' },
  { id: 'Dark Blue', name: 'Dark Blue', hex: '#1C2841', border: '#1C2841' },
  { id: 'Chocolate', name: 'Chocolate', hex: '#4B2E1D', border: '#4B2E1D' },
  { id: 'Burgundy', name: 'Burgundy', hex: '#70020F', border: '#70020F' }
];

const moodsData = [
  'Спокій', 'Тиша', 'Пристрасть', 'Мрія', 'Свобода', 'Сила', 'Ніжність', 'Легкість', 'Тепло', 'Щастя'
];

const Order = () => {
  const [selectedModel, setSelectedModel] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [selectedMood, setSelectedMood] = useState<string | null>(null);
  const [selectedMessenger, setSelectedMessenger] = useState<'telegram' | 'instagram' | null>(null);
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  
  const [wantsToReturn, setWantsToReturn] = useState(false);

  const isFormComplete = selectedModel && selectedColor && selectedMood && selectedMessenger;

  const telegramUsername = "llixtar"; 
  const instagramUsername = "llixtar"; 

  const orderText = `Доброго дня, хочу замовити таку сумку:\nМодель: ${selectedModel}\nКолір шкіри: ${selectedColor}\nДизайн епоксидних вставок: ${selectedMood}`;

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setWantsToReturn(false);
        }
      },
      { threshold: 0.1 } 
    );

    const orderSection = document.getElementById('order');
    if (orderSection) {
      observer.observe(orderSection);
    }

    return () => {
      if (orderSection) {
        observer.unobserve(orderSection);
      }
    };
  }, []);

  const handleOrderSubmit = () => {
    if (!isFormComplete) return;

    if (selectedMessenger === 'telegram') {
      const tgUrl = `https://t.me/${telegramUsername}?text=${encodeURIComponent(orderText)}`;
      window.open(tgUrl, '_blank');
    } else if (selectedMessenger === 'instagram') {
      setIsModalOpen(true);
    }
  };

  const handleCopyText = () => {
    navigator.clipboard.writeText(orderText);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000); 
  };

  return (
    <>
      <section id="order" className="scroll-mt-28 md:scroll-mt-14 py-12 md:py-32 bg-cream relative">
        <div className="max-w-[1000px] mx-auto px-4 md:px-12 w-full">
          
          {/* ЗАГОЛОВОК */}
          <div className="flex flex-col items-center text-center mb-10 md:mb-16">
            <h2 className="font-playfair text-2xl md:text-5xl text-burgundy font-bold mb-4 md:mb-6 uppercase tracking-[0.15em] drop-shadow-sm">
              Створи сумку своєї мрії
            </h2>
            <p className="font-sans text-sm md:text-lg text-dark-brown/80 max-w-2xl leading-relaxed">
              Кожна сумка створюється індивідуально.<br className="hidden md:block" />
              Обери модель, колір шкіри та дизайн — і ми створимо її спеціально для тебе.
            </p>
          </div>

          <div className="space-y-10 md:space-y-16">
            
            {/* КРОК 1: МОДЕЛЬ */}
            <div>
              <div className="flex items-center gap-3 md:gap-4 mb-6 md:mb-8">
                <span className="flex items-center justify-center w-6 h-6 md:w-8 md:h-8 rounded-full bg-burgundy text-cream font-bold text-xs md:text-sm shadow-sm">1</span>
                <h3 className="font-playfair text-lg md:text-2xl text-dark-brown font-semibold uppercase tracking-widest">Обери модель</h3>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6">
                {modelsData.map((model) => (
                  <button
                    key={model.id}
                    onClick={() => setSelectedModel(model.id)}
                    className={`group relative flex flex-col items-center p-2 md:p-4 bg-white rounded-xl border-2 transition-all duration-300 ${
                      selectedModel === model.id 
                        ? 'border-burgundy shadow-lg scale-105' 
                        : 'border-transparent shadow-sm hover:shadow-md hover:border-warm-beige'
                    }`}
                  >
                    <div className="relative w-full aspect-square mb-2 md:mb-4 overflow-hidden">
                      <Image 
                        src={model.img} 
                        alt={model.name} 
                        fill 
                        className="object-contain transition-transform duration-500 group-hover:scale-110 p-2 md:p-0"
                      />
                    </div>
                    <span className={`font-sans text-[11px] md:text-base font-medium transition-colors ${selectedModel === model.id ? 'text-burgundy' : 'text-dark-brown group-hover:text-burgundy/80'}`}>
                      {model.name}
                    </span>
                    
                    {selectedModel === model.id && (
                      <div className="absolute top-2 right-2 md:top-3 md:right-3 text-burgundy animate-in zoom-in duration-200">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="md:w-6 md:h-6"><polyline points="20 6 9 17 4 12"></polyline></svg>
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* КРОК 2: КОЛІР ШКІРИ */}
            <div>
              <div className="flex items-center gap-3 md:gap-4 mb-6 md:mb-8">
                <span className="flex items-center justify-center w-6 h-6 md:w-8 md:h-8 rounded-full bg-burgundy text-cream font-bold text-xs md:text-sm shadow-sm">2</span>
                <h3 className="font-playfair text-lg md:text-2xl text-dark-brown font-semibold uppercase tracking-widest">Обери колір шкіри</h3>
              </div>

              <div className="flex flex-wrap gap-4 md:gap-10">
                {colorsData.map((color) => (
                  <button
                    key={color.id}
                    onClick={() => setSelectedColor(color.id)}
                    className="flex flex-col items-center gap-2 md:gap-3 group transition-transform duration-300 hover:scale-110"
                  >
                    <div 
                      className={`w-10 h-10 md:w-16 md:h-16 rounded-full transition-all duration-300 ${
                        selectedColor === color.id 
                          ? 'ring-2 md:ring-4 ring-offset-2 md:ring-offset-4 ring-burgundy'
                          : 'ring-1 ring-offset-1 md:ring-offset-2 ring-transparent group-hover:ring-warm-beige'
                      }`}
                      style={{ backgroundColor: color.hex, borderColor: color.border, borderWidth: '1px' }}
                    >
                      {selectedColor === color.id && (
                        <div className="w-full h-full flex items-center justify-center animate-in zoom-in duration-200">
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={color.id === 'White' ? '#2A1F1C' : '#FFFFFF'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="md:w-6 md:h-6"><polyline points="20 6 9 17 4 12"></polyline></svg>
                        </div>
                      )}
                    </div>
                    <span className={`font-sans text-[10px] md:text-sm font-medium transition-colors ${selectedColor === color.id ? 'text-burgundy' : 'text-dark-brown/70 group-hover:text-dark-brown'}`}>
                      {color.name}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* КРОК 3: НАСТРІЙ */}
            {/* Додано id="step-mood" та відступ скролу scroll-mt-28 md:scroll-mt-40 */}
            <div id="step-mood" className="scroll-mt-28 md:scroll-mt-40">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 md:gap-4 mb-6 md:mb-8">
                <div className="flex items-center gap-3 md:gap-4">
                  <span className="flex items-center justify-center w-6 h-6 md:w-8 md:h-8 rounded-full bg-burgundy text-cream font-bold text-xs md:text-sm shadow-sm">3</span>
                  <h3 className="font-playfair text-lg md:text-2xl text-dark-brown font-semibold uppercase tracking-widest">Обери настрій</h3>
                </div>
                
                <a 
                  href="#collections" 
                  onClick={() => setWantsToReturn(true)}
                  className="text-[10px] md:text-sm font-sans text-burgundy/80 hover:text-burgundy underline underline-offset-4 transition-colors ml-9 md:ml-0"
                >
                  Переглянути колекції →
                </a>
              </div>

              <div className="flex flex-wrap gap-2 md:hidden mb-4">
                {moodsData.map((mood) => (
                  <button
                    key={mood}
                    onClick={() => setSelectedMood(mood)}
                    className={`px-3 py-1.5 rounded-full border border-burgundy/20 font-sans text-[11px] transition-all duration-300 hover:scale-105 ${
                      selectedMood === mood 
                        ? 'bg-burgundy text-cream shadow-md border-burgundy' 
                        : 'bg-transparent text-dark-brown hover:bg-warm-beige'
                    }`}
                  >
                    {mood} {selectedMood === mood && '✓'}
                  </button>
                ))}
              </div>

              <div className="hidden md:flex flex-col gap-4 mb-6 items-center w-full">
                <div className="flex justify-center gap-4 w-full">
                  {moodsData.slice(0, 4).map((mood) => (
                    <button
                      key={mood}
                      onClick={() => setSelectedMood(mood)}
                      className={`px-5 py-2.5 rounded-full border border-burgundy/20 font-sans text-base transition-all duration-300 hover:scale-105 ${
                        selectedMood === mood 
                          ? 'bg-burgundy text-cream shadow-md border-burgundy' 
                          : 'bg-transparent text-dark-brown hover:bg-warm-beige'
                      }`}
                    >
                      {mood} {selectedMood === mood && '✓'}
                    </button>
                  ))}
                </div>
                <div className="flex justify-center gap-4 w-full">
                  {moodsData.slice(4, 8).map((mood) => (
                    <button
                      key={mood}
                      onClick={() => setSelectedMood(mood)}
                      className={`px-5 py-2.5 rounded-full border border-burgundy/20 font-sans text-base transition-all duration-300 hover:scale-105 ${
                        selectedMood === mood 
                          ? 'bg-burgundy text-cream shadow-md border-burgundy' 
                          : 'bg-transparent text-dark-brown hover:bg-warm-beige'
                      }`}
                    >
                      {mood} {selectedMood === mood && '✓'}
                    </button>
                  ))}
                </div>
                <div className="flex justify-center gap-4 w-full">
                  {moodsData.slice(8, 10).map((mood) => (
                    <button
                      key={mood}
                      onClick={() => setSelectedMood(mood)}
                      className={`px-5 py-2.5 rounded-full border border-burgundy/20 font-sans text-base transition-all duration-300 hover:scale-105 ${
                        selectedMood === mood 
                          ? 'bg-burgundy text-cream shadow-md border-burgundy' 
                          : 'bg-transparent text-dark-brown hover:bg-warm-beige'
                      }`}
                    >
                      {mood} {selectedMood === mood && '✓'}
                    </button>
                  ))}
                </div>
              </div>

              <p className="text-[10px] md:text-xs text-dark-brown/60 font-medium tracking-wide ml-9 md:ml-0 md:text-center">
                * Час створення сумки: 10–14 днів
              </p>
            </div>

            {/* КРОК 4: ВИБІР МЕСЕНДЖЕРА */}
            <div>
               <div className="flex items-center gap-3 md:gap-4 mb-6 md:mb-8">
                <span className="flex items-center justify-center w-6 h-6 md:w-8 md:h-8 rounded-full bg-burgundy text-cream font-bold text-xs md:text-sm shadow-sm">4</span>
                <h3 className="font-playfair text-lg md:text-2xl text-dark-brown font-semibold uppercase tracking-widest">Де зручніше оформити?</h3>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-3 md:gap-4">
                <button 
                  onClick={() => setSelectedMessenger('telegram')}
                  className={`flex-1 flex items-center justify-center gap-2 md:gap-3 py-3 md:py-4 rounded-xl border-2 transition-all duration-300 hover:scale-[1.02] ${
                    selectedMessenger === 'telegram' ? 'border-burgundy bg-burgundy/5 text-burgundy shadow-md' : 'border-dark-brown/10 text-dark-brown/70 hover:border-warm-beige'
                  }`}
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="md:w-6 md:h-6"><path d="M22 2L11 13"></path><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
                  <span className="font-semibold tracking-wide text-sm md:text-base">Telegram</span>
                </button>

                <button 
                  onClick={() => setSelectedMessenger('instagram')}
                  className={`flex-1 flex items-center justify-center gap-2 md:gap-3 py-3 md:py-4 rounded-xl border-2 transition-all duration-300 hover:scale-[1.02] ${
                    selectedMessenger === 'instagram' ? 'border-burgundy bg-burgundy/5 text-burgundy shadow-md' : 'border-dark-brown/10 text-dark-brown/70 hover:border-warm-beige'
                  }`}
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="md:w-6 md:h-6"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
                  <span className="font-semibold tracking-wide text-sm md:text-base">Instagram</span>
                </button>
              </div>
            </div>

          </div>

          {/* ФІНАЛЬНИЙ БЛОК: КНОПКИ (Без лінії і з меншими відступами) */}
          <div className="mt-6 flex flex-col items-center">
            
            {!isFormComplete && (
              <p className="text-xs md:text-sm text-burgundy/70 mb-3 md:mb-4 animate-pulse text-center">
                Пройдіть усі 4 кроки, щоб активувати замовлення
              </p>
            )}

            <button 
              onClick={handleOrderSubmit}
              disabled={!isFormComplete}
              className={`flex items-center justify-center w-full max-w-md py-3 md:py-4 uppercase text-[11px] md:text-[13px] tracking-[0.2em] font-bold transition-all duration-300 shadow-lg ${
                isFormComplete 
                  ? 'bg-burgundy text-cream hover:bg-dark-brown hover:scale-[1.02] active:scale-95 cursor-pointer' 
                  : 'bg-dark-brown/10 text-dark-brown/40 cursor-not-allowed'
              }`}
            >
              Перейти до замовлення
            </button>

            {/* Замінено на <Link> для переходу на сторінку /bags */}
            <Link 
              href="/bags"
              className="mt-4 md:mt-6 text-[10px] md:text-xs uppercase tracking-widest text-dark-brown/70 hover:text-burgundy transition-colors underline underline-offset-8"
            >
              Переглянути сумки в наявності
            </Link>

            <div className="mt-10 md:mt-12 text-center max-w-xl">
              <h4 className="font-playfair text-lg md:text-xl text-dark-brown font-semibold mb-2 md:mb-3">
                Мрієш про власний дизайн?
              </h4>
              <p className="font-sans text-[11px] md:text-sm text-dark-brown/80 leading-relaxed">
                Ми відкриті до творчих експериментів і можемо створити унікальну композицію зі смоли спеціально для тебе. Просто напиши нам.
              </p>
            </div>
          </div>

        </div>

        {/* --- МОДАЛЬНЕ ВІКНО ДЛЯ INSTAGRAM --- */}
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-dark-brown/60 backdrop-blur-sm transition-opacity">
            <div className="bg-cream w-full max-w-md rounded-2xl shadow-2xl overflow-hidden relative animate-in fade-in zoom-in-95 duration-300">
              
              <button 
                onClick={() => setIsModalOpen(false)}
                className="absolute top-4 right-4 p-2 text-dark-brown/50 hover:text-burgundy transition-colors"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
              </button>

              <div className="p-8">
                <h3 className="font-playfair text-2xl text-burgundy font-bold mb-2">Майже готово!</h3>
                <p className="font-sans text-sm text-dark-brown/80 mb-6">
                  Instagram не дозволяє передати текст автоматично. Скопіюй деталі свого замовлення та відправ нам у Direct.
                </p>

                <div className="bg-white p-4 rounded-lg border border-warm-beige mb-6">
                  <p className="font-sans text-sm text-dark-brown whitespace-pre-wrap">{orderText}</p>
                </div>

                <button 
                  onClick={handleCopyText}
                  className={`w-full py-3 mb-4 rounded-lg font-bold text-sm tracking-widest uppercase transition-all duration-300 border-2 ${
                    isCopied 
                      ? 'bg-green-50 text-green-700 border-green-200' 
                      : 'bg-transparent text-burgundy border-burgundy hover:bg-burgundy/5'
                  }`}
                >
                  {isCopied ? 'Скопійовано ✓' : 'Скопіювати текст'}
                </button>

                <a 
                  href={`https://ig.me/m/${instagramUsername}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setIsModalOpen(false)}
                  className="flex items-center justify-center w-full py-4 bg-burgundy text-cream rounded-lg font-bold text-[13px] tracking-[0.2em] uppercase transition-transform hover:scale-[1.02] active:scale-95 shadow-md"
                >
                  Відкрити Instagram Direct
                </a>
              </div>
            </div>
          </div>
        )}
      </section>

      {/* РОЗУМНА ЛИПКА КНОПКА ПОВЕРНЕННЯ */}
      {/* href змінено на #step-mood */}
      {wantsToReturn && (
        <a
          href="#step-mood"
          onClick={() => setWantsToReturn(false)}
          className="fixed bottom-6 md:bottom-10 left-1/2 -translate-x-1/2 z-[100] bg-burgundy text-cream px-6 py-3 md:px-8 md:py-4 rounded-full shadow-2xl uppercase tracking-widest text-[10px] md:text-xs font-bold animate-bounce hover:bg-dark-brown transition-colors whitespace-nowrap"
        >
          Продовжити оформлення ↓
        </a>
      )}
    </>
  );
};

export default Order;