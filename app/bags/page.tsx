"use client";
import React, { useState } from 'react';
import Image from 'next/image';
import { AVAILABLE_BAGS, Bag } from '@/constants/bags';
import BagDetailsModal from '@/components/bags/BagDetailsModal';

export default function BagsPage() {
  const [selectedBag, setSelectedBag] = useState<Bag | null>(null);

  return (
    // Збільшено pt-28 (мобілка) та pt-48 (десктоп), щоб хедер не перекривав заголовок!
    // Зменшено pb-20 до pb-12/16 для компактності
    <div className="bg-cream min-h-screen pt-28 md:pt-48 pb-12 md:pb-16 flex flex-col items-center">
      <div className="max-w-[1440px] w-full mx-auto px-4 md:px-12">
        
        {/* ЗАГОЛОВОК (Зменшено mb та шрифти) */}
        <header className="text-center mb-10 md:mb-12">
          <h1 className="font-playfair text-3xl md:text-5xl text-burgundy font-bold mb-3 md:mb-4 uppercase tracking-widest drop-shadow-sm">
            В наявності
          </h1>
          <p className="text-dark-brown/70 max-w-xl mx-auto font-sans text-sm md:text-base">
            Кожна сумка — це ручна робота в єдиному екземплярі. Оберіть ту, що відгукується вашому серцю.
          </p>
        </header>

        {/* СІТКА (Тепер 2 колонки на мобілці, менші відступи gap-3/gap-8) */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-8">
          {AVAILABLE_BAGS.map((bag) => (
            <div 
              key={bag.id} 
              className="group cursor-pointer flex flex-col"
              onClick={() => setSelectedBag(bag)}
            >
              <div className="relative w-full aspect-[4/5] overflow-hidden rounded-sm bg-white shadow-sm transition-all duration-500 group-hover:shadow-lg group-hover:-translate-y-1 border border-dark-brown/5">
                <Image 
                  src={bag.images[0]} 
                  alt={bag.name} 
                  fill 
                  className="object-cover transition-transform duration-700 group-hover:scale-110" 
                />
                <div className="absolute inset-0 bg-burgundy/0 group-hover:bg-burgundy/5 transition-colors duration-500" />
              </div>
              
              {/* ІНФОРМАЦІЯ ПІД СУМКОЮ (Ближче до фото, менші шрифти) */}
              <div className="mt-3 md:mt-4 flex justify-between items-start px-1">
                <div className="flex flex-col">
                  <h3 className="font-playfair text-sm md:text-lg font-bold text-dark-brown group-hover:text-burgundy transition-colors uppercase leading-tight">
                    {bag.name}
                  </h3>
                  <p className="text-[9px] md:text-xs text-dark-brown/50 uppercase tracking-widest mt-1">
                    {bag.model}
                  </p>
                </div>
                <p className="font-sans text-sm md:text-base font-semibold text-burgundy ml-2 whitespace-nowrap">
                  {bag.price}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* МОДАЛКА */}
      {selectedBag && (
        <BagDetailsModal bag={selectedBag} onClose={() => setSelectedBag(null)} />
      )}
    </div>
  );
}