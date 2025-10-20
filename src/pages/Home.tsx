import { useState, useEffect } from "react";
import { PlaceCard } from "@/components/PlaceCard";
import { mockPlaces } from "@/data/places";
import { Place } from "@/types";
import { ArrowLeft, Grid2X2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import logoImage from "@/assets/logo.png";

const Home = () => {
  const [places, setPlaces] = useState<Place[]>(mockPlaces);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is logged in
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    if (!isLoggedIn) {
      navigate('/splash');
    }
  }, [navigate]);

  const handleFavoriteToggle = (placeId: string) => {
    setPlaces(places.map(p => 
      p.id === placeId ? { ...p, isFavorite: !p.isFavorite } : p
    ));
  };

  const featuredPlaces = places.filter(p => p.isFeatured).slice(0, 4);

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-primary/5 pb-20">
      {/* Header with Logo */}
      <header className="sticky top-0 z-40 bg-background/95 backdrop-blur-md border-b border-border">
        <div className="container mx-auto max-w-6xl px-4 py-4">
          <div className="flex items-center justify-between">
            <Button variant="ghost" size="icon" className="h-9 w-9">
              <ArrowLeft className="h-5 w-5" />
            </Button>
            
            <div className="flex flex-col items-center gap-1">
              <img src={logoImage} alt="Logo" className="h-16 w-16 object-contain" />
              <h1 className="text-lg font-bold text-foreground">خرجوني </h1>
              <p className="text-xs text-muted-foreground">اليو بووك</p>
            </div>

            <Button variant="ghost" size="icon" className="h-9 w-9">
              <Grid2X2 className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto max-w-6xl px-4 py-6">
        {/* Featured Places Section */}
        <div className="bg-card rounded-2xl p-5 shadow-lg border border-border">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-foreground">ولاشكيماتي</h2>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <Grid2X2 className="h-4 w-4" />
            </Button>
          </div>

          {/* 2x2 Grid */}
          <div className="grid grid-cols-2 gap-3">
            {featuredPlaces.map((place) => (
              <PlaceCard 
                key={place.id}
                place={place}
                onFavoriteToggle={handleFavoriteToggle}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
