import { Place, Event } from '@/types';
import egyptianMuseum from "@/assets/places/egyptian-museum.jpg";
import khanKhalili from "@/assets/places/khan-el-khalili.jpg";
import pyramids from "@/assets/places/pyramids.jpg";
import azharPark from "@/assets/places/azhar-park.jpg";
import restaurant from "@/assets/places/restaurant.jpg";
import cairoTower from "@/assets/places/cairo-tower.jpg";

export const mockPlaces: Place[] = [
  {
    id: '1',
    name: 'المتحف المصري',
    nameEn: 'Egyptian Museum',
    category: 'culture',
    description: 'اكتشف كنوز الفراعنة وتاريخ مصر العريق في واحد من أكبر المتاحف في العالم. يضم أكثر من 120 ألف قطعة أثرية نادرة.',
    rating: 4.8,
    reviewCount: 2543,
    priceLevel: 'low',
    priceRange: '60-150 جنيه',
    distance: 2.5,
    location: {
      lat: 30.0478,
      lng: 31.2336,
      address: 'ميدان التحرير',
      city: 'القاهرة'
    },
    images: [
      egyptianMuseum
    ],
    hours: {
      open: '09:00',
      close: '17:00',
      days: 'يومياً'
    },
    phone: '+20 2 25796948',
    activities: ['جولات إرشادية', 'ورش عمل تعليمية', 'معارض خاصة'],
    isFeatured: true,
    tags: ['تاريخي', 'ثقافي', 'تعليمي']
  },
  {
    id: '2',
    name: 'حديقة الأزهر',
    nameEn: 'Al-Azhar Park',
    category: 'relax',
    description: 'استمتع بجو هادي ومناظر خلابة في واحدة من أجمل الحدائق في القاهرة مع إطلالة رائعة على المدينة القديمة.',
    rating: 4.6,
    reviewCount: 1876,
    priceLevel: 'low',
    priceRange: '20-100 جنيه',
    distance: 3.2,
    location: {
      lat: 30.0371,
      lng: 31.2629,
      address: 'صلاح سالم، الدراسة',
      city: 'القاهرة'
    },
    images: [azharPark],
    hours: {
      open: '09:00',
      close: '22:00',
      days: 'يومياً'
    },
    activities: ['نزهات', 'مطاعم', 'إطلالات'],
    isFeatured: true,
    tags: ['طبيعة', 'استرخاء', 'عائلي']
  },
  {
    id: '3',
    name: 'خان الخليلي',
    nameEn: 'Khan El-Khalili',
    category: 'shopping',
    description: 'تسوق في أشهر سوق تراثي وتذوق المأكولات المصرية الأصيلة. تجربة تسوق فريدة في قلب القاهرة التاريخية.',
    rating: 4.7,
    reviewCount: 3421,
    priceLevel: 'medium',
    priceRange: '100-600 جنيه',
    distance: 1.8,
    location: {
      lat: 30.0475,
      lng: 31.2621,
      address: 'الحسين',
      city: 'القاهرة'
    },
    images: [khanKhalili],
    hours: {
      open: '10:00',
      close: '23:00',
      days: 'يومياً'
    },
    activities: ['تسوق', 'مقاهي شعبية', 'حرف يدوية'],
    isFeatured: true,
    tags: ['تسوق', 'تراثي', 'تقليدي']
  },
  {
    id: '4',
    name: 'رحلة النيل',
    nameEn: 'Nile Cruise',
    category: 'romantic',
    description: 'جولة بالمركب في نهر النيل مع موسيقى حية وعشاء فاخر. تجربة رومانسية لا تُنسى.',
    rating: 4.9,
    reviewCount: 1234,
    priceLevel: 'high',
    priceRange: '200-800 جنيه',
    distance: 4.5,
    location: {
      lat: 30.0444,
      lng: 31.2357,
      address: 'كورنيش النيل',
      city: 'القاهرة'
    },
    images: [cairoTower],
    hours: {
      open: '19:00',
      close: '23:00',
      days: 'يومياً'
    },
    activities: ['عشاء', 'موسيقى حية', 'إطلالات'],
    isFeatured: true,
    tags: ['رومانسي', 'فاخر', 'ترفيهي']
  },
  {
    id: '5',
    name: 'سيتي ستارز',
    nameEn: 'City Stars',
    category: 'shopping',
    description: 'تسوق وترفيه في أكبر مول تجاري في مصر مع سينما ومطاعم متنوعة. تجربة تسوق عصرية شاملة.',
    rating: 4.5,
    reviewCount: 5678,
    priceLevel: 'medium',
    priceRange: '150-800 جنيه',
    distance: 8.3,
    location: {
      lat: 30.0728,
      lng: 31.3497,
      address: 'عمر بن الخطاب، مدينة نصر',
      city: 'القاهرة'
    },
    images: ['🏬'],
    hours: {
      open: '10:00',
      close: '24:00',
      days: 'يومياً'
    },
    activities: ['تسوق', 'سينما', 'مطاعم', 'ألعاب'],
    tags: ['تسوق', 'عائلي', 'ترفيهي']
  },
  {
    id: '6',
    name: 'قلعة صلاح الدين',
    nameEn: 'Salah El-Din Citadel',
    category: 'culture',
    description: 'زور قلعة تاريخية عريقة واستمتع بإطلالة رائعة على القاهرة. معلم تاريخي يعود للعصر الأيوبي.',
    rating: 4.7,
    reviewCount: 2987,
    priceLevel: 'low',
    priceRange: '80-200 جنيه',
    distance: 5.2,
    location: {
      lat: 30.0296,
      lng: 31.2599,
      address: 'القلعة، مصر القديمة',
      city: 'القاهرة'
    },
    images: [pyramids],
    hours: {
      open: '08:00',
      close: '17:00',
      days: 'يومياً'
    },
    activities: ['جولات تاريخية', 'تصوير', 'متاحف'],
    tags: ['تاريخي', 'ثقافي', 'سياحي']
  },
  {
    id: '7',
    name: 'دريم بارك',
    nameEn: 'Dream Park',
    category: 'adventure',
    description: 'أكبر مدينة ملاهي في مصر مع ألعاب مثيرة لجميع الأعمار. مغامرة ممتعة للعائلة بأكملها.',
    rating: 4.4,
    reviewCount: 4321,
    priceLevel: 'medium',
    priceRange: '200-400 جنيه',
    distance: 15.7,
    location: {
      lat: 30.0131,
      lng: 31.0147,
      address: 'طريق الواحات، 6 أكتوبر',
      city: 'الجيزة'
    },
    images: ['🎢'],
    hours: {
      open: '10:00',
      close: '22:00',
      days: 'الخميس-الجمعة'
    },
    activities: ['ألعاب مائية', 'أفعوانيات', 'مطاعم'],
    isFeatured: true,
    tags: ['مغامرة', 'عائلي', 'ترفيهي']
  },
  {
    id: '8',
    name: 'مطعم ابو السيد',
    nameEn: 'Abou El Sid',
    category: 'food',
    description: 'تذوق أشهى المأكولات المصرية الأصيلة في أجواء تراثية فاخرة. تجربة طعام مصرية أصيلة.',
    rating: 4.8,
    reviewCount: 1567,
    priceLevel: 'medium',
    priceRange: '150-400 جنيه',
    distance: 6.1,
    location: {
      lat: 30.0626,
      lng: 31.2197,
      address: 'الزمالك',
      city: 'القاهرة'
    },
    images: [restaurant],
    hours: {
      open: '12:00',
      close: '01:00',
      days: 'يومياً'
    },
    activities: ['أكل مصري', 'جلسات خارجية', 'ديكور تراثي'],
    tags: ['طعام', 'تراثي', 'فاخر']
  },
  {
    id: '9',
    name: 'أكوا بارك',
    nameEn: 'Aqua Park',
    category: 'family',
    description: 'مدينة ألعاب مائية ضخمة مع منزلقات مثيرة وحمامات سباحة. متعة صيفية لا تُنسى.',
    rating: 4.3,
    reviewCount: 2134,
    priceLevel: 'medium',
    priceRange: '150-300 جنيه',
    distance: 12.4,
    location: {
      lat: 30.1219,
      lng: 31.3547,
      address: 'طريق السويس',
      city: 'القاهرة'
    },
    images: ['🏊'],
    hours: {
      open: '10:00',
      close: '18:00',
      days: 'مايو-سبتمبر'
    },
    activities: ['منزلقات مائية', 'حمامات سباحة', 'كافيتريا'],
    tags: ['عائلي', 'مائي', 'صيفي']
  },
  {
    id: '10',
    name: 'كافيه على النيل',
    nameEn: 'Nile Café',
    category: 'romantic',
    description: 'كافيه رومانسي مطل على النيل مع أجواء هادئة ومشروبات مميزة. المكان المثالي للاسترخاء.',
    rating: 4.6,
    reviewCount: 987,
    priceLevel: 'medium',
    priceRange: '100-300 جنيه',
    distance: 3.8,
    location: {
      lat: 30.0444,
      lng: 31.2296,
      address: 'كورنيش المعادي',
      city: 'القاهرة'
    },
    images: ['☕'],
    hours: {
      open: '14:00',
      close: '02:00',
      days: 'يومياً'
    },
    activities: ['قهوة متخصصة', 'إطلالة نيل', 'موسيقى هادئة'],
    tags: ['رومانسي', 'هادئ', 'كافيه']
  }
];

export const mockEvents: Event[] = [
  {
    id: '1',
    title: 'عرض خاص في سيتي ستارز',
    placeName: 'سيتي ستارز',
    placeId: '5',
    type: 'discount',
    description: 'خصم 30% على جميع المشتريات',
    discount: 30,
    validUntil: '2025-11-30',
    image: '🎁'
  },
  {
    id: '2',
    title: 'حفل موسيقي في دار الأوبرا',
    placeName: 'دار الأوبرا',
    placeId: 'opera-1',
    type: 'limited',
    description: 'تذاكر محدودة - احجز الآن',
    validUntil: '2025-11-15',
    image: '🎭'
  },
  {
    id: '3',
    title: 'جولة مجانية في المتحف المصري',
    placeName: 'المتحف المصري',
    placeId: '1',
    type: 'free',
    description: 'جولات إرشادية مجانية كل يوم سبت',
    validUntil: '2025-12-31',
    image: '🎟️'
  }
];
