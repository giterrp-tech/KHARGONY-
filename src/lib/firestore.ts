import {
  doc,
  collection,
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
  query,
  where,
  orderBy,
  limit,
  onSnapshot,
  increment,
  arrayUnion,
  arrayRemove,
  serverTimestamp,
  Timestamp,
  GeoPoint,
} from 'firebase/firestore';
import { db } from './firebase';

// Types
export interface UserProfile {
  uid: string;
  email: string | null;
  displayName: string;
  photoURL: string | null;
  createdAt: Timestamp;
  language: string;
  points: number;
  level: number;
  visits: number;
  achievements: string[];
  favorites: string[];
  location: {
    city: string;
    country: string;
    lastUpdated: Timestamp;
  };
}

export interface Place {
  id: string;
  name: Record<string, string>; // {ar-EG: '...', en: '...', ...}
  description: Record<string, string>;
  category: string;
  subcategories: string[];
  location: {
    lat: number;
    lng: number;
    address: string;
    city: string;
  };
  priceLevel: number; // 1-4
  priceRange: string;
  rating: number;
  reviewCount: number;
  images: string[];
  hours: Record<string, string>;
  phone?: string;
  website?: string;
  weatherPreference: string[]; // ['sunny', 'cool', 'indoor', etc.]
  moodTags: string[]; // ['romantic', 'adventure', 'family', etc.]
  featured: boolean;
  verified: boolean;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

export interface Achievement {
  id: string;
  name: Record<string, string>;
  description: Record<string, string>;
  icon: string;
  requirement: {
    type: 'visits' | 'category_visits' | 'points';
    value: number;
    condition?: string; // e.g., 'culture', 'adventure'
  };
  points: number;
  order: number;
}

export interface VisitHistory {
  id?: string;
  userId: string;
  placeId: string;
  visitedAt: Timestamp;
  rating?: number;
  notes?: string;
}

// User Profile Functions
export const getUserProfile = async (userId: string): Promise<UserProfile | null> => {
  try {
    const userRef = doc(db, 'users', userId);
    const userSnap = await getDoc(userRef);
    if (userSnap.exists()) {
      return userSnap.data() as UserProfile;
    }
    return null;
  } catch (error) {
    console.error('Error getting user profile:', error);
    throw error;
  }
};

export const updateUserProfile = async (
  userId: string,
  updates: Partial<UserProfile>
): Promise<void> => {
  try {
    const userRef = doc(db, 'users', userId);
    await updateDoc(userRef, { ...updates, updatedAt: serverTimestamp() });
  } catch (error) {
    console.error('Error updating user profile:', error);
    throw error;
  }
};

export const addPointsToUser = async (userId: string, points: number): Promise<void> => {
  try {
    const userRef = doc(db, 'users', userId);
    await updateDoc(userRef, {
      points: increment(points),
      level: increment(Math.floor(points / 500)), // Level up every 500 points
    });
  } catch (error) {
    console.error('Error adding points:', error);
    throw error;
  }
};

export const unlockAchievement = async (
  userId: string,
  achievementId: string,
  points: number
): Promise<void> => {
  try {
    const userRef = doc(db, 'users', userId);
    await updateDoc(userRef, {
      achievements: arrayUnion(achievementId),
      points: increment(points),
    });
  } catch (error) {
    console.error('Error unlocking achievement:', error);
    throw error;
  }
};

export const toggleFavorite = async (userId: string, placeId: string, add: boolean): Promise<void> => {
  try {
    const userRef = doc(db, 'users', userId);
    if (add) {
      await updateDoc(userRef, {
        favorites: arrayUnion(placeId),
        points: increment(10), // Award 10 points for adding favorite
      });
    } else {
      await updateDoc(userRef, {
        favorites: arrayRemove(placeId),
      });
    }
  } catch (error) {
    console.error('Error toggling favorite:', error);
    throw error;
  }
};

// Place Functions
export const getPlaces = async (filters?: {
  category?: string;
  priceLevel?: number;
  featured?: boolean;
  limit?: number;
}): Promise<Place[]> => {
  try {
    let q = query(collection(db, 'places'));

    if (filters?.category) {
      q = query(q, where('category', '==', filters.category));
    }
    if (filters?.priceLevel) {
      q = query(q, where('priceLevel', '==', filters.priceLevel));
    }
    if (filters?.featured !== undefined) {
      q = query(q, where('featured', '==', filters.featured));
    }
    if (filters?.limit) {
      q = query(q, limit(filters.limit));
    }

    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() } as Place));
  } catch (error) {
    console.error('Error getting places:', error);
    throw error;
  }
};

export const getPlaceById = async (placeId: string): Promise<Place | null> => {
  try {
    const placeRef = doc(db, 'places', placeId);
    const placeSnap = await getDoc(placeRef);
    if (placeSnap.exists()) {
      return { id: placeSnap.id, ...placeSnap.data() } as Place;
    }
    return null;
  } catch (error) {
    console.error('Error getting place:', error);
    throw error;
  }
};

export const getFeaturedPlaces = async (limitCount = 10): Promise<Place[]> => {
  try {
    const q = query(
      collection(db, 'places'),
      where('featured', '==', true),
      orderBy('rating', 'desc'),
      limit(limitCount)
    );
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() } as Place));
  } catch (error) {
    console.error('Error getting featured places:', error);
    throw error;
  }
};

