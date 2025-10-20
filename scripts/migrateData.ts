import { initializeApp } from 'firebase/app';
import { getFirestore, collection, doc, setDoc, serverTimestamp } from 'firebase/firestore';

// Firebase config (replace with your actual values from .env)
const firebaseConfig = {
  apiKey: process.env.VITE_FIREBASE_API_KEY,
  authDomain: process.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: process.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.VITE_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Mock places data transformed to new schema
const places = [
  {
    id: 'egyptian-museum',
    name: {
      'ar-EG': 'المتحف المصري',
      ar: 'المتحف المصري',
      en: 'Egyptian Museum',
      de: 'Ägyptisches Museum',
      ru: 'Египетский музей',
      uk: 'Єгипетський музей',
      zh: '埃及博物馆',
      fr: 'Musée égyptien',
      it: 'Museo egizio',
      es: 'Museo Egipcio',
    },
    description: {
      'ar-EG': 'اكتشف كنوز الفراعنة وتاريخ مصر العريق في واحد من أكبر المتاحف في العالم',
      en: 'Discover the treasures of the Pharaohs in one of the largest museums in the world',
    },
    category: 'culture',
    subcategories: ['museum', 'history', 'pharaonic'],
    location: { lat: 30.0478, lng: 31.2336, address: 'ميدان التحرير', city: 'Cairo' },
    priceLevel: 1,
    priceRange: '60-150 EGP',
    rating: 4.8,
    reviewCount: 2543,
    images: [],
    hours: { monday: '09:00-17:00', tuesday: '09:00-17:00', wednesday: '09:00-17:00' },
    phone: '+20 2 25796948',
    weatherPreference: ['indoor', 'cool', 'hot', 'rainy'],
    moodTags: ['educational', 'cultural', 'historical'],
    featured: true,
    verified: true,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  },
  {
    id: 'azhar-park',
    name: {
      'ar-EG': 'حديقة الأزهر',
      ar: 'حديقة الأزهر',
      en: 'Al-Azhar Park',
      de: 'Al-Azhar-Park',
      ru: 'Парк Аль-Азхар',
    },
    description: {
      'ar-EG': 'استمتع بجو هادي ومناظر خلابة في واحدة من أجمل الحدائق في القاهرة',
      en: 'Enjoy peaceful atmosphere and beautiful views in one of Cairo\'s most beautiful parks',
    },
    category: 'relax',
    subcategories: ['park', 'nature', 'family'],
    location: { lat: 30.0371, lng: 31.2629, address: 'صلاح سالم، الدراسة', city: 'Cairo' },
    priceLevel: 1,
    priceRange: '20-100 EGP',
    rating: 4.6,
    reviewCount: 1876,
    images: [],
    hours: {},
    weatherPreference: ['sunny', 'cool', 'pleasant'],
    moodTags: ['relaxing', 'family', 'peaceful'],
    featured: true,
    verified: true,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  },
  {
    id: 'khan-el-khalili',
    name: {
      'ar-EG': 'خان الخليلي',
      ar: 'خان الخليلي',
      en: 'Khan El-Khalili',
      de: 'Khan El-Khalili',
      ru: 'Хан эль-Халили',
    },
    description: {
      'ar-EG': 'تسوق في أشهر سوق تراثي وتذوق المأكولات المصرية الأصيلة',
      en: 'Shop at the famous traditional bazaar and taste authentic Egyptian food',
    },
    category: 'shopping',
    subcategories: ['bazaar', 'traditional', 'souvenirs'],
    location: { lat: 30.0475, lng: 31.2621, address: 'الحسين', city: 'Cairo' },
    priceLevel: 2,
    priceRange: '100-600 EGP',
    rating: 4.7,
    reviewCount: 3421,
    images: [],
    hours: {},
    weatherPreference: ['cool', 'pleasant'],
    moodTags: ['shopping', 'traditional', 'cultural'],
    featured: true,
    verified: true,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  },
  {
    id: 'nile-cruise',
    name: {
      'ar-EG': 'رحلة النيل',
      ar: 'رحلة النيل',
      en: 'Nile Cruise',
      de: 'Nilkreuzfahrt',
      ru: 'Круиз по Нилу',
    },
    description: {
      'ar-EG': 'جولة بالمركب في نهر النيل مع موسيقى حية وعشاء فاخر',
      en: 'Boat tour on the Nile River with live music and fine dining',
    },
    category: 'romantic',
    subcategories: ['cruise', 'dining', 'entertainment'],
    location: { lat: 30.0444, lng: 31.2357, address: 'كورنيش النيل', city: 'Cairo' },
    priceLevel: 3,
    priceRange: '200-800 EGP',
    rating: 4.9,
    reviewCount: 1234,
    images: [],
    hours: {},
    weatherPreference: ['cool', 'pleasant', 'evening'],
    moodTags: ['romantic', 'luxury', 'entertainment'],
    featured: true,
    verified: true,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  },
  {
    id: 'dream-park',
    name: {
      'ar-EG': 'دريم بارك',
      ar: 'دريم بارك',
      en: 'Dream Park',
      de: 'Dream Park',
      ru: 'Дрим Парк',
    },
    description: {
      'ar-EG': 'أكبر مدينة ملاهي في مصر مع ألعاب مثيرة لجميع الأعمار',
      en: 'Egypt\'s largest amusement park with thrilling rides for all ages',
    },
    category: 'adventure',
    subcategories: ['amusement', 'rides', 'family'],
    location: { lat: 30.0131, lng: 31.0147, address: 'طريق الواحات، 6 أكتوبر', city: 'Giza' },
    priceLevel: 2,
    priceRange: '200-400 EGP',
    rating: 4.4,
    reviewCount: 4321,
    images: [],
    hours: {},
    weatherPreference: ['sunny', 'cool', 'pleasant'],
    moodTags: ['adventure', 'family', 'fun'],
    featured: true,
    verified: true,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  },
];

// Achievements data
const achievements = [
  {
    id: 'cairo-explorer',
    name: {
      'ar-EG': 'مستكشف القاهرة',
      ar: 'مستكشف القاهرة',
      en: 'Cairo Explorer',
    },
    description: {
      'ar-EG': 'زر 5 أماكن في القاهرة',
      en: 'Visit 5 places in Cairo',
    },
    icon: '🗺️',
    requirement: { type: 'visits', value: 5 },
    points: 100,
    order: 1,
  },
  {
    id: 'culture-lover',
    name: {
      'ar-EG': 'محب الثقافة',
      ar: 'محب الثقافة',
      en: 'Culture Lover',
    },
    description: {
      'ar-EG': 'زر 3 أماكن ثقافية',
      en: 'Visit 3 cultural places',
    },
    icon: '🏛️',
    requirement: { type: 'category_visits', value: 3, condition: 'culture' },
    points: 75,
    order: 2,
  },
  {
    id: 'adventurer',
    name: {
      'ar-EG': 'مغامر',
      ar: 'مغامر',
      en: 'Adventurer',
    },
    description: {
      'ar-EG': 'زر مكانين مغامرة',
      en: 'Visit 2 adventure places',
    },
    icon: '🎢',
    requirement: { type: 'category_visits', value: 2, condition: 'adventure' },
    points: 50,
    order: 3,
  },
  {
    id: 'food-expert',
    name: {
      'ar-EG': 'خبير الطعام',
      ar: 'خبير الطعام',
      en: 'Food Expert',
    },
    description: {
      'ar-EG': 'زر 5 مطاعم',
      en: 'Visit 5 restaurants',
    },
    icon: '🍽️',
    requirement: { type: 'category_visits', value: 5, condition: 'food' },
    points: 100,
    order: 4,
  },
  {
    id: 'shopping-king',
    name: {
      'ar-EG': 'ملك التسوق',
      ar: 'ملك التسوق',
      en: 'Shopping King',
    },
    description: {
      'ar-EG': 'زر 3 أماكن تسوق',
      en: 'Visit 3 shopping places',
    },
    icon: '🛍️',
    requirement: { type: 'category_visits', value: 3, condition: 'shopping' },
    points: 75,
    order: 5,
  },
  {
    id: 'nature-lover',
    name: {
      'ar-EG': 'عاشق الطبيعة',
      ar: 'عاشق الطبيعة',
      en: 'Nature Lover',
    },
    description: {
      'ar-EG': 'زر 3 حدائق أو أماكن طبيعية',
      en: 'Visit 3 parks or nature spots',
    },
    icon: '🌳',
    requirement: { type: 'category_visits', value: 3, condition: 'relax' },
    points: 75,
    order: 6,
  },
];

// Migration function
async function migrateData() {
  console.log('Starting data migration...');

  try {
    // Migrate places
    console.log('Migrating places...');
    for (const place of places) {
      const placeRef = doc(db, 'places', place.id);
      await setDoc(placeRef, place);
      console.log(`✓ Migrated place: ${place.name['ar-EG']}`);
    }

    // Migrate achievements
    console.log('\nMigrating achievements...');
    for (const achievement of achievements) {
      const achievementRef = doc(db, 'achievements', achievement.id);
      await setDoc(achievementRef, achievement);
      console.log(`✓ Migrated achievement: ${achievement.name['ar-EG']}`);
    }

    console.log('\n✅ Migration completed successfully!');
  } catch (error) {
    console.error('❌ Migration failed:', error);
    throw error;
  }
}

// Run migration
migrateData()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
