export interface Bag {
  id: number;
  name: string;
  price: string;
  description: string;
  model: string;
  dimensions: string;
  collection: string; // Поле, яке ми використовуємо
  color: string;
  images: string[];
}

export const AVAILABLE_BAGS: Bag[] = [
  {
    id: 1,
    name: 'Assymetry',
    price: '4 300 ₴',
    model: 'Assymetry',
    dimensions: '20 x 15 x 7 см',
    collection: 'Мрія', // Дані є
    color: 'Чорна',
    description: 'Глибока, містична та абсолютно унікальна, а сам малюнок нагадує нічне зоряне небо. Щільна натуральна шкіра глибокого чорного кольору, срібна фурнітура.',
    images: [
      '/images/available/bag1_.webp',
      '/images/available/bag1_alt1_.webp',
      '/images/available/bag1_alt2_.webp',
    ]
  },
  // {
  //   id: 2,
  //   name: 'Midnight Lavender',
  //   price: '5 200 ₴',
  //   model: 'Minimalism',
  //   dimensions: '18 x 18 x 6 см',
  //   collection: 'Тиша', // ЗАМІНЕНО з materials
  //   color: 'Black',
  //   description: 'Витончена квадратна модель. Глибокий чорний колір шкіри підкреслює тендітність лаванди, зафіксованої у глянцевій смолі.',
  //   images: [
  //     '/images/available/bag2.jpg',
  //     '/images/available/bag2_alt1.jpg',
  //     '/images/available/bag2_alt2.jpg',
  //   ]
  // },
  // {
  //   id: 3,
  //   name: 'Azure Dream',
  //   price: '4 800 ₴',
  //   model: 'Asymmetry',
  //   dimensions: '22 x 14 x 8 см',
  //   collection: 'Свобода', // ЗАМІНЕНО з materials
  //   color: 'Dark Blue',
  //   description: 'Смілива асиметрична форма для тих, хто любить виділятися. Блакитні квіти у прозорій вставці нагадують чисте літнє небо.',
  //   images: [
  //     '/images/available/bag3.jpg',
  //     '/images/available/bag3_alt1.jpg',
  //     '/images/available/bag3_alt2.jpg',
  //   ]
  // },
  // {
  //   id: 4,
  //   name: 'Golden Autumn',
  //   price: '6 100 ₴',
  //   model: 'Old School',
  //   dimensions: '25 x 18 x 10 см',
  //   collection: 'Тепло', // ЗАМІНЕНО з materials
  //   color: 'Chocolate',
  //   description: 'Містка модель у вінтажному стилі. Композиція із золотою поталлю та справжніми колосками додає образу тепла та затишку.',
  //   images: [
  //     '/images/available/bag4.jpg',
  //     '/images/available/bag4_alt1.jpg',
  //     '/images/available/bag4_alt2.jpg',
  //   ]
  // },
  // {
  //   id: 5,
  //   name: 'Emerald Spring',
  //   price: '4 300 ₴',
  //   model: 'Classic',
  //   dimensions: '20 x 15 x 7 см',
  //   collection: 'Ніжність', // ЗАМІНЕНО з materials
  //   color: 'White',
  //   description: 'Білосніжна класика. Легкість рожевої гіпсофіли у поєднанні зі світлою шкірою робить цю сумку ідеальним аксесуаром для літніх вечорів.',
  //   images: [
  //     '/images/available/bag5.jpg',
  //     '/images/available/bag5_alt1.jpg',
  //     '/images/available/bag5_alt2.jpg',
  //   ]
  // },
  // {
  //   id: 6,
  //   name: 'Forest Silence',
  //   price: '5 500 ₴',
  //   model: 'Minimalism',
  //   dimensions: '18 x 18 x 6 см',
  //   collection: 'Сила', // ЗАМІНЕНО з materials
  //   color: 'Chocolate',
  //   description: 'Унікальна композиція, що переносить у глибину карпатського лісу. Справжній мох та маленька папороть назавжди застигли у кришталевій смолі.',
  //   images: [
  //     '/images/available/bag6.jpg',
  //     '/images/available/bag6_alt1.jpg',
  //     '/images/available/bag6_alt2.jpg',
  //   ]
  // }
];