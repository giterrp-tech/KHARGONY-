export interface Place {
  id: string;
  name: string;
  nameEn?: string;
  category: PlaceCategory;
  description: string;
  rating: number;
  reviewCount: number;
  priceLevel: 'low' | 'medium' | 'high';
  priceRange: string;
  distance: number;
  location: {
    lat: number;
    lng: number;
    address: string;
    city: string;
  };
  images: string[];
  hours?: {
    open: string;
    close: string;
    days: string;
  };
  phone?: string;
  website?: string;
  activities?: string[];
  isFeatured?: boolean;
  isFavorite?: boolean;
  tags?: string[];
}

export type PlaceCategory = 
  | 'adventure'
  | 'culture'
  | 'food'
  | 'romantic'
  | 'family'
  | 'museum'
  | 'shopping'
  | 'nature'
  | 'relax';

export interface Review {
  id: string;
  placeId: string;
  userName: string;
  userAvatar?: string;
  rating: number;
  comment: string;
  date: string;
  helpful: number;
}

export interface Event {
  id: string;
  title: string;
  placeName: string;
  placeId: string;
  type: 'discount' | 'free' | 'limited';
  description: string;
  discount?: number;
  validUntil: string;
  image: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  visitCount: number;
  favoriteCount: number;
  level: number;
  points: number;
  joinedAt: string;
}

export interface VisitHistory {
  id: string;
  placeId: string;
  placeName: string;
  visitDate: string;
  rating?: number;
}
