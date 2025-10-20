import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { PlaceCard } from '@/components/PlaceCard';
import { mockPlaces } from '@/data/places';
import { Place, PlaceCategory } from '@/types';
import { Search, SlidersHorizontal } from 'lucide-react';
import { Card } from '@/components/ui/card';
import egyptianBg from '@/assets/egyptian-bg.png';

const Explore = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<PlaceCategory | 'all'>('all');
  const [selectedPrice, setSelectedPrice] = useState<'all' | 'low' | 'medium' | 'high'>('all');
  const [selectedRating, setSelectedRating] = useState<'all' | '3' | '4' | '4.5'>('all');
  const [showFilters, setShowFilters] = useState(false);

  const filteredPlaces = mockPlaces.filter(place => {
    const matchesSearch = place.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         place.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || place.category === selectedCategory;
    const matchesPrice = selectedPrice === 'all' || place.priceLevel === selectedPrice;
    const matchesRating = selectedRating === 'all' || place.rating >= parseFloat(selectedRating);
    
    return matchesSearch && matchesCategory && matchesPrice && matchesRating;
  });

  return (
    <div className="min-h-screen bg-background pb-20 relative">
      <div 
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `url(${egyptianBg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed'
        }}
      />
      <div className="container mx-auto max-w-6xl px-4 py-8 relative z-10">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold mb-1 text-primary">
            استكشف الأماكن 🔍
          </h1>
          <p className="text-sm text-muted-foreground">
            ابحث واكتشف أفضل الأماكن في مصر
          </p>
        </div>

        {/* Search Bar */}
        <div className="mb-4 flex gap-2">
          <div className="relative flex-1">
            <Search className="absolute right-2 top-2.5 w-4 h-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="ابحث عن مكان..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pr-8 h-9 text-sm"
            />
          </div>
          <Button
            variant={showFilters ? "default" : "outline"}
            onClick={() => setShowFilters(!showFilters)}
            className="gap-1.5 h-9 text-sm"
            size="sm"
          >
            <SlidersHorizontal className="w-3.5 h-3.5" />
            فلاتر
          </Button>
        </div>

        {/* Filters */}
        {showFilters && (
          <Card className="p-4 mb-4 animate-slide-up">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Category Filter */}
              <div>
                <h3 className="text-sm font-semibold mb-2">نوع المكان</h3>
                <div className="space-y-1.5">
                  {['all', 'culture', 'food', 'adventure', 'shopping', 'relax'].map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(cat as any)}
                      className={`w-full text-right p-1.5 rounded text-sm transition-colors ${
                        selectedCategory === cat
                          ? 'bg-primary text-primary-foreground'
                          : 'hover:bg-muted'
                      }`}
                    >
                      {cat === 'all' ? 'الكل' :
                       cat === 'culture' ? '🏛️ ثقافي' :
                       cat === 'food' ? '🍽️ مطاعم' :
                       cat === 'adventure' ? '🎢 مغامرة' :
                       cat === 'shopping' ? '🛍️ تسوق' :
                       '🌳 استرخاء'}
                    </button>
                  ))}
                </div>
              </div>

              {/* Price Filter */}
              <div>
                <h3 className="text-sm font-semibold mb-2">السعر</h3>
                <div className="space-y-1.5">
                  {[
                    { value: 'all', label: 'جميع الأسعار' },
                    { value: 'low', label: '💰 اقتصادي' },
                    { value: 'medium', label: '💰💰 متوسط' },
                    { value: 'high', label: '💰💰💰 فاخر' }
                  ].map((price) => (
                    <button
                      key={price.value}
                      onClick={() => setSelectedPrice(price.value as any)}
                      className={`w-full text-right p-1.5 rounded text-sm transition-colors ${
                        selectedPrice === price.value
                          ? 'bg-primary text-primary-foreground'
                          : 'hover:bg-muted'
                      }`}
                    >
                      {price.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Rating Filter */}
              <div>
                <h3 className="text-sm font-semibold mb-2">التقييم</h3>
                <div className="space-y-1.5">
                  {[
                    { value: 'all', label: 'جميع التقييمات' },
                    { value: '4.5', label: '⭐ 4.5+' },
                    { value: '4', label: '⭐ 4+' },
                    { value: '3', label: '⭐ 3+' }
                  ].map((rating) => (
                    <button
                      key={rating.value}
                      onClick={() => setSelectedRating(rating.value as any)}
                      className={`w-full text-right p-1.5 rounded text-sm transition-colors ${
                        selectedRating === rating.value
                          ? 'bg-primary text-primary-foreground'
                          : 'hover:bg-muted'
                      }`}
                    >
                      {rating.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-3 flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setSelectedCategory('all');
                  setSelectedPrice('all');
                  setSelectedRating('all');
                }}
                className="flex-1"
              >
                إعادة تعيين
              </Button>
            </div>
          </Card>
        )}

        {/* Results */}
        <div className="mb-3">
          <p className="text-sm text-muted-foreground">
            {filteredPlaces.length} نتيجة
          </p>
        </div>

        <div className="grid grid-cols-3 gap-3">
          {filteredPlaces.map((place, index) => (
            <div 
              key={place.id}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <PlaceCard place={place} />
            </div>
          ))}
        </div>

        {filteredPlaces.length === 0 && (
          <div className="text-center py-12">
            <p className="text-base text-muted-foreground mb-3">
              لم نجد نتائج مطابقة 😔
            </p>
            <Button size="sm" onClick={() => {
              setSearchQuery('');
              setSelectedCategory('all');
              setSelectedPrice('all');
              setSelectedRating('all');
            }}>
              إعادة تعيين البحث
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Explore;
