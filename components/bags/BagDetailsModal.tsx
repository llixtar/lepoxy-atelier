"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';

interface Props {
  bag: any; // Використовуємо any або створимо інтерфейс, бо ми відмовилися від хардкоду
  onClose: () => void;
}

const BagDetailsModal = ({ bag, onClose }: Props) => {
  // Встановлюємо перше фото головним при відкритті
  const [mainImage, setMainImage] = useState(bag.images?.[0] || '');

  // Оновлюємо головне фото, якщо раптом змінився об'єкт bag
  useEffect(() => {
    if (bag.images?.length > 0) {
      setMainImage(bag.images[0]);
    }
  }, [bag]);

  const telegramLink = `https://t.me/llixtar?text=${encodeURIComponent(
    `Вітаю! Мене зацікавила сумка ${bag.name} (${bag.price} ₴). Чи є вона в наявності?`
  )}`;

  return (
    <div 
      className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-dark-brown/80 backdrop-blur-md animate-in fade-in duration-300" 
      onClick={onClose}
    >
      <div 
        className="bg-cream w-full max-w-5xl rounded-2xl overflow-hidden shadow-2xl relative flex flex-col md:flex-row max-h-[90vh] animate-in zoom-in-95 duration-300" 
        onClick={e => e.stopPropagation()}
      >
        
        {/* Кнопка закриття */}
        <button 
          onClick={onClose} 
          className="absolute top-4 right-4 z-10 p-2 bg-white/50 rounded-full hover:bg-white transition-colors"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#2A1F1C" strokeWidth="2">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>

        {/* ЛІВА ЧАСТИНА: ГАЛЕРЕЯ */}
        <div className="w-full md:w-1/2 p-6 flex flex-col gap-4 bg-white/50 border-r border-dark-brown/5">
          <div className="relative aspect-square rounded-xl overflow-hidden bg-white shadow-inner flex items-center justify-center">
            {mainImage ? (
              <Image 
                src={mainImage} 
                alt={bag.name} 
                fill 
                className="object-contain transition-all duration-500 scale-99" 
              />
            ) : (
              <div className="text-neutral-300 text-xs">Фото відсутнє</div>
            )}
          </div>

          {/* Додаткові фото */}
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
            {bag.images?.map((img: string, idx: number) => (
              <button 
                key={idx} 
                onClick={() => setMainImage(img)} 
                className={`relative w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden bg-white border-2 transition-all flex items-center justify-center ${
                  mainImage === img ? 'border-burgundy scale-95' : 'border-transparent opacity-70'
                }`}
              >
                <Image src={img} alt={`${bag.name} view ${idx}`} fill className="object-contain scale-99" />
              </button>
            ))}
          </div>
        </div>

        {/* ПРАВА ЧАСТИНА: ІНФО */}
        <div className="w-full md:w-1/2 p-8 md:p-12 overflow-y-auto bg-white/30 flex flex-col">
          <h2 className="font-playfair text-3xl md:text-4xl text-burgundy font-bold mb-2 uppercase">
            {bag.name}
          </h2>
          <p className="font-sans text-2xl text-dark-brown font-medium mb-8">
            {bag.price} ₴
          </p>
          
          <div className="space-y-6 mb-10 flex-grow">
            <div>
              <h4 className="text-[10px] uppercase tracking-widest text-burgundy font-bold mb-1">Опис</h4>
              <p className="font-sans text-sm md:text-base text-dark-brown leading-relaxed font-medium">
                {bag.description}
              </p>
            </div>
            
            <div className="grid grid-cols-2 gap-4 border-t border-burgundy/10 pt-6">
              <div>
                <h4 className="text-[10px] uppercase tracking-widest text-dark-brown/50 font-bold">Модель</h4>
                <p className="font-playfair text-base text-dark-brown font-bold uppercase">{bag.model}</p>
              </div>
              <div>
                <h4 className="text-[10px] uppercase tracking-widest text-dark-brown/50 font-bold">Розміри</h4>
                <p className="text-sm text-dark-brown font-medium">{bag.dimensions}</p>
              </div>
              <div>
                <h4 className="text-[10px] uppercase tracking-widest text-dark-brown/50 font-bold">Колекція</h4>
                <p className="text-sm text-dark-brown font-medium">{bag.collection}</p>
              </div>
              <div>
                <h4 className="text-[10px] uppercase tracking-widest text-dark-brown/50 font-bold">Колір</h4>
                <p className="text-sm text-dark-brown font-medium">{bag.color}</p>
              </div>
            </div>
          </div>

          <a 
            href={telegramLink} 
            target="_blank" 
            rel="noopener noreferrer"
            className="block w-full py-4 mt-auto bg-burgundy text-cream text-center font-bold uppercase tracking-widest hover:bg-dark-brown transition-all rounded-sm shadow-lg active:scale-95"
          >
            Купити зараз
          </a>
        </div>
      </div>
    </div>
  );
};

export default BagDetailsModal;