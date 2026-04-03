"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import BagDetailsModal from '@/components/bags/BagDetailsModal';

export default function BagsPage() {
  const [bags, setBags] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedBag, setSelectedBag] = useState<any | null>(null);

  // 1. ЗАВАНТАЖЕННЯ ДАНИХ З API
  useEffect(() => {
    const fetchBags = async () => {
      try {
        const res = await fetch('/api/bags');
        if (res.ok) {
          const data = await res.json();
          // Показуємо тільки ті, що реально в наявності
          const available = data.filter((bag: any) => bag.isAvailable === true);
          setBags(available);
        }
      } catch (error) {
        console.error('Помилка завантаження сумок:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBags();
  }, []);

  return (
    <div className="bg-cream min-h-screen pt-28 md:pt-48 pb-12 md:pb-16 flex flex-col items-center">
      <div className="max-w-[1440px] w-full mx-auto px-4 md:px-12">
        
        {/* ЗАГОЛОВОК */}
        <header className="text-center mb-10 md:mb-12">
          <h1 className="font-playfair text-3xl md:text-5xl text-burgundy font-bold mb-3 md:mb-4 uppercase tracking-widest drop-shadow-sm">
            В наявності
          </h1>
          <p className="text-dark-brown/70 max-w-xl mx-auto font-sans text-sm md:text-base font-medium leading-relaxed">
            Кожна сумка — це ручна робота в єдиному екземплярі. <br className="hidden md:block" /> 
            Оберіть ту, що відгукується вашому серцю.
          </p>
        </header>

        {/* СТАН ЗАВАНТАЖЕННЯ */}
        {isLoading ? (
          <div className="flex justify-center items-center py-20">
            <div className="text-burgundy animate-pulse tracking-widest uppercase text-sm font-bold">
              Оновлюємо колекцію...
            </div>
          </div>
        ) : bags.length === 0 ? (
          <div className="text-center py-20 text-dark-brown/50 italic">
            Наразі всі вироби знайшли своїх власниць. <br /> Слідкуйте за оновленнями!
          </div>
        ) : (
          /* СІТКА СУМОК */
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-8">
            {bags.map((bag) => (
              <div 
                key={bag.id} 
                className="group cursor-pointer flex flex-col"
                onClick={() => setSelectedBag(bag)}
              >
                {/* ФОТО З ЕФЕКТОМ МАСШТАБУВАННЯ */}
                <div className="relative w-full aspect-[4/5] overflow-hidden rounded-sm bg-white shadow-sm transition-all duration-500 group-hover:shadow-lg group-hover:-translate-y-1 border border-dark-brown/5 flex items-center justify-center">
                  {bag.images && bag.images.length > 0 ? (
                    <Image 
                      src={bag.images[0]} 
                      alt={bag.name} 
                      fill 
                      className="object-contain transition-transform duration-700 scale-90 group-hover:scale-99" 
                    />
                  ) : (
                    <div className="text-neutral-300 text-xs">Фото відсутнє</div>
                  )}
                </div>
                
                {/* ІНФОРМАЦІЯ ПІД СУМКОЮ */}
                <div className="mt-3 md:mt-4 flex justify-between items-start px-1 relative z-10 bg-cream pt-1">
                  <div className="flex flex-col">
                    <h3 className="font-playfair text-sm md:text-lg font-bold text-dark-brown group-hover:text-burgundy transition-colors uppercase leading-tight">
                      {bag.name}
                    </h3>
                    <p className="text-[9px] md:text-xs text-dark-brown/50 uppercase tracking-widest mt-1">
                      {bag.model}
                    </p>
                  </div>
                  <p className="font-sans text-sm md:text-base font-semibold text-burgundy ml-2 whitespace-nowrap">
                    {bag.price} ₴
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* МОДАЛКА (Передаємо дані сумки з бази) */}
      {selectedBag && (
        <BagDetailsModal bag={selectedBag} onClose={() => setSelectedBag(null)} />
      )}
    </div>
  );
}