import { Card } from '@/components/ui/card';
import { Heart, MapPin, Star, DollarSign } from 'lucide-react';
import { Place } from '@/types';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

interface PlaceCardProps {
  place: Place;
  onFavoriteToggle?: (placeId: string) => void;
}

export const PlaceCard = ({ place, onFavoriteToggle }: PlaceCardProps) => {
  const [isFavorite, setIsFavorite] = useState(place.isFavorite || false);
  const navigate = useNavigate();

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsFavorite(!isFavorite);
    onFavoriteToggle?.(place.id);
    toast.success(isFavorite ? 'تم الإزالة من المفضلة' : 'تم الإضافة للمفضلة');
  };

  return (
    <Card 
      className="overflow-hidden hover-lift card-interactive cursor-pointer group"
      onClick={() => navigate(`/place/${place.id}`)}
    >
      {/* Image with Zoom Effect */}
      <div className="h-32 relative overflow-hidden">
        <img 
          src={place.images[0]} 
          alt={place.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {/* Favorite button */}
        <button
          onClick={handleFavoriteClick}
          className="absolute top-1.5 left-1.5 p-1 bg-white/95 backdrop-blur-sm rounded-full hover:bg-white transition-all hover:scale-110 shadow-lg z-10"
        >
          <Heart 
            className={`w-3.5 h-3.5 transition-all ${
              isFavorite 
                ? 'fill-red-500 text-red-500 animate-bounce-soft' 
                : 'text-muted-foreground hover:text-red-500'
            }`}
          />
        </button>

        {/* Featured badge */}
        {place.isFeatured && (
          <div className="absolute top-1.5 right-1.5 bg-primary text-foreground px-1.5 py-0.5 rounded-full text-[9px] font-bold shadow-lg animate-pulse-glow backdrop-blur-sm">
            ⭐ مميز
          </div>
        )}

        {/* Category Badge */}
        <div className="absolute bottom-1.5 right-1.5 bg-card/95 backdrop-blur-sm text-foreground px-1.5 py-0.5 rounded-full text-[9px] font-semibold shadow-md">
          {place.category === 'culture' && '🏛️ ثقافي'}
          {place.category === 'food' && '🍽️ مطاعم'}
          {place.category === 'nature' && '🌳 طبيعة'}
          {place.category === 'adventure' && '⛰️ مغامرة'}
          {place.category === 'shopping' && '🛍️ تسوق'}
          {place.category === 'romantic' && '💑 رومانسي'}
          {place.category === 'family' && '👨‍👩‍👧‍👦 عائلي'}
          {place.category === 'museum' && '🏛️ متحف'}
          {place.category === 'relax' && '🧘 استرخاء'}
        </div>
      </div>

      {/* Content */}
      <div className="p-2 bg-card">
        <div className="flex items-start justify-between mb-1.5 gap-1.5">
          <h3 className="text-sm font-bold text-foreground flex-1 group-hover:text-primary transition-colors">
            {place.name}
          </h3>
          <div className="flex items-center gap-0.5 bg-primary/10 px-1.5 py-0.5 rounded-lg shrink-0">
            <Star className="w-3 h-3 fill-primary text-primary" />
            <span className="font-bold text-[10px] text-primary">{place.rating}</span>
          </div>
        </div>

        <p className="text-[10px] text-muted-foreground mb-1.5 line-clamp-2 leading-relaxed">
          {place.description}
        </p>

        <div className="flex items-center justify-between text-[10px] pt-1.5 border-t border-border">
          <div className="flex items-center gap-0.5 text-muted-foreground">
            <MapPin className="w-3 h-3 text-secondary" />
            <span className="font-medium">{place.distance} كم</span>
          </div>

          <div className="flex items-center gap-0.5 text-primary font-bold">
            <DollarSign className="w-3 h-3" />
            <span>{place.priceRange}</span>
          </div>
        </div>

        {/* Tags */}
        {place.tags && place.tags.length > 0 && (
          <div className="flex gap-1 mt-1.5 flex-wrap">
            {place.tags.slice(0, 3).map((tag, index) => (
              <span
                key={index}
                className="text-[9px] bg-muted px-1.5 py-0.5 rounded-full text-muted-foreground font-medium hover:bg-primary/10 hover:text-primary transition-colors"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </Card>
  );
};
