import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Event } from '@/types';
import { Calendar, Tag, Clock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface EventsSectionProps {
  events: Event[];
}

export const EventsSection = ({ events }: EventsSectionProps) => {
  const navigate = useNavigate();

  const getEventBadge = (type: Event['type']) => {
    switch (type) {
      case 'discount':
        return <span className="bg-destructive text-destructive-foreground px-2 py-1 rounded text-xs font-bold">خصم</span>;
      case 'free':
        return <span className="bg-secondary text-secondary-foreground px-2 py-1 rounded text-xs font-bold">مجاني</span>;
      case 'limited':
        return <span className="bg-accent text-accent-foreground px-2 py-1 rounded text-xs font-bold">محدود</span>;
    }
  };

  return (
    <div className="w-full">
      <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
        <Calendar className="w-6 h-6 text-primary" />
        المناسبات اليوم 🎉
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {events.map((event) => (
          <Card
            key={event.id}
            className="overflow-hidden hover:shadow-gold transition-all duration-300 hover:scale-105 cursor-pointer"
            onClick={() => navigate(`/place/${event.placeId}`)}
          >
            <div className="h-32 bg-gradient-warm flex items-center justify-center text-6xl">
              {event.image}
            </div>

            <div className="p-4">
              <div className="flex items-start justify-between mb-2">
                <h3 className="font-bold text-sm flex-1">{event.title}</h3>
                {getEventBadge(event.type)}
              </div>

              <p className="text-sm text-muted-foreground mb-2">{event.placeName}</p>

              <p className="text-sm font-medium mb-3">{event.description}</p>

              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <Clock className="w-3 h-3" />
                <span>حتى {new Date(event.validUntil).toLocaleDateString('ar-EG')}</span>
              </div>

              {event.discount && (
                <div className="mt-3 bg-primary/10 text-primary px-3 py-2 rounded text-center font-bold">
                  خصم {event.discount}%
                </div>
              )}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};
