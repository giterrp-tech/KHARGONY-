import { Card } from '@/components/ui/card';
import { Mountain, Sparkles, Coffee, Heart, Users } from 'lucide-react';
import { cn } from '@/lib/utils';
import { PlaceCategory } from '@/types';

const activities = [
  { 
    id: 'adventure', 
    label: 'مغامرة', 
    icon: Mountain, 
    color: 'bg-destructive/10 text-destructive border-destructive/20',
    emoji: '🎢'
  },
  { 
    id: 'culture', 
    label: 'ثقافي', 
    icon: Sparkles, 
    color: 'bg-purple-500/10 text-purple-500 border-purple-500/20',
    emoji: '🕌'
  },
  { 
    id: 'food', 
    label: 'مطاعم', 
    icon: Coffee, 
    color: 'bg-accent/10 text-accent border-accent/20',
    emoji: '🍽️'
  },
  { 
    id: 'romantic', 
    label: 'رومانسية', 
    icon: Heart, 
    color: 'bg-pink-500/10 text-pink-500 border-pink-500/20',
    emoji: '🌅'
  },
  { 
    id: 'family', 
    label: 'عائلي', 
    icon: Users, 
    color: 'bg-secondary/10 text-secondary border-secondary/20',
    emoji: '👨‍👩‍👧‍👦'
  },
];

interface ActivitySectionProps {
  selectedActivity: PlaceCategory | 'all';
  onActivitySelect: (activity: PlaceCategory | 'all') => void;
}

export const ActivitySection = ({ selectedActivity, onActivitySelect }: ActivitySectionProps) => {
  return (
    <div className="w-full">
      <h2 className="text-2xl font-bold mb-4">نوع الخروجة 🎯</h2>
      <div className="flex gap-3 overflow-x-auto pb-4 hide-scrollbar">
        {activities.map((activity) => {
          const Icon = activity.icon;
          const isSelected = selectedActivity === activity.id;
          
          return (
            <Card
              key={activity.id}
              onClick={() => onActivitySelect(activity.id as PlaceCategory)}
              className={cn(
                'flex-shrink-0 p-4 cursor-pointer transition-all duration-300 hover:scale-105 border-2',
                isSelected 
                  ? 'bg-gradient-egyptian shadow-gold scale-105' 
                  : activity.color
              )}
            >
              <div className="flex flex-col items-center gap-2 min-w-[80px]">
                <span className="text-3xl">{activity.emoji}</span>
                <span className={cn(
                  'font-semibold text-sm text-center',
                  isSelected ? 'text-foreground' : ''
                )}>{activity.label}</span>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
};
