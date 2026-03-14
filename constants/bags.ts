export interface Bag {
  id: number;
  name: string;
  price: string;
  description: string;
  model: string;
  dimensions: string;
  materials: string;
  color: string;
  images: string[];
}

export const AVAILABLE_BAGS: Bag[] = [
  {
    id: 1,
    name: 'Classic Peony',
    price: '4 500 ₴',
    model: 'Classic',
    dimensions: '20 x 15 x 7 см',
    materials: 'Натуральна шкіра, епоксидна смола, сухоцвіти півонії',
    color: 'Burgundy',
    description: 'Елегантна сумка через плече. Дизайн із застиглими пелюстками півонії створює відчуття вічної весни та ніжності.',
    images: [
      '/images/available/bag1.jpg',
      '/images/available/bag1_alt1.jpg',
      '/images/available/bag1_alt2.jpg',
    ]
  },
  {
    id: 2,
    name: 'Midnight Lavender',
    price: '5 200 ₴',
    model: 'Minimalism',
    dimensions: '18 x 18 x 6 см',
    materials: 'Чорна італійська шкіра, епоксидна смола, гілочки лаванди',
    color: 'Black',
    description: 'Витончена квадратна модель. Глибокий чорний колір шкіри підкреслює тендітність лаванди, зафіксованої у глянцевій смолі.',
    images: [
      '/images/available/bag2.jpg',
      '/images/available/bag2_alt1.jpg',
      '/images/available/bag2_alt2.jpg',
    ]
  },
  {
    id: 3,
    name: 'Azure Dream',
    price: '4 800 ₴',
    model: 'Asymmetry',
    dimensions: '22 x 14 x 8 см',
    materials: 'Натуральна шкіра, епоксидна смола, пелюстки гортензії',
    color: 'Dark Blue',
    description: 'Смілива асиметрична форма для тих, хто любить виділятися. Блакитні квіти у прозорій вставці нагадують чисте літнє небо.',
    images: [
      '/images/available/bag3.jpg',
      '/images/available/bag3_alt1.jpg',
      '/images/available/bag3_alt2.jpg',
    ]
  },
  {
    id: 4,
    name: 'Golden Autumn',
    price: '6 100 ₴',
    model: 'Old School',
    dimensions: '25 x 18 x 10 см',
    materials: 'Шкіра кольору Chocolate, смола, золота поталь та колоски',
    color: 'Chocolate',
    description: 'Містка модель у вінтажному стилі. Композиція із золотою поталлю та справжніми колосками додає образу тепла та затишку.',
    images: [
      '/images/available/bag4.jpg',
      '/images/available/bag4_alt1.jpg',
      '/images/available/bag4_alt2.jpg',
    ]
  },
  {
    id: 5,
    name: 'Emerald Spring',
    price: '4 300 ₴',
    model: 'Classic',
    dimensions: '20 x 15 x 7 см',
    materials: 'Натуральна шкіра, епоксидна смола, рожева гіпсофіла',
    color: 'White',
    description: 'Білосніжна класика. Легкість рожевої гіпсофіли у поєднанні зі світлою шкірою робить цю сумку ідеальним аксесуаром для літніх вечорів.',
    images: [
      '/images/available/bag5.jpg',
      '/images/available/bag5_alt1.jpg',
      '/images/available/bag5_alt2.jpg',
    ]
  },
  {
    id: 6,
    name: 'Forest Silence',
    price: '5 500 ₴',
    model: 'Minimalism',
    dimensions: '18 x 18 x 6 см',
    materials: 'Шкіра преміум-класу, епоксидна смола, лісовий мох та папороть',
    color: 'Chocolate',
    description: 'Унікальна композиція, що переносить у глибину карпатського лісу. Справжній мох та маленька папороть назавжди застигли у кришталевій смолі.',
    images: [
      '/images/available/bag6.jpg',
      '/images/available/bag6_alt1.jpg',
      '/images/available/bag6_alt2.jpg',
    ]
  }
];