export const searchPlaces = async (searchTerm: string, language = 'ar-EG'): Promise<Place[]> => {
  try {
    // Note: Firestore doesn't support full-text search natively
    // This is a simplified implementation
    // For production, consider using Algolia or Elasticsearch
    const allPlaces = await getPlaces();
    return allPlaces.filter((place) =>
      place.name[language]?.toLowerCase().includes(searchTerm.toLowerCase())
    );
  } catch (error) {
    console.error('Error searching places:', error);
    throw error;
  }
};

// Conversation Functions
export interface Conversation {
  userId: string;
  messages: Array<{
    id: string;
    role: 'user' | 'assistant';
    content: string;
    timestamp: Timestamp;
    context?: any;
  }>;
  lastUpdated: Timestamp;
}

export const getConversation = async (userId: string): Promise<Conversation | null> => {
  try {
    const convRef = doc(db, 'conversations', userId);
    const convSnap = await getDoc(convRef);
    if (convSnap.exists()) {
      return convSnap.data() as Conversation;
    }
    return null;
  } catch (error) {
    console.error('Error getting conversation:', error);
    throw error;
  }
};

export const addMessageToConversation = async (
  userId: string,
  message: { role: 'user' | 'assistant'; content: string; context?: any }
): Promise<void> => {
  try {
    const convRef = doc(db, 'conversations', userId);
    const convSnap = await getDoc(convRef);

    const newMessage = {
      id: Date.now().toString(),
      ...message,
      timestamp: serverTimestamp(),
    };

    if (convSnap.exists()) {
      const conversation = convSnap.data() as Conversation;
      let messages = conversation.messages || [];

      // Add new message
      messages.push(newMessage as any);

      // Keep only last 50 messages
      if (messages.length > 50) {
        messages = messages.slice(-50);
      }

      await updateDoc(convRef, {
        messages,
        lastUpdated: serverTimestamp(),
      });
    } else {
      await setDoc(convRef, {
        userId,
        messages: [newMessage],
        lastUpdated: serverTimestamp(),
      });
    }
  } catch (error) {
    console.error('Error adding message:', error);
    throw error;
  }
};

// Achievement Functions
export const getAllAchievements = async (): Promise<Achievement[]> => {
  try {
    const q = query(collection(db, 'achievements'), orderBy('order'));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() } as Achievement));
  } catch (error) {
    console.error('Error getting achievements:', error);
    throw error;
  }
};

export const checkAchievementUnlock = async (userId: string): Promise<void> => {
  try {
    const userProfile = await getUserProfile(userId);
    if (!userProfile) return;

    const achievements = await getAllAchievements();
    const visitHistory = await getUserVisitHistory(userId);

    for (const achievement of achievements) {
      // Skip if already unlocked
      if (userProfile.achievements.includes(achievement.id)) continue;

      let shouldUnlock = false;

      switch (achievement.requirement.type) {
        case 'visits':
          shouldUnlock = visitHistory.length >= achievement.requirement.value;
          break;
        case 'points':
          shouldUnlock = userProfile.points >= achievement.requirement.value;
          break;
        case 'category_visits':
          if (achievement.requirement.condition) {
            const categoryVisits = visitHistory.filter(async (visit) => {
              const place = await getPlaceById(visit.placeId);
              return place?.category === achievement.requirement.condition;
            });
            shouldUnlock = categoryVisits.length >= achievement.requirement.value;
          }
          break;
      }

      if (shouldUnlock) {
        await unlockAchievement(userId, achievement.id, achievement.points);
      }
    }
  } catch (error) {
    console.error('Error checking achievements:', error);
    throw error;
  }
};

// Visit History Functions
export const recordVisit = async (
  userId: string,
  placeId: string,
  rating?: number,
  notes?: string
): Promise<void> => {
  try {
    // Check if already visited
    const hasVisited = await hasUserVisited(userId, placeId);
    if (hasVisited) {
      console.log('Place already visited');
      return;
    }

    // Add to visit history
    const visitRef = doc(collection(db, 'visitHistory'));
    await setDoc(visitRef, {
      userId,
      placeId,
      visitedAt: serverTimestamp(),
      rating,
      notes,
    });

    // Update user stats
    const userRef = doc(db, 'users', userId);
    await updateDoc(userRef, {
      visits: increment(1),
      points: increment(50), // Award 50 points for visit
    });

    // Check for achievement unlocks
    await checkAchievementUnlock(userId);
  } catch (error) {
    console.error('Error recording visit:', error);
    throw error;
  }
};

export const getUserVisitHistory = async (userId: string): Promise<VisitHistory[]> => {
  try {
    const q = query(
      collection(db, 'visitHistory'),
      where('userId', '==', userId),
      orderBy('visitedAt', 'desc')
    );
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() } as VisitHistory));
  } catch (error) {
    console.error('Error getting visit history:', error);
    throw error;
  }
};

export const hasUserVisited = async (userId: string, placeId: string): Promise<boolean> => {
  try {
    const q = query(
      collection(db, 'visitHistory'),
      where('userId', '==', userId),
      where('placeId', '==', placeId),
      limit(1)
    );
    const querySnapshot = await getDocs(q);
    return !querySnapshot.empty;
  } catch (error) {
    console.error('Error checking visit:', error);
    throw error;
  }
};

// Helper function for translated content
export const getTranslated = (
  field: Record<string, string>,
  language: string,
  fallback = 'en'
): string => {
  return field[language] || field[fallback] || Object.values(field)[0] || '';
};
