import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { mockPlaces } from '@/data/places';
import { ArrowRight, MapPin, Clock, Phone, Globe, Star, Heart } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

const PlaceDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const place = mockPlaces.find(p => p.id === id);
  const [isFavorite, setIsFavorite] = useState(place?.isFavorite || false);

  if (!place) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">المكان غير موجود</h2>
          <Button onClick={() => navigate('/')}>العودة للرئيسية</Button>
        </div>
      </div>
    );
  }

  const handleFavorite = () => {
    setIsFavorite(!isFavorite);
    toast.success(isFavorite ? 'تم الإزالة من المفضلة' : 'تم الإضافة للمفضلة');
  };

  const handleGetDirections = () => {
    const url = `https://www.google.com/maps/search/?api=1&query=${place.location.lat},${place.location.lng}`;
    window.open(url, '_blank');
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Back button */}
      <div className="sticky top-0 z-10 bg-background/95 backdrop-blur-sm border-b p-4">
        <Button 
          variant="ghost" 
          onClick={() => navigate(-1)}
          className="gap-2"
        >
          <ArrowRight className="w-4 h-4" />
          رجوع
        </Button>
      </div>

      {/* Hero Image */}
      <div className="h-72 bg-gradient-egyptian flex items-center justify-center relative">
        <span className="text-9xl">{place.images[0]}</span>
        
        {/* Favorite button */}
        <button
          onClick={handleFavorite}
          className="absolute top-4 left-4 p-3 bg-white rounded-full shadow-lg hover:scale-110 transition-transform"
        >
          <Heart className={`w-6 h-6 ${isFavorite ? 'fill-destructive text-destructive' : 'text-muted-foreground'}`} />
        </button>
      </div>

      <div className="container mx-auto max-w-4xl px-4 py-8">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-start justify-between mb-3">
            <div>
              <h1 className="text-3xl font-bold mb-2">{place.name}</h1>
              {place.nameEn && (
                <p className="text-muted-foreground">{place.nameEn}</p>
              )}
            </div>
            <div className="flex items-center gap-2 bg-primary/10 px-4 py-2 rounded-full">
              <Star className="w-5 h-5 fill-primary text-primary" />
              <span className="font-bold text-lg">{place.rating}</span>
              <span className="text-sm text-muted-foreground">({place.reviewCount})</span>
            </div>
          </div>

          {/* Tags */}
          {place.tags && (
            <div className="flex gap-2 flex-wrap">
              {place.tags.map((tag, index) => (
                <span
                  key={index}
                  className="bg-secondary/20 text-secondary-foreground px-3 py-1 rounded-full text-sm"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Description */}
        <Card className="p-6 mb-6">
          <h2 className="text-xl font-bold mb-3">عن المكان</h2>
          <p className="text-muted-foreground leading-relaxed">{place.description}</p>
        </Card>

        {/* Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          {/* Location */}
          <Card className="p-6">
            <div className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-secondary mt-1" />
              <div>
                <h3 className="font-semibold mb-1">العنوان</h3>
                <p className="text-sm text-muted-foreground">{place.location.address}</p>
                <p className="text-sm text-muted-foreground">{place.location.city}</p>
                <p className="text-sm font-medium text-primary mt-1">
                  {place.distance} كم من موقعك
                </p>
              </div>
            </div>
          </Card>

          {/* Hours */}
          {place.hours && (
            <Card className="p-6">
              <div className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-accent mt-1" />
                <div>
                  <h3 className="font-semibold mb-1">ساعات العمل</h3>
                  <p className="text-sm text-muted-foreground">
                    {place.hours.open} - {place.hours.close}
                  </p>
                  <p className="text-sm text-muted-foreground">{place.hours.days}</p>
                </div>
              </div>
            </Card>
          )}

          {/* Phone */}
          {place.phone && (
            <Card className="p-6">
              <div className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-primary mt-1" />
                <div>
                  <h3 className="font-semibold mb-1">الهاتف</h3>
                  <a href={`tel:${place.phone}`} className="text-sm text-primary hover:underline">
                    {place.phone}
                  </a>
                </div>
              </div>
            </Card>
          )}

          {/* Website */}
          {place.website && (
            <Card className="p-6">
              <div className="flex items-start gap-3">
                <Globe className="w-5 h-5 text-secondary mt-1" />
                <div>
                  <h3 className="font-semibold mb-1">الموقع الإلكتروني</h3>
                  <a 
                    href={place.website} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-sm text-primary hover:underline"
                  >
                    زيارة الموقع
                  </a>
                </div>
              </div>
            </Card>
          )}
        </div>

        {/* Activities */}
        {place.activities && place.activities.length > 0 && (
          <Card className="p-6 mb-6">
            <h2 className="text-xl font-bold mb-4">الأنشطة المتاحة</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {place.activities.map((activity, index) => (
                <div
                  key={index}
                  className="bg-muted p-3 rounded-lg text-center text-sm font-medium"
                >
                  {activity}
                </div>
              ))}
            </div>
          </Card>
        )}

        {/* Price Info */}
        <Card className="p-6 mb-6 bg-primary/5 border-primary/20">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold mb-1">السعر</h3>
              <p className="text-2xl font-bold text-primary">{place.priceRange}</p>
            </div>
            <span className={`px-4 py-2 rounded-full font-semibold ${
              place.priceLevel === 'low' ? 'bg-secondary/20 text-secondary' :
              place.priceLevel === 'medium' ? 'bg-accent/20 text-accent' :
              'bg-primary/20 text-primary'
            }`}>
              {place.priceLevel === 'low' ? 'اقتصادي' : 
               place.priceLevel === 'medium' ? 'متوسط' : 'فاخر'}
            </span>
          </div>
        </Card>

        {/* Action Buttons */}
        <div className="flex gap-4">
          <Button 
            variant="hero" 
            size="lg" 
            className="flex-1"
            onClick={handleGetDirections}
          >
            <MapPin className="w-5 h-5" />
            الطريق الأسرع
          </Button>
          <Button 
            variant="outline" 
            size="lg"
            onClick={() => toast.info('ميزة الحجز قريباً!')}
          >
            احجز الآن
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PlaceDetail;
