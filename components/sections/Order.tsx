"use client";

import React, { useState } from 'react';
import Image from 'next/image';

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

// Оновлений список за ТЗ (без "Мрійливості")
const moodsData = [
  'Спокій', 'Тиша', 'Пристрасть', 'Мрія', 'Свобода', 'Сила', 'Ніжність', 'Легкість', 'Тепло', 'Щастя'
];

const Order = () => {
  // Стейти вибору
  const [selectedModel, setSelectedModel] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [selectedMood, setSelectedMood] = useState<string | null>(null);
  const [selectedMessenger, setSelectedMessenger] = useState<'telegram' | 'instagram' | null>(null);
  
  // Стейти для модалки Інстаграму
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  // Перевірка, чи всі 4 кроки пройдені
  const isFormComplete = selectedModel && selectedColor && selectedMood && selectedMessenger;

  // Твої контакти для тесту
  const telegramUsername = "llixtar"; 
  const instagramUsername = "llixtar"; 

  // Чистий текст замовлення (для копіювання)
  const orderText = `Доброго дня, хочу замовити таку сумку:\nМодель: ${selectedModel}\nКолір шкіри: ${selectedColor}\nДизайн епоксидних вставок: ${selectedMood}`;

  // Обробник натискання головної кнопки
  // Обробник натискання головної кнопки
  const handleOrderSubmit = () => {
    if (!isFormComplete) return;

    if (selectedMessenger === 'telegram') {
      // МАГІЯ ТУТ: window.open з параметром '_blank' відкриває ТГ у новій вкладці, 
      // зберігаючи твій сайт відкритим на фоні!
      const tgUrl = `https://t.me/${telegramUsername}?text=${encodeURIComponent(orderText)}`;
      window.open(tgUrl, '_blank');
    } else if (selectedMessenger === 'instagram') {
      // Відкриваємо модалку для Інсти
      setIsModalOpen(true);
    }
  };

  // Функція копіювання тексту
  const handleCopyText = () => {
    navigator.clipboard.writeText(orderText);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000); // Повертаємо текст кнопки через 2 сек
  };

  return (
    <section id="order" className="py-20 md:py-32 bg-cream relative">
      <div className="max-w-[1000px] mx-auto px-6 md:px-12 w-full">
        
        {/* ЗАГОЛОВОК */}
        <div className="flex flex-col items-center text-center mb-16">
          <h2 className="font-playfair text-3xl md:text-5xl text-burgundy font-bold mb-6 uppercase tracking-[0.15em] drop-shadow-sm">
            Створи сумку своєї мрії
          </h2>
          <p className="font-sans text-base md:text-lg text-dark-brown/80 max-w-2xl leading-relaxed">
            Кожна сумка створюється індивідуально.<br className="hidden md:block" />
            Обери модель, колір шкіри та дизайн — і ми створимо її спеціально для тебе.
          </p>
        </div>

        <div className="space-y-16">
          
          {/* КРОК 1: МОДЕЛЬ */}
          <div>
            <div className="flex items-center gap-4 mb-8">
              <span className="flex items-center justify-center w-8 h-8 rounded-full bg-burgundy text-cream font-bold text-sm shadow-sm">1</span>
              <h3 className="font-playfair text-2xl text-dark-brown font-semibold uppercase tracking-widest">Обери модель</h3>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
              {modelsData.map((model) => (
                <button
                  key={model.id}
                  onClick={() => setSelectedModel(model.id)}
                  className={`group relative flex flex-col items-center p-4 bg-white rounded-xl border-2 transition-all duration-300 ${
                    selectedModel === model.id 
                      ? 'border-burgundy shadow-lg scale-105' 
                      : 'border-transparent shadow-sm hover:shadow-md hover:border-warm-beige'
                  }`}
                >
                  <div className="relative w-full aspect-square mb-4 overflow-hidden">
                    <Image 
                      src={model.img} 
                      alt={model.name} 
                      fill 
                      className="object-contain transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>
                  <span className={`font-sans text-sm md:text-base font-medium transition-colors ${selectedModel === model.id ? 'text-burgundy' : 'text-dark-brown group-hover:text-burgundy/80'}`}>
                    {model.name}
                  </span>
                  
                  {selectedModel === model.id && (
                    <div className="absolute top-3 right-3 text-burgundy animate-in zoom-in duration-200">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* КРОК 2: КОЛІР ШКІРИ */}
          <div>
            <div className="flex items-center gap-4 mb-8">
              <span className="flex items-center justify-center w-8 h-8 rounded-full bg-burgundy text-cream font-bold text-sm shadow-sm">2</span>
              <h3 className="font-playfair text-2xl text-dark-brown font-semibold uppercase tracking-widest">Обери колір шкіри</h3>
            </div>

            <div className="flex flex-wrap gap-6 md:gap-10">
              {colorsData.map((color) => (
                <button
                  key={color.id}
                  onClick={() => setSelectedColor(color.id)}
                  className="flex flex-col items-center gap-3 group transition-transform duration-300 hover:scale-110"
                >
                  <div 
                    className={`w-14 h-14 md:w-16 md:h-16 rounded-full transition-all duration-300 ${
                      selectedColor === color.id 
                        ? 'ring-4 ring-offset-4 ring-burgundy' 
                        : 'ring-1 ring-offset-2 ring-transparent group-hover:ring-warm-beige'
                    }`}
                    style={{ backgroundColor: color.hex, borderColor: color.border, borderWidth: '1px' }}
                  >
                    {selectedColor === color.id && (
                      <div className="w-full h-full flex items-center justify-center animate-in zoom-in duration-200">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={color.id === 'White' ? '#2A1F1C' : '#FFFFFF'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                      </div>
                    )}
                  </div>
                  <span className={`font-sans text-xs md:text-sm font-medium transition-colors ${selectedColor === color.id ? 'text-burgundy' : 'text-dark-brown/70 group-hover:text-dark-brown'}`}>
                    {color.name}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* КРОК 3: НАСТРІЙ */}
          <div>
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
              <div className="flex items-center gap-4">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-burgundy text-cream font-bold text-sm shadow-sm">3</span>
                <h3 className="font-playfair text-2xl text-dark-brown font-semibold uppercase tracking-widest">Обери настрій</h3>
              </div>
              
              <a href="#collections" className="text-xs md:text-sm font-sans text-burgundy/80 hover:text-burgundy underline underline-offset-4 transition-colors ml-12 md:ml-0">
                Переглянути колекції →
              </a>
            </div>

            <div className="flex flex-wrap gap-3 md:gap-4 mb-6">
              {moodsData.map((mood) => (
                <button
                  key={mood}
                  onClick={() => setSelectedMood(mood)}
                  className={`px-5 py-2.5 rounded-full border border-burgundy/20 font-sans text-sm md:text-base transition-all duration-300 hover:scale-105 ${
                    selectedMood === mood 
                      ? 'bg-burgundy text-cream shadow-md border-burgundy' 
                      : 'bg-transparent text-dark-brown hover:bg-warm-beige'
                  }`}
                >
                  {mood} {selectedMood === mood && '✓'}
                </button>
              ))}
            </div>

            <p className="text-xs text-dark-brown/60 font-medium tracking-wide ml-12 md:ml-0">
              * Час створення сумки: 10–14 днів
            </p>
          </div>

          {/* КРОК 4: ВИБІР МЕСЕНДЖЕРА */}
          <div>
             <div className="flex items-center gap-4 mb-8">
              <span className="flex items-center justify-center w-8 h-8 rounded-full bg-burgundy text-cream font-bold text-sm shadow-sm">4</span>
              <h3 className="font-playfair text-2xl text-dark-brown font-semibold uppercase tracking-widest">Де зручніше оформити?</h3>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              {/* Telegram */}
              <button 
                onClick={() => setSelectedMessenger('telegram')}
                className={`flex-1 flex items-center justify-center gap-3 py-4 rounded-xl border-2 transition-all duration-300 hover:scale-[1.02] ${
                  selectedMessenger === 'telegram' ? 'border-burgundy bg-burgundy/5 text-burgundy shadow-md' : 'border-dark-brown/10 text-dark-brown/70 hover:border-warm-beige'
                }`}
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 2L11 13"></path><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
                <span className="font-semibold tracking-wide">Telegram</span>
              </button>

              {/* Instagram */}
              <button 
                onClick={() => setSelectedMessenger('instagram')}
                className={`flex-1 flex items-center justify-center gap-3 py-4 rounded-xl border-2 transition-all duration-300 hover:scale-[1.02] ${
                  selectedMessenger === 'instagram' ? 'border-burgundy bg-burgundy/5 text-burgundy shadow-md' : 'border-dark-brown/10 text-dark-brown/70 hover:border-warm-beige'
                }`}
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
                <span className="font-semibold tracking-wide">Instagram</span>
              </button>
            </div>
          </div>

        </div>

        {/* ФІНАЛЬНИЙ БЛОК: КНОПКИ */}
        <div className="mt-20 flex flex-col items-center pt-12 border-t border-burgundy/10">
          
          {!isFormComplete && (
            <p className="text-sm text-burgundy/70 mb-4 animate-pulse text-center">
              Пройдіть усі 4 кроки, щоб активувати замовлення
            </p>
          )}

          <button 
            onClick={handleOrderSubmit}
            disabled={!isFormComplete}
            className={`flex items-center justify-center w-full max-w-md py-4 uppercase text-[13px] tracking-[0.2em] font-bold transition-all duration-300 shadow-lg ${
              isFormComplete 
                ? 'bg-burgundy text-cream hover:bg-dark-brown hover:scale-[1.02] active:scale-95 cursor-pointer' 
                : 'bg-dark-brown/10 text-dark-brown/40 cursor-not-allowed'
            }`}
          >
            Перейти до замовлення
          </button>

          <a 
            href="#bags"
            className="mt-6 text-xs md:text-sm uppercase tracking-widest text-dark-brown/70 hover:text-burgundy transition-colors underline underline-offset-8"
          >
            Переглянути сумки в наявності
          </a>

          <div className="mt-16 text-center max-w-xl">
            <h4 className="font-playfair text-xl text-dark-brown font-semibold mb-3">
              Мрієш про власний дизайн?
            </h4>
            <p className="font-sans text-sm text-dark-brown/80 leading-relaxed">
              Ми відкриті до творчих експериментів і можемо створити унікальну композицію зі смоли спеціально для тебе. Просто напиши нам.
            </p>
          </div>
        </div>

      </div>

      {/* --- МОДАЛЬНЕ ВІКНО ДЛЯ INSTAGRAM --- */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-dark-brown/60 backdrop-blur-sm transition-opacity">
          <div className="bg-cream w-full max-w-md rounded-2xl shadow-2xl overflow-hidden relative animate-in fade-in zoom-in-95 duration-300">
            
            {/* Кнопка закриття */}
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

              {/* Блок з текстом */}
              <div className="bg-white p-4 rounded-lg border border-warm-beige mb-6">
                <p className="font-sans text-sm text-dark-brown whitespace-pre-wrap">{orderText}</p>
              </div>

              {/* Кнопка копіювання */}
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

              {/* Перехід в Інсту */}
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
  );
};

export default Order;