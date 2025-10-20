import { useState } from "react";
import { PlaceCard } from "@/components/PlaceCard";
import { mockPlaces } from "@/data/places";
import { Place } from "@/types";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Heart } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const Favorites = () => {
  const navigate = useNavigate();
  
  // Get favorites from mock data
  const [places, setPlaces] = useState<Place[]>(
    mockPlaces.filter(p => p.isFavorite)
  );

  const handleFavoriteToggle = (placeId: string) => {
    setPlaces(places.map(p => 
      p.id === placeId ? { ...p, isFavorite: !p.isFavorite } : p
    ).filter(p => p.isFavorite));
    toast.success("تم التحديث! ✅");
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto max-w-6xl px-4 py-8">
        <div className="mb-8 flex items-center gap-4">
          <Button 
            variant="ghost" 
            onClick={() => navigate("/")}
            className="gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            رجوع
          </Button>
        </div>

        <div className="mb-8 text-center">
          <div className="inline-block p-4 bg-gradient-egyptian rounded-full mb-4 shadow-gold">
            <Heart className="w-12 h-12 text-foreground fill-foreground" />
          </div>
          <h1 className="text-4xl font-bold mb-4">خروجاتي المفضلة ⭐</h1>
          <p className="text-lg text-muted-foreground">
            الأماكن اللي حبيتها وعايز تزورها تاني
          </p>
        </div>

        {places.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {places.map((place, index) => (
              <div 
                key={place.id} 
                className="animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <PlaceCard 
                  place={place}
                  onFavoriteToggle={handleFavoriteToggle}
                />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-xl text-muted-foreground mb-6">
              مفيش خروجات في المفضلة لسه 😊
            </p>
            <Button 
              variant="hero" 
              onClick={() => navigate("/")}
            >
              ابدأ اكتشاف خروجات جديدة
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Favorites;
