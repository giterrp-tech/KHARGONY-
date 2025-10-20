import { useState } from 'react';
import { Place } from '@/types';
import { PlaceCard } from './PlaceCard';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from './ui/button';

interface PlacesSliderProps {
  places: Place[];
  title: string;
  onFavoriteToggle?: (placeId: string) => void;
}

export const PlacesSlider = ({ places, title, onFavoriteToggle }: PlacesSliderProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const next = () => {
    setCurrentIndex((prev) => (prev + 1) % places.length);
  };

  const prev = () => {
    setCurrentIndex((prev) => (prev - 1 + places.length) % places.length);
  };

  const featuredPlaces = places.filter(p => p.isFeatured).slice(0, 4);

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-lg font-bold">{title}</h2>
        <div className="flex gap-1.5">
          <Button
            variant="outline"
            size="icon"
            onClick={prev}
            className="rounded-full h-7 w-7"
          >
            <ChevronRight className="w-3.5 h-3.5" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={next}
            className="rounded-full h-7 w-7"
          >
            <ChevronLeft className="w-3.5 h-3.5" />
          </Button>
        </div>
      </div>

      <div className="relative overflow-hidden">
        <div
          className="flex transition-transform duration-500 ease-out gap-3"
          style={{
            transform: `translateX(${currentIndex * -100}%)`
          }}
        >
          {featuredPlaces.map((place) => (
            <div key={place.id} className="min-w-full md:min-w-[calc(50%-0.5rem)] lg:min-w-[calc(33.333%-0.67rem)]">
              <PlaceCard place={place} onFavoriteToggle={onFavoriteToggle} />
            </div>
          ))}
        </div>
      </div>

      {/* Dots indicator */}
      <div className="flex gap-1.5 justify-center mt-3">
        {featuredPlaces.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`h-1.5 rounded-full transition-all ${
              index === currentIndex ? 'w-6 bg-primary' : 'w-1.5 bg-muted-foreground/30'
            }`}
          />
        ))}
      </div>
    </div>
  );
};
