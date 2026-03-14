import Image from 'next/image';

const valuesData = [
  {
    title: 'Неповторний дизайн',
    description: 'Кожна сумка - унікальна композиція, яка ніколи не повторюється.',
    icon: '/icons/value-icon.png' // Виправив розширення на .png
  },
  {
    title: 'Ручна робота',
    description: 'Від першого ескізу до готового виробу — усе створюється вручну у Львові.',
    icon: '/icons/value-icon.png' // Виправив розширення на .png
  },
  {
    title: 'Створено в Україні',
    description: 'Бренд народжується в Україні — з локальних матеріалів, майстерності та любові до деталей.',
    icon: '/icons/value-icon.png' // Виправив розширення на .png
  },
  {
    title: 'Преміум матеріали',
    description: 'Натуральна шкіра, якісна фурнітура та міцна епоксидна смола для довговічного результату.',
    icon: '/icons/value-icon.png' // Виправив розширення на .png
  }
];

const Values = () => {
  return (
    // ПРИБРАВ /50 з bg-cream, щоб колір з ТЗ працював як треба
    <section className="w-full flex flex-col bg-cream">
      
      {/* 1. БЛОК З ІКОНКАМИ */}
      <div className="py-20 md:py-32 max-w-[1440px] mx-auto px-6 md:px-12 w-full">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-12 md:gap-12">
          
          {valuesData.map((item, index) => (
            <div key={index} className="flex flex-col items-center text-center group">
              <div className="relative w-12 h-12 md:w-16 md:h-16 mb-5 md:mb-8 transform transition-transform duration-500 group-hover:scale-110 group-hover:-translate-y-2">
                <Image 
                  src={item.icon} 
                  alt={item.title} 
                  fill 
                  className="object-contain"
                />
              </div>
              
              <h3 className="font-playfair text-sm md:text-lg font-bold text-burgundy mb-3 uppercase tracking-widest">
                {item.title}
              </h3>
              
              <p className="font-sans text-[12px] md:text-sm text-dark-brown/80 leading-relaxed max-w-[250px]">
                {item.description}
              </p>
            </div>
          ))}

        </div>
      </div>

      {/* 2. ШИРОКИЙ ТЕКСТОВИЙ БЛОК */}
      <div className="w-full bg-dark-brown py-8 md:py-8 px-6 flex justify-center items-center">
        <h2 className="font-playfair text-xl md:text-4xl lg:text-5xl text-cream font-medium tracking-wide max-w-4xl mx-auto text-center leading-snug md:leading-tight drop-shadow-sm">
          Кожна сумка Lépoxy Atelier унікальна — <br className="hidden md:block" /> 
          <span className="italic text-cream/90">як і жінка, яка її носить.</span>
        </h2>
      </div>

    </section>
  );
};

export default Values;