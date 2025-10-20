import { Card } from '@/components/ui/card';
import { Cloud, MapPin } from 'lucide-react';

export const WeatherWidget = () => {
  // Mock weather data - في التطبيق الحقيقي، ستأتي من API
  const weather = {
    city: 'القاهرة',
    temp: 26,
    condition: 'غائم جزئياً',
    icon: '☁️'
  };

  return (
    <Card className="p-4 bg-secondary/10 border-secondary/20">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="text-4xl">{weather.icon}</span>
          <div>
            <div className="flex items-center gap-1 text-sm text-muted-foreground mb-1">
              <MapPin className="w-3 h-3" />
              <span>{weather.city}</span>
            </div>
            <div className="text-2xl font-bold">{weather.temp}°C</div>
          </div>
        </div>
        <div className="text-right">
          <div className="text-sm text-muted-foreground">{weather.condition}</div>
        </div>
      </div>
    </Card>
  );
};
